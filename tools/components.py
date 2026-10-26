#!/usr/bin/env python3
"""
Write component blueprints and the icon library from Figma reads.

    python3 tools/components.py <saved read_components.js / read_icons.js results…>

Each input is what figma_execute returned for tools/read_components.js or
tools/read_icons.js (the raw MCP result file is fine). Writes:

    components/<sh-name>/<sh-name>.md          one folder per Core component
    components/<group>/<sh-name>/<sh-name>.md  migration-page components
    components/README.md             index
    components/icons.md              icon map
    icons/<type>/<name>.svg          one SVG per icon type, currentColor

Blueprints are generated: properties, anatomy, sizes, and which token every
layer uses in every variant. Prose comes from the Figma description only.
"""
import sys, os, re, json, itertools, base64
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import all_collections, load_tool_json, ROOT

COMPONENTS = os.path.join(ROOT, "components")
ICONS = os.path.join(ROOT, "icons")
GROUPS = {   # Figma page -> folder, label
    "Core Component": ("", "Core"),
    "Migration - Profile Card": ("profile-card", "Profile card (migration, not yet core)"),
    "Migration - FPV": ("fpv", "Full profile view (migration, not yet core)"),
    "Migration - Navigation": ("account", "Navigation, payment, account (migration, not yet core)"),
    "Utility": ("utility", "Utility"),
}
HAND_WRITTEN = {"sh-button"}   # keep components/sh-button/sh-button.md as the author wrote it
FIGMA_FILE = "https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA"


def load(path):
    return load_tool_json(path)


# ---- token naming --------------------------------------------------------
def var_map():
    m = {}
    for coll, c in all_collections().items():
        for key, t in c["tokens"].items():
            if t.get("id"):
                m[t["id"]] = ("" if coll == "sh-color-common" else coll + "/") + key
    return m


PROP_NAMES = {"fills": "fill", "strokes": "stroke", "itemSpacing": "gap", "strokeWeight": "stroke-weight",
              "effects": "effect", "characters": "text", "visible": "visible", "opacity": "opacity",
              "width": "width", "height": "height", "minWidth": "min-width", "minHeight": "min-height",
              "counterAxisSpacing": "row-gap", "fill-style": "fill", "stroke-style": "stroke",
              "effect-style": "effect", "text-style": "text style"}
TEXT_PARTS = {"fontSize", "lineHeight", "fontFamily", "fontWeight", "letterSpacing", "paragraphSpacing", "fontStyle"}


def prop_name(p):
    base = re.sub(r"\[\d+\]$", "", p)
    if base in PROP_NAMES:
        return PROP_NAMES[base]
    if base.endswith("Radius"):
        return "radius:" + base[:-6]
    if base.startswith("padding"):
        return "padding:" + base[7:].lower()
    if base in TEXT_PARTS:
        return "text:" + base
    return base


def collapse(bindings, vm):
    """[(path, prop, id)] -> {(layer, prop): token} with radius/padding folded and text parts dropped."""
    out = {}
    for path, p, ident in bindings:
        layer = path or "root"
        tok = ident[6:] if ident.startswith("style:") else vm.get(ident, "unknown " + ident)
        out[(layer, prop_name(p))] = tok
    folded = {}
    for (layer, p), tok in out.items():
        if p.startswith("text:") and (layer, "text style") in out:
            continue   # the text style carries these
        folded[(layer, p)] = tok
    out = folded
    folded = {}
    for (layer, p), tok in out.items():
        if p.startswith("radius:"):
            corners = {out.get((layer, "radius:" + c)) for c in ("topLeft", "topRight", "bottomLeft", "bottomRight")}
            if len(corners) == 1:
                folded[(layer, "radius")] = tok
                continue
        if p.startswith("padding:"):
            sides = {s: out.get((layer, "padding:" + s)) for s in ("top", "right", "bottom", "left")}
            if len(set(sides.values())) == 1:
                folded[(layer, "padding")] = tok
                continue
            if sides["left"] == sides["right"] and p in ("padding:left", "padding:right"):
                folded[(layer, "padding-x")] = tok
                continue
            if sides["top"] == sides["bottom"] and p in ("padding:top", "padding:bottom"):
                folded[(layer, "padding-y")] = tok
                continue
        folded[(layer, p)] = tok
    return folded


# ---- blueprint ------------------------------------------------------------
def label_line(line):
    """"Rules: …" -> "**Rules:** …" so each description line reads as its own labelled paragraph."""
    m = re.match(r"^([A-Z][A-Za-z ]{1,20}):\s*(.*)$", line.strip())
    return f"**{m.group(1)}:** {m.group(2)}" if m else line.strip()


