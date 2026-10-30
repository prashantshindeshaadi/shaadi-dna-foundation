#!/usr/bin/env python3
"""
Check a component's web/ folder against components/WEB.md.

    python3 tools/web_check.py sh-chip [sh-badge …]     one or more components
    python3 tools/web_check.py --all                    every component that has a web/ folder

Checks: the three files exist; the CSS uses tokens only (no hex, rgb()/hsl(), or raw px other than 0);
the demo page links tokens.css and its own CSS; the Code Connect file starts with // url= (matching the
blueprint's Figma link) and // component=<sh-name>. Mask gradients (#000 = mask alpha) are allowed;
sh-icon has no Code Connect file (icons connect one by one). Exits 1 on any failure. Standard library only.
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTS = os.path.join(ROOT, "components")
NO_CODE_CONNECT = {"sh-icon"}
FIGMA = re.compile(r"\[Open in Figma\]\(([^)]+)\)")
RAW = [
    (re.compile(r"#[0-9a-fA-F]{3,8}\b"), "hex colour"),
    (re.compile(r"\b(rgba?|hsla?)\("), "raw colour function"),
    (re.compile(r"(?<![\w-])(?!0px)\d*\.?\d+px\b"), "raw px value"),
]


def find(name):
    for dirpath, dirnames, filenames in os.walk(COMPONENTS):
        if os.path.basename(dirpath) == name and name + ".md" in filenames:
            return dirpath
    return None


def css_body(text):
    """CSS without comments, so usage notes in the header don't count."""
    return re.sub(r"/\*.*?\*/", "", text, flags=re.S)


def check(name):
    errors = []
    folder = find(name)
    if not folder:
        return [f"no component folder with {name}.md"]
    web = os.path.join(folder, "web")
    css, html, cc = (os.path.join(web, name + ext) for ext in (".css", ".html", ".figma.ts"))
    for path in (css, html) if name in NO_CODE_CONNECT else (css, html, cc):
        if not os.path.isfile(path):
            errors.append(f"missing {os.path.relpath(path, ROOT)}")
    if os.path.isfile(css):
        for n, line in enumerate(css_body(open(css, encoding="utf-8").read()).splitlines(), 1):
            if re.match(r"\s*(-webkit-)?mask(-image)?\s*:", line):
                continue
            for pattern, what in RAW:
                if pattern.search(line):
                    errors.append(f"{name}.css: {what} on line {n}: {line.strip()[:80]}")
    if os.path.isfile(html):
        page = open(html, encoding="utf-8").read()
        if "dist/css/tokens.css" not in page:
            errors.append(f"{name}.html: doesn't link dist/css/tokens.css")
        if f"{name}.css" not in page:
            errors.append(f"{name}.html: doesn't link {name}.css")
    if os.path.isfile(cc):
        lines = open(cc, encoding="utf-8").read().splitlines()
        blueprint = open(os.path.join(folder, name + ".md"), encoding="utf-8").read()
        link = FIGMA.search(blueprint)
        if not lines or not lines[0].startswith("// url="):
            errors.append(f"{name}.figma.ts: first line must be // url=<Figma link>")
        elif link and lines[0][len("// url="):].strip() != link.group(1):
            errors.append(f"{name}.figma.ts: // url= doesn't match the blueprint's Figma link")
        if len(lines) < 2 or lines[1].strip() != f"// component={name}":
            errors.append(f"{name}.figma.ts: second line must be // component={name}")
        if "@figma/code-connect" in "\n".join(lines):
            errors.append(f"{name}.figma.ts: uses the old parser import; write a v2 template (import figma from \"figma\")")
    return errors


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    if args == ["--all"]:
        args = sorted(os.path.basename(os.path.dirname(d)) for d, _, _ in os.walk(COMPONENTS) if os.path.basename(d) == "web")
    failed = 0
    for name in args:
        errors = check(name)
        failed += bool(errors)
        print(f"{'FAIL' if errors else 'ok  '}  {name}")
        for e in errors:
            print(f"      {e}")
    print(f"\n{len(args) - failed} of {len(args)} pass")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
