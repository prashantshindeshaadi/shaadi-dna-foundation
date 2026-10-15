"""sh-gradient colour styles: read tokens/sh-gradient.json, resolve, and write code.

Each style is one or more layers (bottom first, as in Figma). A layer is a
linear gradient or a solid; every stop names a colour token, so the style
follows Light/Dark on its own. Used by import.py, check.py and build.py.
"""
import json, math, os, re
from lib import TOKENS, resolve, var_name

PATH = os.path.join(TOKENS, "sh-gradient.json")
MODES = ["Light", "Dark"]


def load():
    return json.load(open(PATH)) if os.path.exists(PATH) else None


def ends(transform):
    """Figma gradientTransform -> start and end points in the 0..1 box (y down)."""
    (a, b, c), (d, e, f) = transform
    det = a * e - b * d
    inv = lambda gx, gy: (((gx - c) * e - (gy - f) * b) / det, ((gy - f) * a - (gx - c) * d) / det)
    return inv(0, 0.5), inv(1, 0.5)


def css_angle(transform):
    (x0, y0), (x1, y1) = ends(transform)
    return round(math.degrees(math.atan2(x1 - x0, -(y1 - y0)))) % 360


def stop_color(data, stop, mode):
    """(hex, alpha) for a stop in a mode."""
    if "token" in stop:
        coll, key = stop["token"].split("/", 1)
        m = mode if mode in data[coll]["modes"] else data[coll]["modes"][0]
        v, _ = resolve(data, coll, m, key)
        return v["hex"], v.get("alpha", 1)
    return stop["hex"], stop.get("alpha", 1)


def problems(data, styles):
    """(errors, warnings) for check.py."""
    errors, warnings = [], []
    for name, s in styles["styles"].items():
        lines = s.get("description", "").splitlines()
        if len(lines) != 2 or lines[0] != f"sh-gradient/{name}" or not lines[1].startswith("Purpose: "):
            warnings.append(f"sh-gradient/{name}: description is not 'name' + 'Purpose:' lines")
        for layer in s["layers"]:
            for stop in layer["stops"]:
                if "token" not in stop:
                    msg = f"sh-gradient/{name}: has raw colours, not bound to tokens"
                    if msg not in warnings:
                        warnings.append(msg)
                    continue
                coll, key = stop["token"].split("/", 1)
                if coll not in data or key not in data[coll]["tokens"]:
                    errors.append(f"sh-gradient/{name}: stop token {stop['token']} doesn't exist")
    return errors, warnings


# ---- web ----------------------------------------------------------------
def css(data, styles):
    """--sh-gradient-* custom properties. Stops reference colour variables, so they theme."""
    out = []
    for name, s in styles["styles"].items():
        parts = []
        for layer in reversed(s["layers"]):            # CSS lists the top layer first
            def col(stop):
                c = f"var({var_name(*stop['token'].split('/', 1))})" if "token" in stop else \
                    (stop["hex"] if stop.get("alpha", 1) >= 1 else "rgba({}, {}, {}, {})".format(
                        *[int(stop["hex"][i:i + 2], 16) for i in (1, 3, 5)], stop["alpha"]))
                op = layer.get("opacity", 1)
                return c if op >= 1 else f"color-mix(in srgb, {c} {round(op * 100)}%, transparent)"
            if layer["type"] == "solid":
                c = col(layer["stops"][0])
                parts.append(f"linear-gradient({c}, {c})")
            else:
                stops = ", ".join(f"{col(st)} {round(st['position'] * 100)}%" for st in layer["stops"])
                parts.append(f"linear-gradient({css_angle(layer['transform'])}deg, {stops})")
        out.append(f"  --sh-gradient-{re.sub(r'[^a-z0-9]+', '-', name.lower())}: {', '.join(parts)};")
    return out


def json_entries(data, styles):
    flat = {}
    for name, s in styles["styles"].items():
        flat[f"sh-gradient/{name}"] = {
            "type": "gradient", "css": f"--sh-gradient-{re.sub(r'[^a-z0-9]+', '-', name.lower())}",
            "description": s.get("description", "").split("\n", 1)[-1],
            "layers": [{"type": l["type"],
                        **({"angle": css_angle(l["transform"])} if l["type"] != "solid" else {}),
                        "opacity": l.get("opacity", 1),
                        "stops": [{**({"position": st["position"]} if "position" in st else {}),
                                   **({"token": st["token"]} if "token" in st else {}),
                                   "values": {m: "{} @{}%".format(*(lambda h, a: (h, round(a * 100)))(*stop_color(data, st, m)))
                                              for m in MODES}} for st in l["stops"]]}
                       for l in s["layers"]]}
    return flat


