#!/usr/bin/env python3
"""
Update one collection from a Figma export.

    python3 tools/import.py ~/Downloads/sh-color-common.zip
    python3 tools/import.py ~/Downloads/sh-typo/          # folder of mode files
    python3 tools/import.py ~/Downloads/Shaadi_Foundation.zip   # whole foundation

Takes a Figma variables export, merges it into tokens/<collection>.json, and
prints exactly what changed. Nothing is written until you confirm.

After it runs, write an entry in updates/ (see tools/new_update.py).
"""
import sys, os, json, glob, zipfile, tempfile, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import merge_export, TOKENS


def collections_in(path):
    """Find every collection in a folder or zip. Returns {name: [mode files]}."""
    found = {}
    for p in glob.glob(os.path.join(path, "**", "*.tokens.json"), recursive=True):
        name = os.path.basename(os.path.dirname(p))
        if not name.startswith("sh-"):                  # fall back to folder above
            parts = [x for x in p.split(os.sep) if x.startswith("sh-")]
            name = parts[0] if parts else None
        if name:
            found.setdefault(name, []).append(p)
    return {k: sorted(v) for k, v in found.items()}


def unpack(src, workdir):
    if src.endswith(".zip"):
        with zipfile.ZipFile(src) as z:
            z.extractall(workdir)
        for inner in glob.glob(os.path.join(workdir, "**", "*.zip"), recursive=True):
            with zipfile.ZipFile(inner) as z:
                z.extractall(os.path.splitext(inner)[0])
        return workdir
    return src


def diff(old, new):
    """Report value, description, scope, add and remove changes."""
    out = {"added": [], "removed": [], "values": [], "descriptions": [], "scopes": [], "meta": []}
    o, n = old.get("tokens", {}), new["tokens"]
    for k in n.keys() - o.keys():
        out["added"].append(k)
    for k in o.keys() - n.keys():
        out["removed"].append(k)
    for k in o.keys() & n.keys():
        for mode in n[k]["values"]:
            a, b = o[k]["values"].get(mode), n[k]["values"][mode]
            if a != b:
                out["values"].append((k, mode, show(a), show(b)))
        if o[k].get("description") != n[k].get("description"):
            out["descriptions"].append(k)
        if o[k].get("scopes") != n[k].get("scopes"):
            out["scopes"].append((k, o[k].get("scopes"), n[k].get("scopes")))
        strip = lambda e: {f: v for f, v in e.items()
                           if f not in ("values", "description", "scopes")}
        if strip(o[k]) != strip(n[k]):
            out["meta"].append(k)
    return out


def show(v):
    if isinstance(v, dict):
        if "alias" in v:
            return v["alias"]
        if "hex" in v:
            a = v.get("alpha", 1)
            return v["hex"] + ("" if a >= 1 else f" @{round(a * 100)}%")
    return str(v)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    src = os.path.expanduser(sys.argv[1])
    auto = "--yes" in sys.argv
    work = tempfile.mkdtemp()
    try:
        root = unpack(src, work)
        found = collections_in(root)
        if not found:
            print("No *.tokens.json files found in that export.")
            sys.exit(1)

        summary = []
        for name, files in sorted(found.items()):
            target = os.path.join(TOKENS, name + ".json")
            old = json.load(open(target)) if os.path.exists(target) else {}
            new = merge_export(files)
            d = diff(old, new)
            changes = sum(len(v) for v in d.values())
            print(f"\n{name}  ({len(new['tokens'])} tokens, modes: {', '.join(new['modes'])})")
            if not old:
                print("  NEW collection")
            elif changes == 0:
                print("  no changes")
            else:
                for k in d["added"]:
                    print(f"  + added      {k}")
                for k in d["removed"]:
                    print(f"  - removed    {k}")
                for k, mode, a, b in d["values"]:
                    print(f"  ~ {mode:8} {k}: {a} -> {b}")
                if d["descriptions"]:
                    print(f"  ~ descriptions updated: {len(d['descriptions'])}")
                if d["meta"]:
                    print(f"  ~ Figma metadata refreshed on {len(d['meta'])} tokens")
                for k, a, b in d["scopes"]:
                    print(f"  ~ scopes     {k}: {a} -> {b}")
            summary.append((name, new, changes, d))

        total = sum(c for _, _, c, _ in summary)
        if total == 0 and all(os.path.exists(os.path.join(TOKENS, n + ".json")) for n, _, _, _ in summary):
            print("\nNothing to write.")
            return
        if not auto:
            if input(f"\nWrite {len(summary)} collection file(s)? [y/N] ").strip().lower() != "y":
                print("Cancelled.")
                return
        for name, new, _, _ in summary:
            json.dump(new, open(os.path.join(TOKENS, name + ".json"), "w"),
                      indent=2, ensure_ascii=False)
            print(f"  wrote tokens/{name}.json")
        print("\nNext: python3 tools/check.py   then   python3 tools/new_update.py")
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    main()
