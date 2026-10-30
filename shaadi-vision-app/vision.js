/*
 * Shaadi Vision App — Catalog + Stories, rendered from the Shaadi DNA Foundation.
 *
 * Data:  ../shaadi-dna-foundation/dist/json/tokens.json   (tools/build.py)
 *        ../shaadi-dna-foundation/dist/vision/catalog.json (tools/vision.py, run by build.py)
 *        ../shaadi-dna-foundation/dist/sh-typo-kit/developer/web/sh-typo.css (text style names)
 *        stories.json                                      (this folder, one entry per Jira story)
 * Routes: #/catalog · #/catalog/<page> · #/catalog/components/<sh-name> · #/stories/<JIRA-ID>
 */
(() => {
  "use strict";

  const FOUNDATION = "../shaadi-dna-foundation/";
  const GITLAB = "https://gitlab.com/shaadi/shaadi-app/ai/vision/-/blob/main/shaadi-dna-foundation/";
  const THEME_KEY = "vn-theme";

  const TOKEN_PAGES = [
    { id: "colours", title: "Colours" },
    { id: "gradients", title: "Gradients" },
    { id: "typography", title: "Typography" },
    { id: "spacing", title: "Spacing" },
    { id: "radius", title: "Radius" },
    { id: "stroke", title: "Stroke" },
    { id: "opacity", title: "Opacity" },
    { id: "shadows", title: "Shadows" },
    { id: "icons", title: "Icons" },
  ];

  const state = { tokens: {}, catalog: { components: [], icons: {} }, stories: [], typo: [] };
  const ui = { compQuery: "", compWebOnly: false, compStatus: "all", iconKind: "line", iconQuery: "" };

  // Component life (FOUNDATION.md §8). Colours are §4.2 soft pairs; the word itself is the non-colour cue.
  const STATUS = {
    "draft": { label: "Draft", hint: "Still being designed in Figma" },
    "proposed": { label: "Proposed", hint: "Ready for dev: blueprint and draft code in this repo" },
    "in-refinement": { label: "In refinement", hint: "A developer is building it properly" },
    "core": { label: "Core", hint: "Released in the developers' library, Figma aligned" },
  };

  const $main = document.getElementById("main");
  const $nav = document.getElementById("nav");

  // ---------- helpers ----------

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tokensOf = (prefix, type) => Object.entries(state.tokens).filter(([k, v]) => k.startsWith(prefix) && (!type || v.type === type));
  const purpose = (t) => (t.description || "").replace(/^Purpose:\s*/, "");
  const valueText = (t) => {
    const v = t.values || {};
    if ("Value" in v) return v.Value;
    return Object.entries(v).map(([mode, val]) => `${mode} ${val}`).join(" · ");
  };
  const px = (t) => parseFloat((t.values || {}).Value) || 0;
  // Absolute URL: a url() inside the --icon custom property resolves against sh-icon.css, not this page.
  const iconUrl = (path) => new URL(`${FOUNDATION}icons/${path}`, location.href).href;
  const icon = (path, size = 16) => `<span class="sh-icon sh-icon--${size}" style="--icon:url(${iconUrl(path)})" aria-hidden="true"></span>`;

  async function loadJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.json();
  }

  // ---------- theme ----------

  function currentTheme() {
    try { return localStorage.getItem(THEME_KEY) || "system"; } catch { return "system"; }
  }
  function effectiveTheme() {
    const t = currentTheme();
    if (t !== "system") return t;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(choice) {
    try { localStorage.setItem(THEME_KEY, choice); } catch { /* private window */ }
    const root = document.documentElement;
    if (choice === "system") root.removeAttribute("data-theme"); else root.dataset.theme = choice;
    document.querySelectorAll("[data-theme-choice]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.themeChoice === choice)));
    document.querySelectorAll("iframe").forEach(themeFrame);
  }
  function themeFrame(frame) {
    try { frame.contentDocument.documentElement.dataset.theme = effectiveTheme(); } catch { /* not loaded yet */ }
  }
  document.querySelectorAll("[data-theme-choice]").forEach((b) => b.addEventListener("click", () => applyTheme(b.dataset.themeChoice)));
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme(currentTheme()));

  // ---------- nav ----------

  function renderNav(route) {
    const link = (href, label, count) => {
      const target = href.slice(2);
      const current = route === target || (target !== "catalog" && route.startsWith(target + "/"));
      return `<a class="vn-nav__item sh-body-md" href="${href}"${current ? ' aria-current="page"' : ""}><span>${esc(label)}</span>${count != null ? `<span class="vn-nav__count sh-support-meta">${count}</span>` : ""}</a>`;
    };
    $nav.innerHTML = [
      `<p class="vn-nav__group sh-support-label">Catalog</p>`,
      link("#/catalog", "Overview"),
      ...TOKEN_PAGES.map((p) => link(`#/catalog/${p.id}`, p.title)),
      link("#/catalog/components", "Components", state.catalog.components.length),
      `<p class="vn-nav__group sh-support-label">Stories</p>`,
      ...state.stories.map((s) => link(`#/stories/${s.id}`, `${s.id} · ${s.title}`)),
    ].join("");
  }

  function head(title, text) {
    return `<div class="vn-head"><h1 class="sh-heading-lg">${esc(title)}</h1>${text ? `<p class="sh-body-md">${text}</p>` : ""}</div>`;
  }

  // ---------- catalog: overview ----------

  function pageOverview() {
    const comps = state.catalog.components;
    const nIcons = Object.values(state.catalog.icons).reduce((n, list) => n + list.length, 0);
    const stat = (href, n, label) => `<a class="vn-card" href="${href}"><span class="sh-display vn-stat">${n}</span><span class="sh-body-md vn-muted">${label}</span></a>`;
    return head("Shaadi Vision", "Everything here is drawn live from the Shaadi DNA Foundation: Figma → foundation → this app. If it looks wrong here, it's wrong in the repo.") +
      `<div class="vn-stats">
        ${stat("#/catalog/colours", Object.keys(state.tokens).length, "Tokens")}
        ${stat("#/catalog/components", comps.length, "Components")}
        ${stat("#/catalog/components", comps.filter((c) => c.demo).length, "With web code")}
        ${stat("#/catalog/icons", nIcons, "Icons")}
        ${stat(state.stories[0] ? `#/stories/${state.stories[0].id}` : "#/catalog", state.stories.length, "Stories")}
      </div>
      <section class="vn-section"><h2 class="sh-title-lg">Component status</h2><div class="vn-stats">${
        Object.entries(STATUS).map(([id, s]) => `<a class="vn-card" href="#/catalog/components" data-go-status="${id}">
          <span class="sh-display vn-stat">${comps.filter((c) => c.status === id).length}</span>
          <span class="vn-status vn-status--${id} sh-support-label">${s.label}</span>
          <span class="sh-body-sm vn-muted">${s.hint}</span></a>`).join("")}</div></section>`;
  }

  // ---------- catalog: tokens ----------

  function pageColours() {
    const groups = {};
    for (const [key, t] of tokensOf("sh-color-common/", "color")) (groups[key.split("/")[1]] ||= []).push([key, t]);
    groups.translucent = tokensOf("sh-translucent/", "color");
    const swatch = ([key, t]) => {
      const v = t.values || {};
      const half = (mode) => `<span class="vn-half vn-checker"${mode === "Dark" ? ' data-theme="dark"' : ""}><span class="vn-paint" style="background:${esc(v[mode])}"></span><span class="vn-chip-label sh-support-micro">${mode}</span></span>`;
      const chip = "Value" in v
        ? `<div class="vn-swatch__chip vn-swatch__chip--one"><span class="vn-half vn-checker"><span class="vn-paint" style="background:var(${t.css})"></span></span></div>`
        : `<div class="vn-swatch__chip">${half("Light")}${half("Dark")}</div>`;
      return `<div class="vn-card vn-swatch">${chip}<div class="vn-swatch__body">
        <span class="sh-title-sm">${esc(key.split("/").slice(1).join("/"))}</span>
        <span class="vn-code sh-support-meta">var(${esc(t.css)})</span>
        <span class="sh-support-meta vn-muted">${esc(valueText(t))}</span>
        <span class="sh-body-sm vn-muted">${esc(purpose(t))}</span></div></div>`;
    };
    const html = Object.entries(groups).map(([g, list]) =>
      `<section class="vn-section"><h2 class="sh-title-lg">${esc(g)}</h2><div class="vn-grid">${list.map(swatch).join("")}</div></section>`).join("");
    return head("Colours", "Every colour token, Light and Dark side by side, painted with the values the build ships (dist/json/tokens.json).") + html;
  }

  function pageGradients() {
    const cards = tokensOf("sh-gradient/").map(([key, t]) => `<div class="vn-card vn-swatch">
      <div class="vn-swatch__chip vn-swatch__chip--one" style="background:var(${t.css})"></div>
      <div class="vn-swatch__body"><span class="sh-title-sm">${esc(key.replace("sh-gradient/", ""))}</span>
      <span class="vn-code sh-support-meta">var(${esc(t.css)})</span>
      <span class="sh-body-sm vn-muted">${esc(purpose(t))}</span></div></div>`).join("");
    return head("Gradients", "The sh-gradient styles, painted from their CSS variables. They follow the theme.") + `<div class="vn-grid">${cards}</div>`;
  }

  function pageTypography() {
    const groups = {};
    for (const cls of state.typo) (groups[cls.replace(/^sh-/, "").split("-")[0]] ||= []).push(cls);
    const rows = Object.entries(groups).map(([g, list]) => `<section class="vn-section"><h2 class="sh-title-lg">${esc(g)}</h2><div class="vn-rows">${
      list.map((cls) => `<div class="vn-row"><div class="vn-row__meta"><span class="sh-title-sm">.${esc(cls)}</span><span class="vn-code sh-support-meta" data-type-metrics="${esc(cls)}"></span></div>
        <div class="vn-type-sample ${esc(cls)}">Find someone who gets you</div></div>`).join("")}</div></section>`).join("");
    return head("Typography", "The sh-typo kit's text styles (Lexend-SH). Size, line height and weight are read from the rendered sample.") + rows;
  }
  function fillTypeMetrics() {
    document.querySelectorAll("[data-type-metrics]").forEach((el) => {
      const sample = el.closest(".vn-row").querySelector(".vn-type-sample");
      const cs = getComputedStyle(sample);
      el.textContent = `${cs.fontSize} / ${cs.lineHeight} · ${cs.fontWeight}`;
    });
  }

  function tokenRows(prefix, sample) {
    const list = tokensOf(prefix, "number").sort((a, b) => px(a[1]) - px(b[1]));
    return `<div class="vn-rows">${list.map(([key, t]) => `<div class="vn-row">
      <div class="vn-row__meta"><span class="sh-title-sm">${esc(key.replace(prefix, ""))} · ${esc(valueText(t))}</span>
      <span class="vn-code sh-support-meta">var(${esc(t.css)})</span><span class="sh-body-sm vn-muted">${esc(purpose(t))}</span></div>
      <div>${sample(t)}</div></div>`).join("")}</div>`;
  }
  const pageSpacing = () => head("Spacing", "Primitive steps and the semantic roles built on them.") +
    tokenRows("sh-space/", (t) => `<div class="vn-bar-sample" style="width:var(${t.css})"></div>`);
  const pageRadius = () => head("Radius", "Corner radius scale and roles. In Figma every radius also uses 60% corner smoothing.") +
    tokenRows("sh-radius/", (t) => `<div class="vn-radius-sample" style="border-radius:var(${t.css})"></div>`);
  const pageStroke = () => head("Stroke", "Border widths.") +
    tokenRows("sh-stroke/", (t) => `<div class="vn-stroke-sample" style="border-top-width:var(${t.css})"></div>`);
  const pageOpacity = () => head("Opacity", "Layer opacities: hidden to full.") +
    `<div class="vn-checker" style="padding:var(--sh-space-16);border-radius:var(--sh-radius-card)">` +
    tokenRows("sh-opacity/", (t) => `<div class="vn-opacity-sample" style="opacity:var(${t.css})"></div>`) + `</div>`;

  function pageShadows() {
    const names = [...new Set(tokensOf("sh-shadow/").map(([k]) => k.split("/")[1]))];
    const rows = names.map((n) => {
      const v = (p) => `var(--sh-shadow-${n}-${p})`;
      const color = state.tokens[`sh-shadow/${n}/color`];
      return `<div class="vn-row"><div class="vn-row__meta"><span class="sh-title-sm">${esc(n)}</span>
        <span class="vn-code sh-support-meta">--sh-shadow-${esc(n)}-{x,y,blur,spread,color}</span>
        <span class="sh-body-sm vn-muted">${esc(color ? purpose(color) : "")}</span></div>
        <div class="vn-shadow-stage"><div class="vn-shadow-sample" style="box-shadow:${v("x")} ${v("y")} ${v("blur")} ${v("spread")} ${v("color")}"></div></div></div>`;
    }).join("");
    return head("Shadows", "Each shadow is five tokens: x, y, blur, spread and colour.") + `<div class="vn-rows">${rows}</div>`;
  }

  function pageIcons() {
    const kinds = Object.keys(state.catalog.icons);
    if (!kinds.includes(ui.iconKind)) ui.iconKind = kinds[0];
    const tabs = kinds.map((k) => `<button type="button" class="vn-tab sh-button-sm" role="tab" aria-selected="${k === ui.iconKind}" data-icon-kind="${esc(k)}">${esc(k)} · ${state.catalog.icons[k].length}</button>`).join("");
    return head("Icons", "The sh-icon pack (Hugeicons Rounded). Line and filled icons take the text colour; pictograms, brand marks and tags keep their own.") +
      `<div class="vn-tools"><input class="vn-search sh-body-md" type="search" placeholder="Search icons" aria-label="Search icons" value="${esc(ui.iconQuery)}" data-icon-search></div>
       <div class="vn-tabs" role="tablist">${tabs}</div><div class="vn-icons" data-icon-grid></div>`;
  }
  function renderIconGrid() {
    const grid = document.querySelector("[data-icon-grid]");
    if (!grid) return;
    const mono = ui.iconKind === "line" || ui.iconKind === "filled";
    const q = ui.iconQuery.trim().toLowerCase();
    grid.innerHTML = state.catalog.icons[ui.iconKind].filter((f) => !q || f.includes(q)).map((f) => {
      const path = `${ui.iconKind}/${f}`;
      const art = mono && f.endsWith(".svg") ? icon(path, 24) : `<img src="${FOUNDATION}icons/${esc(path)}" alt="">`;
      return `<div class="vn-icon" title="${esc(path)}">${art}<span class="vn-code sh-support-meta">${esc(f.replace(/\.(svg|png)$/, ""))}</span></div>`;
    }).join("") || `<p class="vn-muted sh-body-md">No icon matches.</p>`;
  }

  // ---------- catalog: components ----------

  const statusBadge = (c) => `<span class="vn-status vn-status--${esc(c.status)} sh-support-label" title="${esc(STATUS[c.status].hint)}${c.statusSet ? "" : " (default)"}">${esc(STATUS[c.status].label)}</span>`;

  function platformPills(c) {
    return ["Web", "Compose", "SwiftUI"].map((p) => {
      const on = c.platforms.includes(p);
      return `<span class="vn-pill sh-support-meta${on ? " vn-pill--on" : ""}">${on ? icon("filled/check.svg", 12) : ""}${p}</span>`;
    }).join("");
  }

  function pageComponents() {
    return head("Components", "Every sh-* component in the foundation, grouped as in Figma. The badge is where each one is: Draft → Proposed → In refinement → Core.") +
      `<div class="vn-tools">
        <input class="vn-search sh-body-md" type="search" placeholder="Search name, purpose or keyword" aria-label="Search components" value="${esc(ui.compQuery)}" data-comp-search>
        <label class="vn-check sh-body-md"><input type="checkbox" data-comp-web${ui.compWebOnly ? " checked" : ""}> Has web code</label>
      </div><div class="vn-tabs" role="tablist" aria-label="Status" data-status-tabs></div><div data-comp-list></div>`;
  }
  function renderComponentList() {
    const box = document.querySelector("[data-comp-list]");
    if (!box) return;
    const q = ui.compQuery.trim().toLowerCase();
    const match = (c) => (!ui.compWebOnly || c.demo) && (!q || [c.name, c.purpose, ...c.keywords].join(" ").toLowerCase().includes(q));
    const hit = (c) => match(c) && (ui.compStatus === "all" || c.status === ui.compStatus);
    const tabs = document.querySelector("[data-status-tabs]");
    const counted = state.catalog.components.filter(match);
    tabs.innerHTML = [["all", "All"], ...Object.entries(STATUS).map(([id, s]) => [id, s.label])].map(([id, label]) =>
      `<button type="button" class="vn-tab sh-button-sm" role="tab" aria-selected="${ui.compStatus === id}" data-status="${id}">${label} · ${id === "all" ? counted.length : counted.filter((c) => c.status === id).length}</button>`).join("");
    const groups = {};
    for (const c of state.catalog.components.filter(hit)) (groups[c.group] ||= []).push(c);
    const order = Object.keys(groups).sort((a, b) => (a === "Core" ? -1 : b === "Core" ? 1 : a.localeCompare(b)));
    box.innerHTML = order.map((g) => `<section class="vn-section"><h2 class="sh-title-lg">${esc(g)} · ${groups[g].length}</h2><div class="vn-grid">${
      groups[g].map((c) => `<a class="vn-card vn-comp" href="#/catalog/components/${esc(c.name)}">
        <div class="vn-comp__top"><span class="sh-title-md">${esc(c.name)}</span>${statusBadge(c)}</div>
        <p class="sh-body-sm">${esc(c.purpose || "No purpose line in the blueprint yet.")}</p>
        <div class="vn-pills">${platformPills(c)}</div></a>`).join("")}</div></section>`).join("") ||
      `<p class="vn-muted sh-body-md">No component matches.</p>`;
  }

  function pageComponent(name) {
    const c = state.catalog.components.find((x) => x.name === name);
    if (!c) return head("Not found", `No component named <code>${esc(name)}</code>. <a href="#/catalog/components">Back to components</a>.`);
    const links = [
      c.figma && `<a class="vn-link sh-button-md" href="${esc(c.figma)}" target="_blank" rel="noopener">${icon("line/link.svg")}Open in Figma</a>`,
      `<a class="vn-link sh-button-md" href="${GITLAB}${esc(c.blueprint)}" target="_blank" rel="noopener">${icon("line/book.svg")}Blueprint on GitLab</a>`,
      c.demo && `<a class="vn-link sh-button-md" href="${FOUNDATION}${esc(c.demo)}" target="_blank" rel="noopener">${icon("line/eye.svg")}Web demo, full page</a>`,
    ].filter(Boolean).join("");
    const demo = c.demo
      ? `<iframe class="vn-frame" title="${esc(c.name)} web demo" src="${FOUNDATION}${esc(c.demo)}" data-autosize></iframe>`
      : `<div class="vn-empty"><span class="sh-title-md">No web code yet</span><span class="sh-body-md">The blueprint is ready; the web build of ${esc(c.name)} hasn't been written. Platforms with code: ${esc(c.platforms.join(", ") || "none")}.</span></div>`;
    return `<p class="sh-support-label vn-muted"><a href="#/catalog/components">Components</a> / ${esc(c.group)}</p>` +
      head(c.name, esc(c.purpose)) +
      `<div class="vn-pills">${statusBadge(c)}${platformPills(c)}<span class="vn-pill sh-support-meta">${c.variants} variants</span></div>
       <p class="sh-body-sm vn-muted" style="margin-top:var(--sh-space-8)">${esc(STATUS[c.status].hint)}${c.statusSet ? "" : " · default for its Figma page, not set in components/status.json"}${c.owner ? ` · owner ${esc(c.owner)}` : ""}${c.note ? ` · ${esc(c.note)}` : ""}${c.mr ? ` · <a href="${esc(c.mr)}" target="_blank" rel="noopener">merge request</a>` : ""}</p>
       ${c.keywords.length ? `<div class="vn-pills" style="margin-top:var(--sh-space-8)">${c.keywords.map((k) => `<span class="vn-pill sh-support-meta">${esc(k)}</span>`).join("")}</div>` : ""}
       <div class="vn-links">${links}</div>
       <section class="vn-section"><h2 class="sh-title-lg">Live web build</h2>${demo}</section>`;
  }

  // ---------- stories ----------

  // A screen is assembled from blocks: either a DNA component picked out of its web/ demo page
  // ({from, pick, count}), or a little layout HTML using DNA classes ({html}). Picked markup has its
  // relative URLs made absolute, and the demo page's stylesheets come along.
  async function buildScreen(screen) {
    const links = new Set();
    const parts = [];
    for (const block of screen.blocks) {
      if (block.html) { parts.push(block.html); continue; }
      const src = new URL(FOUNDATION + block.from, location.href);
      const doc = new DOMParser().parseFromString(await (await fetch(src)).text(), "text/html");
      doc.querySelectorAll('link[rel="stylesheet"]').forEach((l) => links.add(new URL(l.getAttribute("href"), src).href));
      const nodes = [...doc.querySelectorAll(block.pick)].slice(block.skip || 0, (block.skip || 0) + (block.count || 1));
      if (!nodes.length) { parts.push(`<p class="sh-body-sm" style="color:var(--sh-text-secondary)">Missing: ${esc(block.pick)} in ${esc(block.from)}</p>`); continue; }
      for (const n of nodes) {
        n.querySelectorAll("[style]").forEach((el) => el.setAttribute("style", el.getAttribute("style").replace(/url\((['"]?)([^)'"]+)\1\)/g, (m, q, u) => /^(data:|https?:|#)/.test(u) ? m : `url(${new URL(u, src).href})`)));
        n.querySelectorAll("[src]").forEach((el) => { const u = el.getAttribute("src"); if (!/^(data:|https?:)/.test(u)) el.setAttribute("src", new URL(u, src).href); });
        parts.push(n.outerHTML);
      }
    }
    return `<!doctype html><html lang="en" data-theme="${effectiveTheme()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
      ${[...links].map((h) => `<link rel="stylesheet" href="${esc(h)}">`).join("")}
      <style>body{margin:0;background:var(--sh-background-default);color:var(--sh-text-primary);font-family:var(--sh-typo-font-family-primary)}
      main{display:flex;flex-direction:column;gap:var(--sh-space-gap-list);padding:var(--sh-space-16) var(--sh-space-page-margin) var(--sh-space-40)}</style>
      </head><body><main>${parts.join("")}</main></body></html>`;
  }

  function pageStory(id) {
    const s = state.stories.find((x) => x.id === id);
    if (!s) return head("Not found", `No story ${esc(id)} in stories.json.`);
    const screens = s.screens.map((sc, i) => `<figure class="vn-screen" style="margin:0">
      <div class="vn-phone"><iframe title="${esc(sc.name)}" data-screen="${i}"></iframe></div>
      <figcaption><span class="sh-title-sm">${esc(sc.name)}</span>${sc.note ? `<br><span class="sh-body-sm vn-muted">${esc(sc.note)}</span>` : ""}</figcaption></figure>`).join("");
    return `<p class="sh-support-label vn-muted">Story · ${esc(s.status || "")}</p>` + head(`${s.id} · ${s.title}`, esc(s.summary)) +
      (s.decisions?.length ? `<div class="vn-pills">${s.decisions.map((d) => `<span class="vn-pill sh-support-meta">${esc(d)}</span>`).join("")}</div>` : "") +
      `<section class="vn-section"><div class="vn-screens">${screens}</div></section>`;
  }
  async function fillStoryScreens(id) {
    const s = state.stories.find((x) => x.id === id);
    if (!s) return;
    await Promise.all(s.screens.map(async (sc, i) => {
      const frame = document.querySelector(`iframe[data-screen="${i}"]`);
      if (frame) frame.srcdoc = await buildScreen(sc);
    }));
  }

  // ---------- router ----------

  function autosize(frame) {
    const fit = () => { try { frame.style.height = frame.contentDocument.documentElement.scrollHeight + "px"; } catch { /* cross-origin */ } };
    frame.addEventListener("load", () => {
      themeFrame(frame); fit();
      try { new ResizeObserver(fit).observe(frame.contentDocument.body); } catch { /* old browser */ }
    });
  }

  function route() {
    const path = (location.hash.replace(/^#\/?/, "") || "catalog").replace(/\/$/, "");
    const [section, page, item] = path.split("/");
    renderNav(path);
    $nav.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest", inline: "center" });
    let html;
    if (section === "stories") html = pageStory(page);
    else if (!page) html = pageOverview();
    else if (page === "components") html = item ? pageComponent(decodeURIComponent(item)) : pageComponents();
    else html = ({ colours: pageColours, gradients: pageGradients, typography: pageTypography, spacing: pageSpacing, radius: pageRadius,
                   stroke: pageStroke, opacity: pageOpacity, shadows: pageShadows, icons: pageIcons }[page] || pageOverview)();
    $main.innerHTML = html;
    $main.scrollTop = 0; window.scrollTo(0, 0);
    const h1 = (document.querySelector(".vn-head h1") || {}).textContent;
    document.title = h1 && h1 !== "Shaadi Vision" ? `${h1} · Shaadi Vision` : "Shaadi Vision";

    if (page === "typography") document.fonts.ready.then(fillTypeMetrics);
    if (page === "icons") renderIconGrid();
    if (page === "components" && !item) renderComponentList();
    if (section === "stories") fillStoryScreens(page);
    document.querySelectorAll("iframe").forEach((f) => f.addEventListener("load", () => themeFrame(f)));
    document.querySelectorAll("iframe[data-autosize]").forEach(autosize);
  }

  $main.addEventListener("input", (e) => {
    if (e.target.matches("[data-comp-search]")) { ui.compQuery = e.target.value; renderComponentList(); }
    if (e.target.matches("[data-icon-search]")) { ui.iconQuery = e.target.value; renderIconGrid(); }
  });
  $main.addEventListener("change", (e) => {
    if (e.target.matches("[data-comp-web]")) { ui.compWebOnly = e.target.checked; renderComponentList(); }
  });
  $main.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go-status]");
    if (go) ui.compStatus = go.dataset.goStatus;
    const st = e.target.closest("[data-status]");
    if (st) { ui.compStatus = st.dataset.status; renderComponentList(); return; }
    const tab = e.target.closest("[data-icon-kind]");
    if (tab) { ui.iconKind = tab.dataset.iconKind; document.querySelectorAll("[data-icon-kind]").forEach((t) => t.setAttribute("aria-selected", String(t === tab))); renderIconGrid(); }
  });

  async function start() {
    document.querySelectorAll("[data-icon]").forEach((el) => el.style.setProperty("--icon", `url(${iconUrl(el.dataset.icon)})`));
    applyTheme(currentTheme());
    try {
      const [tokens, catalog, stories, typoCss] = await Promise.all([
        loadJSON(FOUNDATION + "dist/json/tokens.json"),
        loadJSON(FOUNDATION + "dist/vision/catalog.json"),
        loadJSON("stories.json"),
        fetch(FOUNDATION + "dist/sh-typo-kit/developer/web/sh-typo.css").then((r) => r.text()),
      ]);
      Object.assign(state, { tokens, catalog, stories });
      state.typo = [...new Set([...typoCss.matchAll(/^\.(sh-[a-z0-9-]+)\s*\{/gm)].map((m) => m[1]))];
    } catch (err) {
      $main.innerHTML = head("Build the foundation first", `The app reads the foundation's built files and couldn't load them (${esc(err.message)}). Run <code>python3 shaadi-dna-foundation/tools/build.py</code>, then serve the repo root.`);
      return;
    }
    addEventListener("hashchange", route);
    route();
  }
  start();
})();