def slug(name):
    """sh-navigation-dashboard/primary-item -> sh-navigation-dashboard-primary-item (folder and file name)."""
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def figma_url(node_id):
    return f"{FIGMA_FILE}?node-id={node_id.replace(':', '-')}"


def group_of(page):
    for prefix, g in GROUPS.items():
        if page and page.startswith(prefix):
            return g
    return ("other", page or "Other")


def tree_lines(nodes, depth, lines):
    for n in nodes:
        bits = []
        if n.get("hidden"):
            bits.append("hidden by default")
        if n["type"] == "INSTANCE":
            props = n.get("props", {})
            pv = ", ".join(f"{k} {v}" for k, v in props.items() if k != "_error" and not isinstance(v, bool))
            bits.insert(0, f"**{n.get('of') or 'instance'}**" + (f" ({pv})" if pv else ""))
        elif n["type"] == "TEXT":
            bits.insert(0, "text" + (f' "{n["text"]}"' if n.get("text") else ""))
        else:
            if n.get("layout"):
                bits.insert(0, n["layout"]["dir"])
            if n.get("sizing"):
                bits.append(f"{n['sizing'][0].lower()} × {n['sizing'][1].lower()}")
        lines.append("  " * depth + f"- {n['name']} — " + " · ".join(bits))
        if n.get("children"):
            tree_lines(n["children"], depth + 1, lines)


def explain(by_variant, axes):
    """{variant_name: token} -> short rule using the fewest axes that determine it."""
    tokens = set(by_variant.values())
    if len(tokens) == 1:
        return next(iter(tokens))
    names = list(by_variant)
    for k in (1, 2, 3):
        for combo in itertools.combinations(axes, k):
            rule = {}
            ok = True
            for v in names:
                key = tuple(VARIANT_OF[v].get(a, "") for a in combo)
                if rule.setdefault(key, by_variant[v]) != by_variant[v]:
                    ok = False
                    break
            if ok:
                parts = []
                for key, tok in rule.items():
                    cond = ", ".join(f"{a}={val}" for a, val in zip(combo, key) if val != "")
                    parts.append(f"{cond} → {tok}")
                if len(parts) <= 12:
                    return "; ".join(parts)
                # same axes but too many rows: group by token
                inv = {}
                for key, tok in rule.items():
                    inv.setdefault(tok, []).append(", ".join(f"{a}={val}" for a, val in zip(combo, key)))
                return "; ".join(f"{tok} ← {' / '.join(conds[:6])}{' …' if len(conds) > 6 else ''}" for tok, conds in inv.items())
    inv = {}
    for v, tok in by_variant.items():
        inv.setdefault(tok, []).append(v)
    return "; ".join(f"{tok} ({len(vs)} variants)" for tok, vs in inv.items())


VARIANT_OF = {}

PLATFORMS = (("web", "Web (HTML/CSS)"), ("compose", "Jetpack Compose"), ("swiftui", "SwiftUI"), ("assets", "Assets"))


def code_line(here):
    """Links to the platform and asset folders that exist next to the blueprint (web/, compose/, swiftui/, assets/)."""
    links = []
    for sub, label in PLATFORMS:
        d = os.path.join(here, sub)
        files = sorted(f for f in os.listdir(d) if not f.startswith(".")) if os.path.isdir(d) else []
        if files:
            links.append(f"{label}: " + ", ".join(f"[{f}]({sub}/{f})" for f in files))
    return ("**Code:** " + " · ".join(links)) if links else None


