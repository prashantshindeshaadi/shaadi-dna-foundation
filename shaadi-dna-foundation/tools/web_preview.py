#!/usr/bin/env python3
"""
Render a component's web/ HTML to a PNG with headless Chrome.

    python3 tools/web_preview.py components/sh-tag/web/sh-tag.html out.png [--width 1200] [--height 1600]

CSS masks don't load from file:// (icons would vanish), so the page is first inlined:
every <link rel="stylesheet">, url(...) and src="..." pointing at a local file becomes
inline CSS or a data: URI. The inlined copy is written next to out.png.
"""
import argparse, base64, os, re, subprocess, sys, time, urllib.parse

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
MIME = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "woff2": "font/woff2", "ttf": "font/ttf", "svg": "image/svg+xml"}


def data_uri(path):
    ext = path.rsplit(".", 1)[-1].lower()
    raw = open(path, "rb").read()
    if ext == "svg":
        return "data:image/svg+xml," + urllib.parse.quote(raw.decode())
    return f"data:{MIME.get(ext, 'application/octet-stream')};base64," + base64.b64encode(raw).decode()


def local(base, ref):
    if re.match(r"^(data:|https?:|#)", ref):
        return None
    p = os.path.normpath(os.path.join(base, urllib.parse.unquote(ref.split("#")[0].split("?")[0])))
    return p if os.path.isfile(p) else None


def inline_urls(text, base):
    def sub(m):
        p = local(base, m.group(2))
        return f"url('{data_uri(p)}')" if p else m.group(0)
    return re.sub(r"url\((['\"]?)([^)'\"]+)\1\)", sub, text)


def inline(html_path):
    base = os.path.dirname(os.path.abspath(html_path))
    h = open(html_path).read()

    def css(m):
        p = local(base, m.group(1))
        return f"<style>{inline_urls(open(p).read(), os.path.dirname(p))}</style>" if p else m.group(0)
    h = re.sub(r'<link rel="stylesheet" href="([^"]+)"\s*/?>', css, h)
    h = inline_urls(h, base)

    def src(m):
        p = local(base, m.group(1))
        return f'src="{data_uri(p)}"' if p else m.group(0)
    return re.sub(r'src="([^"]+)"', src, h)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("html"); ap.add_argument("png")
    ap.add_argument("--width", type=int, default=1200); ap.add_argument("--height", type=int, default=1600)
    a = ap.parse_args()
    out_html = os.path.splitext(os.path.abspath(a.png))[0] + ".inlined.html"
    open(out_html, "w").write(inline(a.html))
    if os.path.exists(a.png):
        os.remove(a.png)
    proc = subprocess.Popen([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                             f"--window-size={a.width},{a.height}", f"--screenshot={os.path.abspath(a.png)}",
                             "file://" + out_html], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):   # Chrome keeps running after the screenshot; stop it once the file exists
        time.sleep(0.5)
        if os.path.exists(a.png) and os.path.getsize(a.png) > 0:
            time.sleep(0.5)
            break
    proc.kill()
    if not os.path.exists(a.png):
        sys.exit("No screenshot written")
    print(a.png)


if __name__ == "__main__":
    main()
