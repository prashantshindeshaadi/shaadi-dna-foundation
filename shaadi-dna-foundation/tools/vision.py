#!/usr/bin/env python3
"""
Build the Vision app's catalogue manifest.

    python3 tools/vision.py        (build.py runs it too)

Reads every component blueprint (components/**/<sh-name>.md) and the icon folders, and writes
dist/vision/catalog.json for vision/index.html: name, group, purpose, keywords, variant count,
Figma link, blueprint path, which platforms have code, and the web demo page if there is one.
Paths are relative to the repo root. Standard library only.
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS = os.path.join(ROOT, "components")
ICONS = os.path.join(ROOT, "icons")
OUT = os.path.join(ROOT, "dist", "vision", "catalog.json")

HEADER = re.compile(r"^(?P<group>[^·\n]+?) · (?P<variants>\d+) variants? · \[Open in Figma\]\((?P<figma>[^)]+)\)", re.M)
PLATFORMS = (("web", "Web"), ("compose", "Compose"), ("swiftui", "SwiftUI"))


def field(text, label):
    m = re.search(rf"^\*\*{label}:\*\*\s*(.+)$", text, re.M)
    return m.group(1).strip() if m else ""


def rel(path):
    return os.path.relpath(path, ROOT).replace(os.sep, "/")


def component(md_path):
    folder = os.path.dirname(md_path)
    name = os.path.splitext(os.path.basename(md_path))[0]
    text = open(md_path, encoding="utf-8").read()
    head = HEADER.search(text)
    demo = os.path.join(folder, "web", name + ".html")
    return {
        "name": name,
        "group": head.group("group").strip() if head else "Other",
        "variants": int(head.group("variants")) if head else 0,
        "figma": head.group("figma") if head else "",
        "purpose": field(text, "Purpose"),
        "keywords": [k.strip() for k in field(text, "Keywords").split(",") if k.strip()],
        "blueprint": rel(md_path),
        "platforms": [label for sub, label in PLATFORMS if os.path.isdir(os.path.join(folder, sub))],
        "demo": rel(demo) if os.path.isfile(demo) else "",
    }


def components():
    found = []
    for dirpath, dirnames, filenames in os.walk(COMPONENTS):
        dirnames[:] = sorted(d for d in dirnames if d not in ("web", "compose", "swiftui"))
        name = os.path.basename(dirpath)
        if name + ".md" in filenames:
            found.append(component(os.path.join(dirpath, name + ".md")))
    return sorted(found, key=lambda c: c["name"])


def icons():
    out = {}
    for kind in sorted(os.listdir(ICONS)):
        folder = os.path.join(ICONS, kind)
        if os.path.isdir(folder):
            out[kind] = sorted(f for f in os.listdir(folder) if f.endswith((".svg", ".png")))
    return out


def main():
    data = {"components": components(), "icons": icons()}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    content = json.dumps(data, indent=1, ensure_ascii=False)
    open(OUT, "w", encoding="utf-8").write(content)
    n_icons = sum(len(v) for v in data["icons"].values())
    print(f"  dist/vision/catalog.json  ({len(data['components'])} components, {n_icons} icons)")


if __name__ == "__main__":
    main()