def blueprint(c, vm, here=None):
    global VARIANT_OF
    variants = c["variants"]
    axes = [k for k, p in c["props"].items() if p["type"] == "VARIANT"]
    VARIANT_OF = {v["name"]: v["variant"] for v in variants}
    first = variants[0]
    desc = (c.get("description") or "").strip()
    desc_lines = [l for l in desc.splitlines() if l.strip() and l.strip() != c["name"]]
    L = [f"# {c['name']}", ""]
    for line in desc_lines:          # Purpose / Built from / Switches / Rules / Taps, one paragraph each
        L += [label_line(line), ""]
    L += [f"{group_of(c.get('page'))[1]} · {len(variants)} variant{'s' if len(variants) != 1 else ''} · [Open in Figma]({figma_url(c['id'])}) (node `{c['id']}`)", ""]
    code = code_line(here) if here else None
    if code:
        L += [code, ""]
    L += ["*Generated by `tools/components.py` from Figma. Values are token names; never copy numbers.*", ""]

    # one block per variant, from its own Figma description (When / Purpose / Actions)
    typed = [v for v in variants if (v.get("description") or "").strip()]
    if typed and len(variants) > 1:
        L += ["## Types", ""]
        for v in typed:
            lines = [l for l in v["description"].splitlines() if l.strip()]
            if lines and (lines[0].startswith(c["name"]) or "=" in lines[0] and ":" not in lines[0].split("=")[0]):
                lines = lines[1:]          # drop the name line
            L += [f"### {v['name']}", ""]
            for line in lines:
                L += [label_line(line), ""]

    # properties
    if c["props"]:
        L += ["## Properties", "", "| Property | Type | Values | Default |", "|---|---|---|---|"]
        for name, p in c["props"].items():
            t = p["type"].lower().replace("_", " ")
            vals = ", ".join(p.get("options") or []) if p["type"] == "VARIANT" else "—"
            d = p.get("default")
            d = "" if d in (None, "") else (str(d).lower() if isinstance(d, bool) else str(d))
            L.append(f"| {name} | {t} | {vals} | {d} |")
        L.append("")
    if c.get("propsError"):
        L += [f"> Figma reports an error on this set's properties: `{c['propsError']}`. Fix it in Figma and re-run.", ""]

    # anatomy of first variant
    L += [f"## Anatomy", "", f"Layer tree of `{first['name']}`. Nested components are shown by name; their internals live in their own blueprint.", ""]
    root = first.get("root", {})
    rb = [f"{root['layout']['dir']}"] if root.get("layout") else []
    L.append("- root — " + (" · ".join(rb) if rb else "frame"))
    lines = []
    tree_lines(first.get("tree") or [], 1, lines)
    L += lines + [""]

    # sizes
    size_axis = next((a for a in axes if a.lower() == "size"), None)
    if size_axis:
        L += ["## Sizes", "", f"| {size_axis} | Width × height | Padding | Gap |", "|---|---|---|---|"]
        seen = set()
        for v in variants:
            s = v["variant"].get(size_axis)
            if s in seen:
                continue
            seen.add(s)
            b = collapse(v["bindings"], vm)
            pad = b.get(("root", "padding")) or " / ".join(filter(None, [b.get(("root", "padding-y")), b.get(("root", "padding-x"))])) or "—"
            L.append(f"| {s} | {v['w']:g} × {v['h']:g} | {pad} | {b.get(('root', 'gap'), '—')} |")
        L.append("")
    else:
        L += ["## Size", "", f"{first['w']:g} × {first['h']:g}", ""]

    # tokens
    per_variant = {v["name"]: collapse(v["bindings"], vm) for v in variants}
    keys = []
    for b in per_variant.values():
        for k in b:
            if k not in keys:
                keys.append(k)
    L += ["## Tokens", "", "Every bound value, by layer. Where a value changes with a property, the rule is spelled out.", ""]
    L += ["| Layer | Property | Token |", "|---|---|---|"]
    for layer, prop in keys:
        by_v = {name: b[(layer, prop)] for name, b in per_variant.items() if (layer, prop) in b}
        rule = explain(by_v, axes)
        if len(by_v) < len(variants) and len(variants) > 1:
            rule += f" *(set on {len(by_v)}/{len(variants)} variants)*"
        L.append(f"| {layer} | {prop} | {rule} |")
    L.append("")
    unknown = sorted({t for b in per_variant.values() for t in b.values() if t.startswith("unknown ")})
    if unknown:
        L += ["> Bound to variables that aren't in `tokens/` (a shadow collection or a deleted variable): " + ", ".join(unknown), ""]
    return "\n".join(L)


# ---- icons ---------------------------------------------------------------
def icon_type(name, t):
    if t in ("line", "filled"):
        return t
    seg = name.split("/")[1] if name.count("/") >= 2 else ""
    return seg if seg in ("pictogram", "brand", "badge", "tag") else "misc"


def current_color(svg, mono):
    if not mono:
        return svg
    return re.sub(r'(fill|stroke)="(#[0-9A-Fa-f]{3,8}|black)"', r'\1="currentColor"', svg)


