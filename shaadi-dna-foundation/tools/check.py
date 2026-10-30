#!/usr/bin/env python3
"""
Check the foundation. Run after every import, before you commit.

    python3 tools/check.py

Verifies structure, aliases, scoping, and WCAG contrast on every approved
foreground/background pairing. Exits non-zero if anything fails, so it can
be wired into CI.
"""
import sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import all_collections, resolve, contrast, composite
import gradients

PAGE = {"Light": "#FFFFFF", "Dark": "#0F172A"}
STATUSES = ["success", "warning", "error", "information"]

# foreground token, background token, target ratio
PAIRS = [
    ("text/primary", "background/default", 4.5),
    ("text/secondary", "background/default", 4.5),
    ("text/tertiary", "background/default", 4.5),
    ("text/primary", "background/soft", 4.5),
    ("text/secondary", "background/soft", 4.5),
    ("text/on-brand", "background/brand", 4.5),
    ("text/brand", "background/default", 4.5),
    ("button/secondary/text/default", "button/secondary/background/default", 4.5),
    ("button/secondary/text/default", "button/secondary/background/hover", 4.5),
    ("button/secondary/text/default", "button/secondary/background/pressed", 4.5),
    ("button/tertiary/text/default", "button/tertiary/background/default", 4.5),
    ("button/tertiary/text/default", "button/tertiary/background/pressed", 4.5),
    ("button/ghost/text/default", "button/ghost/background/hover", 4.5),
    ("button/ghost/text/default", "button/ghost/background/pressed", 4.5),
    ("premium/text/on-soft", "premium/background/soft/default", 4.5),
    ("premium/text/on-soft", "premium/background/soft/hover", 4.5),
    ("premium/text/on-soft", "premium/background/soft/pressed", 4.5),
    ("border/strong", "background/default", 3.0),
    ("border/selected", "background/default", 3.0),
    ("border/focus", "background/default", 3.0),
]
# Indicators are bright marks that always sit beside a label (FOUNDATION §7),
# so they are held to the 3:1 graphics minimum, not the 4.5:1 text rule.
for t in ("success", "premium", "diamond", "platinum", "private"):
    PAIRS.append((f"indicator/{t}", "background/default", 3.0))
# Accepted gaps: still measured and printed every run, but as warnings.
# Each one is listed in FOUNDATION.md §10. Remove it here once fixed.
KNOWN_GAPS = {(f"semantic/{s}/text/on-soft", f"semantic/{s}/background/soft/pressed", "Light")
              for s in ("success", "error", "information")}

for s in STATUSES:
    for state in ("default", "hover", "pressed"):
        PAIRS.append((f"semantic/{s}/text/on-soft", f"semantic/{s}/background/soft/{state}", 4.5))


def flat_color(data, coll, mode, key, page):
    val, vtype = resolve(data, coll, mode, key)
    if vtype != "color":
        raise TypeError(f"{key} is {vtype}, not a colour")
    return composite(val["hex"], val.get("alpha", 1), page)


def main():
    data = all_collections()
    errors, warnings = [], []
    total = sum(len(c["tokens"]) for c in data.values())
    print(f"{len(data)} collections, {total} variables\n")

    # 1 structure and aliases
    for coll, c in sorted(data.items()):
        missing_desc = [k for k, t in c["tokens"].items() if not t.get("description")]
        # primitives are deliberately open to every scope (FOUNDATION §1)
        all_scopes = [] if coll == "sh-color-basic" else \
            [k for k, t in c["tokens"].items() if "ALL_SCOPES" in t.get("scopes", [])]
        for k in c["tokens"]:
            for mode in c["modes"]:
                try:
                    resolve(data, coll, mode, k)
                except (KeyError, ValueError) as e:
                    errors.append(f"{coll}/{k} [{mode}]: {e}")
        if missing_desc:
            errors.append(f"{coll}: {len(missing_desc)} tokens without a description")
        if all_scopes:
            warnings.append(f"{coll}: {len(all_scopes)} tokens still on ALL_SCOPES")
        print(f"  {coll:18} {len(c['tokens']):4} tokens   modes: {', '.join(c['modes'])}")

    # 2 primitives are visible in Figma pickers by choice, but never used directly
    #   (FOUNDATION §1); build.py keeps them out of dist/.

    # 3 fonts named in the tokens must exist in fonts/
    fonts_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "fonts")
    have = set(os.listdir(fonts_dir)) if os.path.isdir(fonts_dir) else set()
    typo = data.get("sh-typo", {}).get("tokens", {})
    for key, tok in typo.items():
        if not key.startswith("font-family/"):
            continue
        for fname in re.findall(r"LexendSH[A-Za-z0-9_-]*\.ttf", tok.get("description", "")):
            if fname not in have:
                errors.append(f"sh-typo/{key} names {fname}, missing from fonts/")
    for tok in typo.values():
        for ref in re.findall(r"Static fallback: (LexendSH-[A-Za-z]+)", tok.get("description", "")):
            if ref + ".ttf" not in have:
                errors.append(f"static fallback {ref}.ttf named in a description but missing from fonts/")

    # 4 contrast
    print("\nContrast")
    cc = "sh-color-common"
    checked = failed = gaps = 0
    for fg, bg, target in PAIRS:
        for mode in data[cc]["modes"]:
            if fg not in data[cc]["tokens"] or bg not in data[cc]["tokens"]:
                warnings.append(f"missing token in pair {fg} on {bg}")
                continue
            try:
                a = flat_color(data, cc, mode, fg, PAGE[mode])
                b = flat_color(data, cc, mode, bg, PAGE[mode])
            except TypeError:
                continue
            ratio = contrast(a, b)
            checked += 1
            if ratio < target:
                msg = f"contrast {mode}: {fg} on {bg} = {ratio:.2f} (needs {target})"
                if (fg, bg, mode) in KNOWN_GAPS:
                    warnings.append(msg + "  [known gap, FOUNDATION §10]")
                    gaps += 1
                    continue
                failed += 1
                errors.append(msg)
    styles = gradients.load()
    if styles:
        e, w = gradients.problems(data, styles)
        errors += e
        warnings += w
        print(f"  sh-gradient        {len(styles['styles']):4} colour styles")
    print(f"  {checked} pairings checked, {checked - failed - gaps} pass, {gaps} known gap, {failed} fail")

    print()
    for w in warnings:
        print(f"WARN  {w}")
    for e in errors:
        print(f"FAIL  {e}")
    if errors:
        print(f"\n{len(errors)} problem(s). Fix before committing.")
        sys.exit(1)
    print("All checks passed.")


if __name__ == "__main__":
    main()
