#!/usr/bin/env python3
"""
Fetch a thumbnail of every component from Figma, for the Vision App's component lists.

    FIGMA_ACCESS_TOKEN=… python3 tools/thumbnails.py            every component
    FIGMA_ACCESS_TOKEN=… python3 tools/thumbnails.py sh-chip …  only these

For each blueprint (components/**/<sh-name>.md) it reads the Figma node from the "Open in Figma" link, picks
the component set's first variant (Figma's default), and saves it as <sh-name>.thumb.png next to the
blueprint, at most 160 px on its longest side. Uses the Figma REST API with the token from the environment;
never prints or stores it. Standard library only.
"""
import json, os, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS = os.path.join(ROOT, "components")
FIGMA = re.compile(r"\[Open in Figma\]\(https://www\.figma\.com/design/([^/]+)/[^)]*node-id=([0-9]+-[0-9]+)\)")
MAX_SIDE = 160
BATCH = 40


def api(path, token):
    req = urllib.request.Request("https://api.figma.com/v1/" + path, headers={"X-Figma-Token": token})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 3:
                time.sleep(10 * (attempt + 1))
                continue
            raise SystemExit(f"Figma API {e.code} for {path.split('?')[0]}: {e.read()[:200].decode(errors='replace')}")


def blueprints(names):
    found = {}
    for dirpath, dirnames, filenames in os.walk(COMPONENTS):
        dirnames[:] = [d for d in dirnames if d not in ("web", "compose", "swiftui")]
        name = os.path.basename(dirpath)
        if name + ".md" in filenames and (not names or name in names):
            m = FIGMA.search(open(os.path.join(dirpath, name + ".md"), encoding="utf-8").read())
            if m:
                found[name] = (m.group(1), m.group(2).replace("-", ":"), dirpath)
    return found


def main():
    token = os.environ.get("FIGMA_ACCESS_TOKEN", "").strip()
    if not token:
        sys.exit("Set FIGMA_ACCESS_TOKEN (a Figma personal access token) in your shell first.")
    items = blueprints(set(sys.argv[1:]))
    files = {}
    for name, (key, node, folder) in items.items():
        files.setdefault(key, []).append((name, node, folder))
    saved = 0
    for key, entries in files.items():
        for i in range(0, len(entries), BATCH):
            chunk = entries[i:i + BATCH]
            ids = ",".join(node for _, node, _ in chunk)
            nodes = api(f"files/{key}/nodes?ids={urllib.parse.quote(ids)}&depth=1", token)["nodes"]
            targets = {}
            for name, node, folder in chunk:
                doc = (nodes.get(node) or {}).get("document")
                if not doc:
                    print(f"  skip  {name}: node {node} not found")
                    continue
                if doc.get("type") == "COMPONENT_SET" and doc.get("children"):
                    doc = doc["children"][0]
                box = doc.get("absoluteBoundingBox") or {}
                side = max(box.get("width") or 1, box.get("height") or 1)
                targets.setdefault(round(min(2, MAX_SIDE / side), 2), []).append((name, doc["id"], folder))
            for scale, group in targets.items():
                gids = ",".join(t for _, t, _ in group)
                urls = api(f"images/{key}?ids={urllib.parse.quote(gids)}&format=png&scale={max(scale, 0.01)}", token)["images"]
                for name, target, folder in group:
                    url = urls.get(target)
                    if not url:
                        print(f"  skip  {name}: Figma rendered no image")
                        continue
                    with urllib.request.urlopen(url, timeout=120) as r:
                        open(os.path.join(folder, name + ".thumb.png"), "wb").write(r.read())
                    saved += 1
    print(f"Saved {saved} of {len(items)} thumbnails.")


if __name__ == "__main__":
    main()