def write_icons(icons):
    rows, written = [], 0
    for ic in sorted(icons, key=lambda i: i["name"]):
        short = ic["name"][len("sh-icon/"):]
        desc = ic.get("description") or ""
        keywords = next((l.split(":", 1)[1].strip() for l in desc.splitlines() if l.lower().startswith("keywords:")), "")
        types, files = [], []
        for t, d in ic["types"].items():
            kind = icon_type(ic["name"], t)
            types.append(f"{kind} {'/'.join(str(s) for s in d['sizes'])}")
            base = short.replace("/", "-") if kind in ("line", "filled", "misc") else short.split("/", 1)[-1].replace("/", "-")
            if d.get("svg"):
                rel = f"{kind}/{base}.svg"
                path = os.path.join(ICONS, rel)
                os.makedirs(os.path.dirname(path), exist_ok=True)
                open(path, "w").write(current_color(d["svg"], kind in ("line", "filled")))
                files.append(f"[{kind}]({'../icons/' + rel})")
                written += 1
            elif d.get("png"):
                rel = f"{kind}/{base}@{d.get('pngScale', 2)}x.png"
                path = os.path.join(ICONS, rel)
                os.makedirs(os.path.dirname(path), exist_ok=True)
                open(path, "wb").write(base64.b64decode(d["png"]))
                files.append(f"[{kind} png]({'../icons/' + rel})")
                written += 1
        rows.append(f"| `{short}` | {', '.join(types)} | {keywords} | {' '.join(files)} |")
    L = ["# Icons", "", f"{len(icons)} icons from the Shaadi DNA library, exported by `tools/components.py`.",
         "Line and filled icons are one SVG each at 24 with `currentColor`; scale to 12–24 and pair the",
         "stroke with `sh-icon/stroke/<size>` (FOUNDATION §5.5). Pictograms and brand marks keep their colours;",
         "the ones drawn as bitmaps in Figma are 2x PNGs.", "",
         "| Icon | Types · sizes | Keywords | SVG |", "|---|---|---|---|"] + rows + [""]
    open(os.path.join(COMPONENTS, "icons.md"), "w").write("\n".join(L))
    return written


# ---- index ----------------------------------------------------------------
def write_index(entries):
    L = ["# Components", "", "One folder per `sh-*` component, named exactly like the Figma component. Inside: the",
         "blueprint `<sh-name>.md`, generated from Figma by `tools/components.py` (its prose, logic and rules",
         "come from the Figma descriptions). Code and Code Connect files go in platform subfolders of the same",
         "folder: `web/` (HTML/CSS), `compose/` (Jetpack Compose), `swiftui/` (SwiftUI). No XML or UIKit.", "",
         "Figma Code Connect links every component to its blueprint (label: Markdown), so Dev Mode and the",
         "Figma MCP point straight here. When a code component is built, re-link it to the code file.", "",
         "A component is in the system when it sits on the Core page; migration-page components are",
         "work in progress and may still change.", ""]
    by_group = {}
    for e in entries:
        by_group.setdefault(e["group"], []).append(e)
    for folder, label in sorted({(e["group"], e["label"]) for e in entries}, key=lambda x: (x[0] != "", x[0])):
        L += [f"## {label}", "", "| Component | Variants | Properties | Blueprint | Figma |", "|---|---|---|---|---|"]
        for e in sorted(by_group[folder], key=lambda e: e["name"]):
            L.append(f"| `{e['name']}` | {e['variants']} | {e['props']} | [{e['file']}]({e['file']}) | [`{e['id']}`]({figma_url(e['id'])}) |")
        L.append("")
    L += ["## Icons", "", "[icons.md](icons.md) — the icon map; SVGs in `../icons/`. Drawing them in code (web, Compose, SwiftUI):",
          "[sh-icon/sh-icon.md](sh-icon/sh-icon.md).", ""]
    open(os.path.join(COMPONENTS, "README.md"), "w").write("\n".join(L))


def main():
    files = sys.argv[1:]
    if not files:
        print(__doc__)
        sys.exit(1)
    vm = var_map()
    comps, icons = [], []
    for f in files:
        data = load(f)
        if isinstance(data, dict) and "icons" in data:
            icons += data["icons"]
        else:
            comps += [c for c in data if not c.get("missing")]
    # a later read of the same component or icon replaces an earlier one
    comps = list({c["id"]: c for c in comps}.values())
    icons = list({i["name"]: i for i in icons}.values())
    entries = []
    for c in comps:
        folder, label = group_of(c.get("page"))
        name = slug(c["name"])
        rel = f"{folder}/{name}/{name}.md" if folder else f"{name}/{name}.md"
        if c["name"] in HAND_WRITTEN and os.path.exists(os.path.join(COMPONENTS, rel)):
            entries.append(dict(name=c["name"], group=folder, label=label, variants=len(c["variants"]), props=len(c["props"]), file=rel, id=c["id"]))
            continue
        path = os.path.join(COMPONENTS, rel)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        open(path, "w").write(blueprint(c, vm, os.path.dirname(path)))
        entries.append(dict(name=c["name"], group=folder, label=label, variants=len(c["variants"]), props=len(c["props"]), file=rel, id=c["id"]))
    if entries:
        write_index(entries)
        print(f"  {len(entries)} blueprints in components/")
    if icons:
        n = write_icons(icons)
        print(f"  {len(icons)} icons in components/icons.md, {n} SVGs in icons/")


if __name__ == "__main__":
    main()
