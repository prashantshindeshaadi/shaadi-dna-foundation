// Read every sh-gradient colour style (gradients and solids) from the Shaadi DNA Figma file.
// Read-only. Run through the Figma MCP (figma_execute) or a plugin console,
// save the returned JSON as a file, then:  python3 tools/import.py <that file>
//
// Figma variable exports don't include styles, so gradients come in this way.

const toHex = (c) => "#" + [c.r, c.g, c.b].map((n) => Math.round(n * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
const styles = {};
for (const s of await figma.getLocalPaintStylesAsync()) {
  if (!s.name.startsWith("sh-gradient/")) continue;
  const layers = [];
  for (const p of s.paints) {
    if (p.visible === false) continue;
    const solid = p.type === "SOLID";
    if (!solid && !p.type.startsWith("GRADIENT")) continue;
    const raw = solid ? [{ position: 0, color: { ...p.color, a: 1 }, boundVariables: p.boundVariables }] : p.gradientStops;
    const stops = [];
    for (const st of raw) {
      const stop = { position: Math.round(st.position * 10000) / 10000 };
      const bound = st.boundVariables && st.boundVariables.color;
      if (bound) {
        const v = await figma.variables.getVariableByIdAsync(bound.id);
        const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
        stop.token = c.name + "/" + v.name;
      } else {
        stop.hex = toHex(st.color);
        stop.alpha = Math.round(st.color.a * 1000) / 1000;
      }
      stops.push(stop);
    }
    const layer = { type: solid ? "solid" : p.type.replace("GRADIENT_", "").toLowerCase(), opacity: p.opacity };
    if (!solid) layer.transform = p.gradientTransform.map((r) => r.map((n) => Math.round(n * 10000) / 10000));
    layer.stops = solid ? stops.map(({ position, ...rest }) => rest) : stops;
    layers.push(layer);
  }
  styles[s.name.slice("sh-gradient/".length)] = { description: s.description, layers };
}
return JSON.stringify({ collection: "sh-gradient", kind: "paint-styles", styles });
