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
from build import build_android, build_swift, swift_ident

OUT = os.path.join(ROOT, "dist", "figma")
SWIFT_GROUP = {"sh-color-common": "Color", "sh-translucent": "Color", "sh-space": "Space",
               "sh-radius": "Radius", "sh-stroke": "Stroke", "sh-icon": "Icon",
               "sh-typo": "Typo", "sh-opacity": "Opacity"}


def main():
    data = all_collections()
    # Only offer a platform name if build.py really generates it.
    android = "".join(build_android(data).values())
    swift = build_swift(data)
    out, web_only = {}, 0
    for coll, c in data.items():
        if coll == "sh-color-basic":            # primitives are hidden; no code name
            continue
        for key in c["tokens"]:
            css = var_name(coll, key)
            res = css[2:].replace("-", "_")
            kind = "color" if c["tokens"][key]["type"] == "color" else "dimen"
            entry = {"WEB": f"var({css})"}
            if f'<{kind} name="{res}">' in android:
                entry["ANDROID"] = f"@{kind}/{res}"
            ident = swift_ident(("translucent/" if coll == "sh-translucent" else "") + key)
            if coll in SWIFT_GROUP and f"static let {ident}:" in swift:
                entry["iOS"] = f"SH.{SWIFT_GROUP[coll]}.{ident.strip('`')}"
            web_only += len(entry) == 1
            out[f"{coll}/{key}"] = entry
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, "code-syntax.json")
    json.dump(out, open(path, "w"), indent=2)
    print(f"  dist/figma/code-syntax.json  ({len(out)} tokens, {web_only} web-only)")

    if "--plugin" in sys.argv:
        script = """// Paste into a Figma plugin console, or run via the Figma MCP.
// Applies Shaadi DNA Foundation code syntax to every variable.
const MAP = %s;
(async () => {
let done = 0, missing = [];
for (const collection of await figma.variables.getLocalVariableCollectionsAsync()) {
  for (const id of collection.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    const key = collection.name + "/" + v.name;
    const entry = MAP[key];
    if (!entry) { missing.push(key); continue; }
    for (const platform of Object.keys(entry)) {
      v.setVariableCodeSyntax(platform, entry[platform]);
    }
    done++;
  }
}
console.log("code syntax set on " + done + " variables");
if (missing.length) console.log("no mapping for: " + missing.join(", "));
})();
""" % json.dumps(out, indent=2)
        p2 = os.path.join(OUT, "apply-code-syntax.js")
        open(p2, "w").write(script)
        print(f"  dist/figma/apply-code-syntax.js  ({len(script):,} bytes)")


if __name__ == "__main__":
    main()
