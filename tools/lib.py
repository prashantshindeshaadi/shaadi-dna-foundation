"""Shared helpers for the Shaadi DNA Foundation token format.

One file per collection in tokens/. Each file holds every mode, so a token's
values sit side by side instead of being spread across separate files:

    {
      "modes": ["Light", "Dark"],
      "tokens": {
        "text/primary": {
          "type": "color",
          "description": "...",
          "scopes": ["TEXT_FILL"],
          "values": {
            "Light": {"alias": "neutral/900"},
            "Dark":  {"alias": "neutral/100"}
          }
        }
      }
    }
"""
import json, os, glob, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOKENS = os.path.join(ROOT, "tokens")


def flatten(obj, prefix=""):
    """Figma's nested export -> flat path keys."""
    out = {}
    for k, v in obj.items():
        if k.startswith("$"):
            continue
        if isinstance(v, dict) and "$value" in v:
            out[prefix + k] = v
        elif isinstance(v, dict):
            out.update(flatten(v, prefix + k + "/"))
    return out


def alias_of(tok):
    """Returns the alias record Figma needs to rebuild the link, or None."""
    ext = tok.get("$extensions", {})
    data = ext.get("com.figma.aliasData")
    if data and data.get("targetVariableName"):
        return {"alias": data["targetVariableName"],
                "targetId": data.get("targetVariableId"),
                "setId": data.get("targetVariableSetId"),
                "setName": data.get("targetVariableSetName")}
    v = tok.get("$value")
    if isinstance(v, str) and v.startswith("{"):
        return {"alias": v.strip("{}").replace(".", "/")}
    return None


def merge_export(files):
    """Figma mode exports -> one merged collection."""
    modes, tokens = [], {}
    for path in files:
        mode = os.path.basename(path).split(".")[0]
        modes.append(mode)
        for key, tok in flatten(json.load(open(path))).items():
            entry = tokens.setdefault(key, {
                "type": tok["$type"],
                "description": tok.get("$description", ""),
                "scopes": tok.get("$extensions", {}).get("com.figma.scopes") or [],
                "id": tok.get("$extensions", {}).get("com.figma.variableId"),
                "figmaType": tok.get("$extensions", {}).get("com.figma.type"),
                "values": {},
            })
            entry["values"][mode] = alias_of(tok) or tok["$value"]
            # keep any other Figma extension untouched (e.g. composedColor),
            # so an export can be rebuilt exactly
            known = {"com.figma.variableId", "com.figma.scopes",
                     "com.figma.aliasData", "com.figma.type"}
            extra = {k: v for k, v in tok.get("$extensions", {}).items() if k not in known}
            if extra:
                entry.setdefault("figmaExtras", {})[mode] = extra
    return {"modes": modes, "tokens": tokens}


def all_collections():
    """Variable collections only. tokens/sh-gradient.json holds colour styles (see gradients.py)."""
    return {os.path.basename(p)[:-5]: json.load(open(p))
            for p in sorted(glob.glob(os.path.join(TOKENS, "*.json")))
            if not p.endswith("sh-gradient.json")}


def resolve(data, coll, mode, key, seen=None):
    """Follow aliases, across collections where needed, to a concrete value."""
    seen = seen or set()
    if (coll, mode, key) in seen:
        raise ValueError(f"alias cycle at {coll}/{key}")
    seen.add((coll, mode, key))
    entry = data[coll]["tokens"][key]
    val = entry["values"].get(mode, entry["values"][data[coll]["modes"][0]])
    if isinstance(val, dict) and "alias" in val:
        target = val["alias"]
        for c in (coll, "sh-color-basic"):
            if c in data and target in data[c]["tokens"]:
                m = mode if mode in data[c]["modes"] else data[c]["modes"][0]
                return resolve(data, c, m, target, seen)
        raise KeyError(f"unresolved alias {target} from {coll}/{key}")
    return val, entry["type"]


def var_name(coll, key):
    """sh-color-common + text/on-brand -> --sh-text-on-brand"""
    stem = {"sh-color-common": "", "sh-color-basic": "palette"}.get(
        coll, coll.replace("sh-", ""))
    slug = "-".join(p for p in ([stem] + key.split("/")) if p)
    return "--sh-" + re.sub(r"[^a-zA-Z0-9]+", "-", slug).strip("-").lower()


def contrast(hex_a, hex_b):
    def lum(h):
        c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
        f = lambda x: x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
        return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
    a, b = sorted([lum(hex_a), lum(hex_b)], reverse=True)
    return (a + 0.05) / (b + 0.05)


def composite(hex_c, alpha, bg):
    c = [int(hex_c[i:i + 2], 16) for i in (1, 3, 5)]
    b = [int(bg[i:i + 2], 16) for i in (1, 3, 5)]
    return "#%02X%02X%02X" % tuple(round(x * alpha + y * (1 - alpha)) for x, y in zip(c, b))
