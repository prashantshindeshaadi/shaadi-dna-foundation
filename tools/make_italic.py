#!/usr/bin/env python3
"""
Build Lexend-SH VF Italic: an oblique companion to fonts/LexendSH-VF.ttf.

    python3 tools/make_italic.py [--angle 10]

Slants every outline by `angle` degrees around half the x-height, shears composite
offsets, gvar deltas (densified first, so inferred points stay correct) and GPOS
anchors the same way, then marks the font as italic (post, head, OS/2, hhea caret,
name table, fvar instance names, STAT ital axis). Writes fonts/LexendSH-VF-Italic.ttf
(+ .woff2 when brotli is available). Lexend is OFL; this is a modified build.
"""
import os, sys, math, argparse
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates
from fontTools.otlLib.builder import buildStatTable

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "fonts", "LexendSH-VF.ttf")
OUT = os.path.join(ROOT, "fonts", "LexendSH-VF-Italic.ttf")


def shear_simple(glyph, t, c):
    coords = glyph.coordinates
    glyph.coordinates = GlyphCoordinates([(round(x + t * (y - c)), y) for x, y in coords])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--angle", type=float, default=10.0)
    ap.add_argument("--src", default=SRC)
    ap.add_argument("--out", default=OUT)
    a = ap.parse_args()
    t = math.tan(math.radians(a.angle))

    f = TTFont(a.src)
    glyf, gvar = f["glyf"], f.get("gvar")
    c = (getattr(f["OS/2"], "sxHeight", 0) or 500) / 2.0

    # 1. densify gvar deltas against the ORIGINAL outlines, then shear them (dx' = dx + t*dy)
    if gvar:
        for name, variations in gvar.variations.items():
            g = glyf[name]
            if g.numberOfContours == 0:
                continue
            coords, control = glyf._getCoordinatesAndControls(name, f["hmtx"].metrics, f["vmtx"].metrics if "vmtx" in f else None)
            endPts = control[1]
            for var in variations:
                if g.isComposite():
                    pass  # component offsets: explicit, never inferred
                elif None in var.coordinates:
                    var.calcInferredDeltas(coords, endPts)
                var.coordinates = [None if d is None else (round(d[0] + t * d[1]), round(d[1])) for d in var.coordinates]

    # 2. shear outlines and composite offsets
    for name in f.getGlyphOrder():
        g = glyf[name]
        if g.numberOfContours == 0:
            continue
        if g.isComposite():
            for comp in g.components:
                comp.x = round(comp.x + t * comp.y)
        else:
            shear_simple(g, t, c)
    for name in f.getGlyphOrder():
        g = glyf[name]
        g.recalcBounds(glyf)
        if g.numberOfContours != 0 and hasattr(g, "xMin"):
            adv, _ = f["hmtx"][name]
            f["hmtx"][name] = (adv, g.xMin)

    # 3. GPOS anchors
    if "GPOS" in f:
        def shear_anchor(an):
            if an is not None and hasattr(an, "XCoordinate"):
                an.XCoordinate = round(an.XCoordinate + t * (an.YCoordinate - c))
        for lk in f["GPOS"].table.LookupList.Lookup:
            for st in lk.SubTable:
                st = getattr(st, "ExtSubTable", st)
                for rec in getattr(getattr(st, "MarkArray", None), "MarkRecord", []) or []:
                    shear_anchor(rec.MarkAnchor)
                for arr in ("BaseArray", "Mark2Array"):
                    a2 = getattr(st, arr, None)
                    if a2:
                        recs = getattr(a2, "BaseRecord", None) or getattr(a2, "Mark2Record", None) or []
                        for r in recs:
                            for an in (getattr(r, "BaseAnchor", None) or getattr(r, "Mark2Anchor", None) or []):
                                shear_anchor(an)
                la = getattr(st, "LigatureArray", None)
                if la:
                    for lat in la.LigatureAttach:
                        for cr in lat.ComponentRecord:
                            for an in cr.LigatureAnchor:
                                shear_anchor(an)
                for er in getattr(st, "EntryExitRecord", []) or []:
                    shear_anchor(er.EntryAnchor)
                    shear_anchor(er.ExitAnchor)

    # 4. italic flags
    f["post"].italicAngle = -a.angle
    f["head"].macStyle |= 0b10
    os2 = f["OS/2"]
    os2.fsSelection = (os2.fsSelection | 0b1) & ~(1 << 6)
    f["hhea"].caretSlopeRise = f["head"].unitsPerEm
    f["hhea"].caretSlopeRun = round(f["head"].unitsPerEm * t)

    # 5. names
    name = f["name"]
    fam = name.getDebugName(16) or name.getDebugName(1)
    ps = (name.getDebugName(25) or name.getDebugName(6).split("-")[0])
    def setn(nid, s):
        name.setName(s, nid, 3, 1, 0x409)
        name.setName(s, nid, 1, 0, 0)
    setn(2, "Italic"); setn(17, "Italic")
    setn(4, f"{fam} Italic"); setn(6, f"{ps}-Italic"); setn(25, f"{ps}Italic")
    setn(3, f"{name.getDebugName(5) or 'Version'};{ps}-Italic")
    for inst in f["fvar"].instances:
        base = name.getDebugName(inst.subfamilyNameID)
        new = "Italic" if base in ("Regular", "Italic") else f"{base} Italic"
        inst.subfamilyNameID = name.addName(new)
        if getattr(inst, "postscriptNameID", 0xFFFF) not in (0xFFFF, None):
            inst.postscriptNameID = name.addName(f"{ps}-{new.replace(' ', '')}")

    # 6. STAT: wght values from fvar instances + ital=1
    wvals = []
    for inst in f["fvar"].instances:
        w = inst.coordinates["wght"]
        base = name.getDebugName(inst.subfamilyNameID).replace(" Italic", "").replace("Italic", "Regular")
        v = dict(value=w, name=base)
        if base == "Regular":
            v["flags"] = 0x2
        wvals.append(v)
    axes = [dict(tag="wght", name="Weight", values=wvals),
            dict(tag="ital", name="Italic", values=[dict(value=1, name="Italic")])]
    buildStatTable(f, axes, elidedFallbackName=2)

    f.save(a.out)
    print("wrote", os.path.relpath(a.out, ROOT))
    try:
        w2 = TTFont(a.out); w2.flavor = "woff2"; w2.save(a.out.replace(".ttf", ".woff2"))
        print("wrote", os.path.relpath(a.out.replace(".ttf", ".woff2"), ROOT))
    except Exception as e:
        print("woff2 skipped:", e)


if __name__ == "__main__":
    main()
