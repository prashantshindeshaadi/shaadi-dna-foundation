// Deep read of ONE component set for writing its platform code (web/, compose/, swiftui/).
// Read-only. Run through the Figma MCP (figma_execute) with SET set to the set's node id.
// Unlike tools/read_components.js it goes INSIDE nested instances, so it shows what each
// variant really renders: sizes, auto layout, radius, opacity, text and its style, every
// bound variable by name, paint/effect styles. Hidden layers are skipped.
//
// The result is large and lands in a tool-results file. Turn it into one line per layer:
//     python3 tools/deep_lines.py <saved file> > /tmp/<sh-name>-deep.txt
// then compare every variant line by line with the code.

const SET = "__SET__";
const set = await figma.getNodeByIdAsync(SET);
const varName = {};
const vn = async (id) => { if (!(id in varName)) { const v = await figma.variables.getVariableByIdAsync(id); varName[id] = v ? v.name : "?" + id; } return varName[id]; };
const styleCache = {};
const sn = async (id) => { if (!id || id === figma.mixed) return null; if (!(id in styleCache)) { const s = await figma.getStyleByIdAsync(id); styleCache[id] = s ? s.name : null; } return styleCache[id]; };

async function dump(n, path, rows, depth) {
  if (n.visible === false) return;
  const p = path ? path + "/" + n.name : n.name;
  const r = { p, t: n.type[0] + n.type.slice(1, 4).toLowerCase(), w: Math.round(n.width), h: Math.round(n.height) };
  if (n.type === "INSTANCE") { const m = await n.getMainComponentAsync(); r.of = m ? (m.parent && m.parent.type === "COMPONENT_SET" ? m.parent.name + "|" + m.name : m.name) : null; }
  if (n.layoutMode && n.layoutMode !== "NONE") r.l = [n.layoutMode[0], n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft, n.itemSpacing, n.primaryAxisAlignItems, n.counterAxisAlignItems].join(",");
  if ("cornerRadius" in n && n.cornerRadius && n.cornerRadius !== figma.mixed) r.r = n.cornerRadius;
  if (n.opacity !== undefined && n.opacity < 1) r.o = Math.round(n.opacity * 100) / 100;
  if (n.type === "TEXT") {
    r.x = n.characters.slice(0, 60);    // keep U+2028 line breaks: they are real breaks in the copy
    r.fs = n.fontSize === figma.mixed ? "mix" : n.fontSize;
    r.ta = n.textAlignHorizontal;
    r.td = n.textDecoration === figma.mixed ? "mix" : n.textDecoration;
    try { r.st = await sn(n.textStyleId); } catch (e) {}
  }
  const b = n.boundVariables || {}; const bs = [];
  for (const [k, v] of Object.entries(b)) {
    const arr = Array.isArray(v) ? v : (v && v.id ? [v] : Object.values(v || {}));
    for (const a of arr) if (a && a.id) bs.push(k + "=" + await vn(a.id));
  }
  if (bs.length) r.b = [...new Set(bs)].join(" ");
  try {
    const es = await sn(n.effectStyleId); if (es) r.es = es;
    const fs = await sn(n.fillStyleId); if (fs) r.fst = fs;
    const ss = await sn(n.strokeStyleId); if (ss) r.sst = ss;
  } catch (e) {}
  if ("fills" in n && n.fills !== figma.mixed && n.fills.length) r.f = n.fills.filter(f => f.visible !== false).map(f => f.type === "SOLID" ? "S" : f.type === "IMAGE" ? "IMG" : f.type.replace("GRADIENT_", "G")).join("+");
  if ("strokes" in n && n.strokes.length) r.s = n.strokes.filter(s => s.visible !== false).length + " stroke(s)";
  if ("effects" in n && n.effects.length) r.e = n.effects.filter(e => e.visible).map(e => e.type[0] + e.type.split("_")[1][0] + (e.radius || "")).join("+");
  rows.push(r);
  if (n.children && depth < 12) for (const c of n.children) await dump(c, p, rows, depth + 1);
}

const out = {};
const variants = set.type === "COMPONENT_SET" ? set.children : [set];
for (const v of variants) { const rows = []; for (const c of v.children) await dump(c, "", rows, 0); out[v.name] = rows; }
return JSON.stringify(out) + " ".repeat(150000);   // padding forces the result into a file
