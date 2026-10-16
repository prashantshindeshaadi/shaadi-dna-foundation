#!/usr/bin/env python3
"""
Put every token file in hierarchy order: low to high, light to strong.

    python3 tools/order.py            # rewrite tokens/*.json in order
    python3 tools/order.py --check    # exit 1 if any file is out of order (CI)

Order only. Values, ids and descriptions are untouched, and the script proves
it: each file must contain exactly the same tokens before and after.
tools/import.py keeps a file's existing order, so this survives future imports.
"""
import sys, os, json, re, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import TOKENS, all_collections, resolve

# intensity words, weakest first
INTENSITY = ["none", "hidden", "transparent", "extra-soft", "faint", "thin", "soft", "default", "medium",
             "disabled", "strong", "extra-strong", "floating", "full"]
STATES = ["default", "hover", "pressed"]
STOPS = ["start", "middle", "end"]


def rank(word, table):
    return table.index(word) if word in table else len(table)


def num(s):
    try:
        return float(s)
    except ValueError:
        return None


def by_value(data, coll, mode=None):
    c = data[coll]
    m = mode or c["modes"][0]
    def value(key):
        v, _ = resolve(data, coll, m, key)
        return v if isinstance(v, (int, float)) else 0
    return value


def explicit(order):
    """Sort key from an explicit list of names; unknown names keep their place at the end."""
    return lambda parts: rank(parts, order)


def key_space(data):
    val = by_value(data, "sh-space", "Mobile")
    groups = ["gap", "padding", "page"]
    def k(key):
        n = num(key)
        if n is not None:
            return (0, n, key)
        return (1, rank(key.split("/")[0], groups), val(key), key)
    return k


def key_by_value(coll):
    def make(data):
        val = by_value(data, coll)
        return lambda key: (val(key), rank(key, INTENSITY), key)
    return make


def key_radius(data):
    val = by_value(data, "sh-radius")
    steps = ["none", "xxs", "xs", "sm", "md", "default", "lg", "xl", "xxl", "full"]
    roles = ["tag", "chip", "tooltip", "input", "card", "media", "sheet", "hero", "button", "avatar"]
    def k(key):
        if key in steps:
            return (0, steps.index(key), 0, key)
        return (1, val(key), rank(key, roles), key)
    return k


def key_icon(data):
    groups = ["size", "stroke", "target", "brand", "pictogram"]
    def k(key):
        parts = key.split("/")
        n = num(parts[-1])
        return (rank(parts[0], groups), n if n is not None else 0, key)
    return k


def key_shadow(data):
    levels = ["soft", "default", "strong", "floating", "brand", "premium", "sia"]
    props = ["x", "y", "blur", "spread", "color"]
    return lambda key: (rank(key.split("/")[0], levels), rank(key.split("/")[1], props))


def key_translucent(data):
    parts_order = {0: ["background", "border"], 1: ["light", "dark", "brand", "blur"]}
    def k(key):
        p = key.split("/")
        out = [rank(p[0], parts_order[0]), rank(p[1], parts_order[1])]
        rest = p[2:]
        if p[1] == "blur":
            out += [rank(p[2], INTENSITY), 0]
        else:
            out += [rank(rest[0], INTENSITY) if rest and rest[0] in INTENSITY else rank(rest[0], STOPS) if rest else 0,
                    rank(rest[-1], STOPS) if rest else 0]
        return tuple(out)
    return k


def key_basic(data):
    hues = ["brand", "neutral", "premium", "red", "green", "amber", "blue", "orange", "pink", "purple", "mint"]   # family order as in Figma
    neutral_ends = {"transparent": -2, "white": -1, "black": 10000}
    def k(key):
        hue, step = key.split("/")
        n = num(step)
        if hue == "neutral" and step in neutral_ends:
            n = neutral_ends[step]
        if step == "vivid":
            n = 9999
        return (rank(hue, hues), n if n is not None else 5000, key)
    return k


