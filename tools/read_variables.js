// Read every local variable collection from the Shaadi DNA Figma file.
// Read-only. Run through the Figma MCP (figma_execute), save the returned JSON,
// then:  python3 tools/import.py <that file>
//
// Same content as Figma's variables export, without the manual export step.
// "Colour at opacity" values (a colour variable shown at a percentage) come
// back as { composed, opacity, target }, which import.py turns into the same
// com.figma.composedColor record a Figma export carries.

const toHex = (c) => "#" + [c.r, c.g, c.b].map((n) => Math.round(n * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const byId = {};
for (const c of cols) for (const id of c.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); byId[id] = { v, c }; }
const out = [];
for (const c of cols) {
  const vars = [];
  for (const id of c.variableIds) {
    const v = byId[id].v;
    const values = {};
    for (const m of c.modes) {
      const val = v.valuesByMode[m.modeId];
      if (val && val.type === "VARIABLE_ALIAS") {
        const t = byId[val.id];
        values[m.name] = t ? { alias: t.v.name, targetId: t.v.id, setId: t.c.id, setName: t.c.name } : { alias: "?missing " + val.id };
      } else if (v.resolvedType === "COLOR" && val && "r" in val) {
        values[m.name] = { colorSpace: "srgb", components: [val.r, val.g, val.b], alpha: val.a, hex: toHex(val) };
      } else if (v.resolvedType === "COLOR" && val && val.color) {
        const t = val.color.type === "VARIABLE_ALIAS" ? byId[val.color.id] : null;
        values[m.name] = { composed: true, opacity: val.opacity, target: t ? t.v.name : null, targetId: t ? t.v.id : null, setId: t ? t.c.id : null, setName: t ? t.c.name : null };
      } else values[m.name] = val;
    }
    vars.push({ name: v.name, type: v.resolvedType, description: v.description, scopes: v.scopes, id: v.id, values });
  }
  out.push({ name: c.name, modes: c.modes.map((m) => m.name), vars });
}
return JSON.stringify({ kind: "figma-variables", collections: out });
