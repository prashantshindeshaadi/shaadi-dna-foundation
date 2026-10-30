// Read sh-icon components from the Shaadi DNA Figma file for tools/components.py.
// Read-only. Run through the Figma MCP (figma_execute) with FROM/TO set to a
// slice of the icon sets (sorted by name), save the returned JSON, then:
//     python3 tools/components.py <saved files…>
//
// Per icon: name, type (line / filled / pictogram / brand), sizes, and one SVG
// per type at its largest size. Line and filled icons scale from the 24 master;
// pictograms and brand marks are exported at their own size. Artwork that is
// a bitmap in Figma comes out as a 2x PNG instead.

const FROM = __FROM__, TO = __TO__;
await figma.loadAllPagesAsync();
const pages = ["2659:26708", "61:2973"];
let sets = [];
for (const pid of pages) {
  const page = await figma.getNodeByIdAsync(pid);
  sets = sets.concat(page.findAllWithCriteria({ types: ["COMPONENT_SET", "COMPONENT"] })
    .filter(n => n.name.startsWith("sh-icon/") && (n.type === "COMPONENT_SET" || n.parent.type !== "COMPONENT_SET")));
}
sets.sort((a, b) => a.name.localeCompare(b.name));
// String.fromCharCode(...bytes) overflows on big SVGs, so decode in chunks.
const decode = (bytes) => { let s = ""; for (let i = 0; i < bytes.length; i += 8192) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192)); return s; };
const out = { total: sets.length, icons: [] };
for (const s of sets.slice(FROM, TO)) {
  const comps = s.type === "COMPONENT_SET" ? s.children : [s];
  const byType = {};
  for (const c of comps) {
    let vp = {};
    try { vp = c.variantProperties || {}; } catch (e) {}
    const type = (vp.Type || vp.type || "single").toLowerCase();
    const size = Number(vp.Size || vp.size) || Math.round(c.width);
    (byType[type] = byType[type] || { sizes: [], largest: null })
    byType[type].sizes.push(size);
    if (!byType[type].largest || size > byType[type].largest.size) byType[type].largest = { size, node: c };
  }
  const types = {};
  for (const [t, d] of Object.entries(byType)) {
    const entry = { sizes: d.sizes.sort((a, b) => a - b) };
    try {
      const svg = await d.largest.node.exportAsync({ format: "SVG", svgIdOnly: true, svgSimplifyStroke: true });
      if (svg.length <= 60000) entry.svg = decode(svg);
      else {   // raster-backed artwork: an SVG would only embed the bitmap
        const png = await d.largest.node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
        entry.png = figma.base64Encode(png);
        entry.pngScale = 2;
      }
    } catch (e) { entry.error = String(e).slice(0, 80); }
    types[t] = entry;
  }
  out.icons.push({ name: s.name, description: s.description, types });
}
return JSON.stringify(out);