def key_common(data):
    groups = ["background", "border", "text", "icon", "overlay", "button", "premium", "sia", "semantic", "indicator"]
    leaf = {
        "background": ["default", "soft", "strong", "selected", "disabled", "brand", "inverse", "transparent"],
        "border": ["soft", "default", "strong", "selected", "focus", "brand", "disabled", "inverse"],
        "text": ["primary", "secondary", "tertiary", "disabled", "brand", "inline-text", "inverse", "on-brand", "on-image"],
        "icon": ["primary", "secondary", "tertiary", "disabled", "brand", "inline-icon", "inverse", "on-brand", "on-image"],
        "indicator": ["success", "premium", "diamond", "platinum", "private"],
    }
    roles = ["background", "border", "text", "icon", "illustration", "card", "top-match", "scrim", "image"]
    buttons = ["primary", "secondary", "tertiary", "ghost"]
    statuses = ["success", "warning", "error", "information"]
    surface = ["soft", "solid"]
    fg = ["default", "subtext", "on-soft", "on-solid"]
    def k(key):
        p = key.split("/")
        g = rank(p[0], groups)
        if p[0] in leaf:
            return (g, rank(p[1], leaf[p[0]]))
        rest = p[1:]
        head = []
        if p[0] == "button":
            head, rest = [rank(rest[0], buttons)], rest[1:]
        elif p[0] == "semantic":
            head, rest = [rank(rest[0], statuses)], rest[1:]
        out = [g] + head
        prev = None
        for part in rest:
            if prev == "border":                       # borders go light to strong
                out.append(rank(part, ["soft", "default", "strong"]))
                prev = part
                continue
            prev = part
            for table in (roles, surface, STATES, ["soft", "default"], fg, STOPS, ["base", "wash", "content"]):
                if part in table:
                    out.append(table.index(part))
                    break
            else:
                out.append(99)
        return tuple(out)
    return k


def key_typo(data):
    tops = ["font-family", "weight", "letter-spacing", "display", "heading", "title", "body", "support", "button"]
    sub = ["lg", "md", "sm", "label", "micro", "meta", "default", "tight", "loose"]
    weights = ["regular", "medium", "bold", "black"]
    spacing = ["display-tight", "heading-tight", "title-default", "body-normal", "uppercase-wide"]
    props = ["font", "weight", "size", "line-height", "letter-spacing", "paragraph-spacing"]
    def k(key):
        p = key.split("/")
        out = [rank(p[0], tops)]
        if p[0] == "weight":
            return tuple(out + [rank(p[1], weights)])
        if p[0] == "letter-spacing":
            return tuple(out + [rank(p[1], spacing)])
        for part in p[1:-1]:
            out.append(rank(part, sub))
        out += [0] * (3 - len(out)) + [rank(p[-1], props)]
        return tuple(out)
    return k


RULES = {
    "sh-space": key_space, "sh-opacity": key_by_value("sh-opacity"), "sh-stroke": key_by_value("sh-stroke"),
    "sh-radius": key_radius, "sh-icon": key_icon, "sh-shadow": key_shadow, "sh-translucent": key_translucent,
    "sh-color-basic": key_basic, "sh-color-common": key_common, "sh-typo": key_typo,
}


def ordered(data, coll):
    keys = list(data[coll]["tokens"])
    rule = RULES.get(coll)
    if not rule:
        return keys
    k = rule(data)
    return sorted(keys, key=lambda key: (k(key), keys.index(key)))   # stable for ties


def main():
    check = "--check" in sys.argv
    data = all_collections()
    out_of_order = []
    for coll in sorted(data):
        keys = list(data[coll]["tokens"])
        new = ordered(data, coll)
        assert sorted(new) == sorted(keys), f"{coll}: token set changed"
        if new == keys:
            print(f"  {coll:18} in order")
            continue
        out_of_order.append(coll)
        moved = sum(1 for a, b in zip(keys, new) if a != b)
        if check:
            print(f"  {coll:18} OUT OF ORDER ({moved} positions)")
            continue
        path = os.path.join(TOKENS, coll + ".json")
        before = json.load(open(path))
        before["tokens"] = {k: before["tokens"][k] for k in new}
        json.dump(before, open(path, "w"), indent=2, ensure_ascii=False)
        after = json.load(open(path))
        assert after["tokens"] == data[coll]["tokens"], f"{coll}: content changed"   # dict compare ignores order
        print(f"  {coll:18} reordered ({moved} positions)")
    if check and out_of_order:
        print("\nRun python3 tools/order.py to fix.")
        sys.exit(1)


if __name__ == "__main__":
    main()
