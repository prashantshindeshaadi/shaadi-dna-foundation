// Read sh-* component sets from the Shaadi DNA Figma file for tools/components.py.
// Read-only. Run through the Figma MCP (figma_execute) or a plugin console with
// SETS set to the component-set node ids to read (see tools/components.py for
// the full list). Save the returned JSON, then:
//     python3 tools/components.py <saved files…>
//
// Per set: properties, every variant's size and token bindings, and the layer
// anatomy of the first variant. Nested instances are recorded by name and
// property values only — their internals belong to their own component.

const SETS = __SETS__;
const styleNames = {};
const styleName = async (id) => {
  if (!id || typeof id !== "string") return null;
  if (!(id in styleNames)) { const s = await figma.getStyleByIdAsync(id); styleNames[id] = s ? s.name : null; }
  return styleNames[id];
};
const MIXED = figma.mixed;

async function bindings(n, path, rows) {
  const b = n.boundVariables || {};
  for (const k of Object.keys(b)) {
    const v = b[k];
    if (Array.isArray(v)) v.forEach((x, i) => x && x.id && rows.push([path, k + "[" + i + "]", x.id]));
    else if (v && v.id) rows.push([path, k, v.id]);
    else if (v && typeof v === "object") for (const kk of Object.keys(v)) v[kk] && v[kk].id && rows.push([path, k + "." + kk, v[kk].id]);
  }
  for (const [prop, key] of [["fillStyleId", "fill-style"], ["strokeStyleId", "stroke-style"], ["effectStyleId", "effect-style"], ["textStyleId", "text-style"]]) {
    try { if (prop in n && n[prop] && n[prop] !== MIXED) { const s = await styleName(n[prop]); if (s) rows.push([path, key, "style:" + s]); } } catch (e) {}
  }
}

function instanceProps(n) {
  const out = {};
  try {   // a nested instance whose set has errors throws here; record and move on
    for (const [k, p] of Object.entries(n.componentProperties || {})) {
      out[k.replace(/#\d+:\d+$/, "")] = p.type === "INSTANCE_SWAP" ? "instance" : p.value;
    }
  } catch (e) { out._error = String(e).slice(0, 80); }
  return out;
}

async function walk(n, path, rows, tree, depth) {
  const here = path ? path + " / " + n.name : n.name;
  const node = { name: n.name, type: n.type };
  if (n.visible === false) node.hidden = true;
  if (n.type === "INSTANCE") {
    let main = null;
    try { main = await n.getMainComponentAsync(); } catch (e) {}
    node.of = main ? (main.parent && main.parent.type === "COMPONENT_SET" ? main.parent.name : main.name) : null;
    const p = instanceProps(n); if (Object.keys(p).length) node.props = p;
    await bindings(n, here, rows);
    if (tree) tree.push(node);
    return;   // never descend into an instance
  }
  if (n.type === "TEXT") node.text = n.characters.slice(0, 60);
  if (n.layoutMode && n.layoutMode !== "NONE") {
    node.layout = { dir: n.layoutMode === "HORIZONTAL" ? "row" : "column", pad: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft], gap: n.itemSpacing };
  }
  if ("layoutSizingHorizontal" in n) node.sizing = [n.layoutSizingHorizontal, n.layoutSizingVertical];
  if ("cornerRadius" in n && n.cornerRadius !== MIXED && n.cornerRadius) node.radius = n.cornerRadius;
  if ("strokeWeight" in n && n.strokes && n.strokes.length && n.strokeWeight !== MIXED) node.stroke = n.strokeWeight;
  await bindings(n, here, rows);
  if (n.children && depth < 8) {
    node.children = tree ? [] : null;
    for (const c of n.children) await walk(c, here, rows, node.children, depth + 1);
    if (!tree) delete node.children;
  }
  if (tree) tree.push(node);
}

const out = [];
for (const id of SETS) {
  const s = await figma.getNodeByIdAsync(id);
  if (!s) { out.push({ id, missing: true }); continue; }
  const comps = s.type === "COMPONENT_SET" ? s.children : [s];
  const props = {};
  let propsError = null;
  try {
    for (const [k, d] of Object.entries(s.componentPropertyDefinitions || {})) {
      props[k.replace(/#\d+:\d+$/, "")] = { type: d.type, default: d.type === "INSTANCE_SWAP" ? "instance" : d.defaultValue, options: d.variantOptions };
    }
  } catch (e) { propsError = String(e).slice(0, 120); }
  const variants = [];
  for (let i = 0; i < comps.length; i++) {
    const c = comps[i];
    const rows = [];
    const tree = i === 0 ? [] : null;
    const root = { name: c.name };
    if (c.layoutMode && c.layoutMode !== "NONE") root.layout = { dir: c.layoutMode === "HORIZONTAL" ? "row" : "column", pad: [c.paddingTop, c.paddingRight, c.paddingBottom, c.paddingLeft], gap: c.itemSpacing };
    await bindings(c, "", rows);
    for (const ch of c.children || []) await walk(ch, "", rows, tree, 1);
    let vp = {};
    try { vp = c.variantProperties || {}; } catch (e) {}
    variants.push({ name: c.name, variant: vp, w: Math.round(c.width * 100) / 100, h: Math.round(c.height * 100) / 100, root, bindings: rows, tree });
  }
  out.push({ id, name: s.name, page: s.parent && s.parent.type === "PAGE" ? s.parent.name : (s.parent && s.parent.parent ? s.parent.parent.name : null), description: s.description, props, propsError, variants });
}
return JSON.stringify(out);
