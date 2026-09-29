#!/usr/bin/env python3
"""
Write the tokens back out as Figma variable files.

    python3 tools/export_figma.py

tokens/ holds one merged file per collection, which is good for diffing but not
what Figma's variable importers read. This regenerates the exact shape Figma
exports and imports: one nested file per collection per mode, with variable IDs,
scopes, descriptions and aliases intact.

Output: dist/figma/variables/<collection>/<Mode>.tokens.json

Generated, so it always matches tokens/. Don't commit it and don't hand-edit it.
Use it to push the foundation into a new Figma file, restore a collection, or
hand the variables to another team.
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import all_collections, resolve, ROOT

OUT = os.path.join(ROOT, "dist", "figma", "variables")


def nest(flat):
    """path/keys -> the nested objects Figma expects."""
    tree = {}
    for key, node in flat.items():
        parts = key.split("/")
        cur = tree
        for p in parts[:-1]:
            cur = cur.setdefault(p, {})
        cur[parts[-1]] = node
    return tree


def to_figma(all_data, coll, data, mode):
    flat = {}
    for key, tok in data["tokens"].items():
        value = tok["values"].get(mode, tok["values"][data["modes"][0]])
        ext = {}
        if tok.get("id"):
            ext["com.figma.variableId"] = tok["id"]
        if tok.get("scopes"):
            ext["com.figma.scopes"] = tok["scopes"]
        if tok.get("figmaType"):
            ext["com.figma.type"] = tok["figmaType"]
        if isinstance(value, dict) and "alias" in value:
            target = value["alias"]
            if tok["type"] == "color":
                # Figma stores the resolved colour alongside the alias link
                out_value, _ = resolve(all_data, coll, mode, key)
            else:
                out_value = "{" + target.replace("/", ".") + "}"
            # Figma only writes aliasData where the value itself can't carry the
            # link — colours. A "{token.path}" string is the link on its own.
            if value.get("targetId"):
                ext["com.figma.aliasData"] = {
                    "targetVariableId": value["targetId"],
                    "targetVariableName": target,
                    "targetVariableSetId": value.get("setId"),
                    "targetVariableSetName": value.get("setName"),
                }
        else:
            out_value = value
        ext.update(tok.get("figmaExtras", {}).get(mode, {}))
        node = {"$type": tok["type"], "$value": out_value}
        if tok.get("description"):
            node["$description"] = tok["description"]
        if ext:
            node["$extensions"] = ext
        flat[key] = node
    tree = nest(flat)
    tree["$extensions"] = {"com.figma.modeName": mode}
    return tree


def main():
    data = all_collections()
    count = 0
    for coll, c in sorted(data.items()):
        folder = os.path.join(OUT, coll)
        os.makedirs(folder, exist_ok=True)
        for mode in c["modes"]:
            path = os.path.join(folder, f"{mode}.tokens.json")
            json.dump(to_figma(data, coll, c, mode), open(path, "w"), indent=2, ensure_ascii=False)
            count += 1
        print(f"  {coll:18} {', '.join(c['modes'])}  ({len(c['tokens'])} variables)")
    print(f"\n{count} files in dist/figma/variables/")
    print("Import into Figma with the same plugin you export with, one file per mode.")


if __name__ == "__main__":
    main()
