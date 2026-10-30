#!/usr/bin/env python3
"""
Start an update-log entry.

    python3 tools/new_update.py "Softened selected border"

Creates updates/YYYY-MM-DD-slug.md from the template and adds it to
updates/README.md. Fill in the blanks in plain language: what changed, why,
and what anyone consuming the foundation needs to do about it.
"""
import sys, os, re, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPDATES = os.path.join(ROOT, "updates")

TEMPLATE = """# {title}

**{date}**

## What changed
<!-- Plain language. One line per change. Name the tokens. -->
-

## Why
<!-- The reason, not the mechanics. What problem did this solve? -->

## Who needs to do something
<!-- Delete the rows that don't apply. -->
- **Designers:** nothing / pull the updated library
- **Web:** nothing / rebuild, values change automatically
- **Android:** nothing / re-copy dist/android
- **iOS:** nothing / re-copy dist/ios

## Checks
- [ ] `python3 tools/check.py` passes
- [ ] `python3 tools/build.py` run
- [ ] FOUNDATION.md updated if a rule changed
"""


def main():
    title = " ".join(sys.argv[1:]) or "Untitled update"
    date = datetime.date.today().isoformat()
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:50]
    path = os.path.join(UPDATES, f"{date}-{slug}.md")
    if os.path.exists(path):
        print(f"{path} already exists")
        sys.exit(1)
    open(path, "w").write(TEMPLATE.format(title=title, date=date))
    index = os.path.join(UPDATES, "README.md")
    line = f"- [{date} — {title}]({date}-{slug}.md)\n"
    if os.path.exists(index):
        text = open(index).read()
        marker = "<!-- entries -->\n"
        text = text.replace(marker, marker + line) if marker in text else text + line
        open(index, "w").write(text)
    print(f"Created updates/{os.path.basename(path)}")
    print("Fill it in, then commit it with the token change.")


if __name__ == "__main__":
    main()