# ---- Android ------------------------------------------------------------
def _argb(hexc, alpha):
    return f"#{int(round(alpha * 255)):02X}{hexc[1:]}" if alpha < 1 else hexc


def _shape(data, layer, mode):
    """One Android <shape> for a layer, or None if XML gradients can't express it."""
    op = layer.get("opacity", 1)
    cols = [(_argb(h, a * op), st.get("position", 0))
            for st in layer["stops"] for h, a in [stop_color(data, st, mode)]]
    if layer["type"] == "solid":
        return f'<shape><solid android:color="{cols[0][0]}" /></shape>'
    if len(cols) > 3 or (len(cols) == 3 and cols[1][1] != 0.5):
        return None
    attrs = f'android:type="linear" android:angle="{(90 - css_angle(layer["transform"])) % 360}" android:startColor="{cols[0][0]}"'
    if len(cols) == 3:
        attrs += f' android:centerColor="{cols[1][0]}"'
    return f'<shape><gradient {attrs} android:endColor="{cols[-1][0]}" /></shape>'


def android(data, styles):
    """drawable/ and drawable-night/. Android XML gradients take at most 3 stops (centre at 50%)."""
    ns = 'xmlns:android="http://schemas.android.com/apk/res/android"'
    files, skipped = {}, []
    for name, s in styles["styles"].items():
        res = "sh_gradient_" + re.sub(r"[^a-z0-9]+", "_", name.lower())
        out = {}
        for mode, folder in (("Light", "drawable"), ("Dark", "drawable-night")):
            shapes = [_shape(data, l, mode) for l in s["layers"]]
            if None in shapes:
                break
            if len(shapes) == 1:
                body = shapes[0].replace("<shape>", f"<shape {ns}>", 1)
            else:
                body = f"<layer-list {ns}>" + "".join(f"<item>{x}</item>" for x in shapes) + "</layer-list>"
            out[f"{folder}/{res}.xml"] = (f'<?xml version="1.0" encoding="utf-8"?>\n'
                                          f"<!-- sh-gradient/{name}. Generated by tools/build.py, do not edit. -->\n{body}\n")
        else:
            files.update(out)
            continue
        skipped.append(name)
    return files, skipped


# ---- iOS ----------------------------------------------------------------
def swift(data, styles, ident):
    L = ["", "    public enum Gradient {"]
    for name, s in styles["styles"].items():
        layers = []
        for layer in s["layers"]:
            op = layer.get("opacity", 1)
            stops = []
            for i, st in enumerate(layer["stops"]):
                (lh, la), (dh, da) = (stop_color(data, st, m) for m in MODES)
                color = f'SHColor(light: "{lh}", lightAlpha: {round(la * op, 3)}, dark: "{dh}", darkAlpha: {round(da * op, 3)})'
                stops.append(f"SHGradient.Stop(color: {color}, location: {st.get('position', 0)})")
            if layer["type"] == "solid":
                start, end = (0.5, 0), (0.5, 1)
                stops.append(stops[0].replace("location: 0", "location: 1"))
            else:
                start, end = ends(layer["transform"])
            r = lambda p: f"UnitPoint(x: {round(p[0], 4)}, y: {round(p[1], 4)})"
            layers.append(f"SHGradient.Layer(stops: [{', '.join(stops)}], start: {r(start)}, end: {r(end)})")
        L.append(f"        public static let {ident(name)} = SHGradient(layers: [")
        L += [f"            {x}," for x in layers] + ["        ])"]
    L.append("    }")
    return L


SWIFT_TYPES = """
/// A colour style: one or more gradient layers, bottom first, as in Figma.
public struct SHGradient {
    public struct Stop { public let color: SHColor; public let location: CGFloat }
    public struct Layer {
        public let stops: [Stop]
        public let start: UnitPoint
        public let end: UnitPoint
        public var linear: LinearGradient {
            LinearGradient(stops: stops.map { .init(color: $0.color.color, location: $0.location) },
                           startPoint: start, endPoint: end)
        }
    }
    public let layers: [Layer]

    /// Use as a background: .background(SH.Gradient.brandDefault.view)
    public var view: some View {
        ZStack { ForEach(layers.indices, id: \\.self) { layers[$0].linear } }
    }
}
"""
