#!/usr/bin/env python3
"""
Generate Figma variable code syntax for every token.

    python3 tools/codesyntax.py            # writes dist/figma/code-syntax.json
    python3 tools/codesyntax.py --plugin   # also writes a paste-ready plugin script

Figma's Dev Mode shows a per-platform name next to each variable (WEB, ANDROID,
iOS). Setting it means a developer copies `var(--sh-text-primary)` instead of a
hex value. Figma has no import UI for this, so apply it with the plugin script
or the Figma MCP.

Names match tools/build.py exactly, so Dev Mode and dist/ never disagree.
"""
import sys, os, json, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import all_collections, var_name, ROOT

OUT = os.path.join(ROOT, "dist", "figma")


def ident(key):
    parts = [p for p in re.split(r"[^a-zA-Z0-9]+", key) if p]
    return parts[0].lower() + "".join(p.capitalize() for p in parts[1:])


def swift_group(coll):
    return {"sh-space": "Space", "sh-radius": "Radius", "sh-stroke": "Stroke",
            "sh-icon": "Icon", "sh-typo": "Type", "sh-opacity": "Opacity",
            "sh-shadow": "Shadow", "sh-translucent": "Color",
            "sh-color-common": "Color"}.get(coll, "Token")


def main():
    data = all_collections()
    out = {}
    for coll, c in data.items():
        if coll == "sh-color-basic":            # primitives are hidden; no code name
            continue
        for key in c["tokens"]:
            css = var_name(coll, key)
            res = css[2:].replace("-", "_")
            is_color = c["tokens"][key]["type"] == "color"
            out[f"{coll}/{key}"] = {
                "WEB": f"var({css})",
                "ANDROID": f"@color/{res}" if is_color else f"@dimen/{res}",
                "iOS": f"SH.{swift_group(coll)}.{ident(key)}",
            }
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, "code-syntax.json")
    json.dump(out, open(path, "w"), indent=2)
    print(f"  dist/figma/code-syntax.json  ({len(out)} tokens)")

    if "--plugin" in sys.argv:
        script = """// Paste into a Figma plugin console, or run via the Figma MCP.
// Applies Shaadi DNA Foundation code syntax to every variable.
const MAP = %s;
let done = 0, missing = [];
for (const collection of figma.variables.getLocalVariableCollections()) {
  for (const id of collection.variableIds) {
    const v = figma.variables.getVariableById(id);
    const key = collection.name + "/" + v.name;
    const entry = MAP[key];
    if (!entry) { missing.push(key); continue; }
    for (const platform of ["WEB", "ANDROID", "iOS"]) {
      v.setVariableCodeSyntax(platform, entry[platform]);
    }
    done++;
  }
}
console.log("code syntax set on " + done + " variables");
if (missing.length) console.log("no mapping for: " + missing.join(", "));
""" % json.dumps(out, indent=2)
        p2 = os.path.join(OUT, "apply-code-syntax.js")
        open(p2, "w").write(script)
        print(f"  dist/figma/apply-code-syntax.js  ({len(script):,} bytes)")


if __name__ == "__main__":
    main()
