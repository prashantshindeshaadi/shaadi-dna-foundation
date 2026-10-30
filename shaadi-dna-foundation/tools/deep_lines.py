#!/usr/bin/env python3
"""
Turn a saved tools/read_component_deep.js result into one line per layer.

    python3 tools/deep_lines.py <saved tool-results file> [variant filter]

Prints "===== <variant>" then "path | key=value …" for every visible layer, so the
code for each variant can be checked against what Figma really renders.
"""
import json, sys

KEYS = ["t", "w", "h", "of", "l", "r", "o", "x", "fs", "ta", "td", "st", "b", "es", "fst", "sst", "f", "s", "e"]


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    raw = json.loads(open(sys.argv[1]).read())
    data = raw.get("result", raw) if isinstance(raw, dict) else raw
    if isinstance(data, str):
        data = json.loads(data.rstrip())
    only = sys.argv[2] if len(sys.argv) > 2 else None
    for variant, rows in data.items():
        if only and only not in variant:
            continue
        print(f"===== {variant} ({len(rows)} layers)")
        for n in rows:
            print(n["p"] + " | " + " ".join(f"{k}={json.dumps(n[k], ensure_ascii=True) if k == 'x' else n[k]}" for k in KEYS if k in n))


if __name__ == "__main__":
    main()
