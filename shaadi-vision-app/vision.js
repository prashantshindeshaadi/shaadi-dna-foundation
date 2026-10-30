/*
 * Shaadi Vision App — Home (foundation), Catalog (Core components), Components (everything else), Stories.
 *
 * Data:  ../shaadi-dna-foundation/dist/json/tokens.json   (tools/build.py)
 *        ../shaadi-dna-foundation/dist/vision/catalog.json (tools/vision.py, run by build.py)
 *        ../shaadi-dna-foundation/dist/sh-typo-kit/developer/web/sh-typo.css (text style names)
 *        stories.json                                      (this folder, one entry per Jira story)
 * Routes: #/home · #/catalog[/<sh-name>] · #/components[/<sh-name>] · #/stories[/<JIRA-ID>]
 */
(() => {
  "use strict";

  const FOUNDATION = "../shaadi-dna-foundation/";
  const GITLAB = "https://gitlab.com/shaadi/shaadi-app/ai/vision/-/blob/main/shaadi-dna-foundation/";
  const THEME_KEY = "vn-theme";

  const TABS = [
    { id: "home", label: "Home" },
    { id: "catalog", label: "Catalog" },
    { id: "components", label: "Components" },
    { id: "stories", label: "Stories" },
  ];
  const FOUNDATION_SECTIONS = [
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
  // Component life (FOUNDATION.md §8), in order. phase picks the badge colour (§4.2 soft pairs);
  // the word itself is the non-colour cue.
  const STATUS = {
    "draft": { label: "Draft", phase: "design", hint: "Being designed in Figma" },
    "synced": { label: "Synced", phase: "repo", hint: "Pulled from Figma into the repo: blueprint and web code" },
    "handed-off": { label: "Handed to dev", phase: "repo", hint: "Sent to the developers' repo as a merge request" },
    "in-development": { label: "In development", phase: "dev", hint: "A developer is building the real component" },
    "in-review": { label: "In review", phase: "dev", hint: "The designer is checking the developer's version" },
    "core": { label: "Final", phase: "final", hint: "Released in the developers' library, Figma aligned" },
  };

  const state = { tokens: {}, catalog: { components: [], icons: {} }, stories: [], typo: [] };
  const ui = { query: "", webOnly: false, status: "all", iconKind: "line", iconQuery: "" };

  const $main = document.getElementById("main");
  const $tabs = document.getElementById("tabs");
  const $bar = document.getElementById("bar");

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
  const icon = (path, size = 16, cls = "") => `<span class="sh-icon sh-icon--${size} ${cls}" style="--icon:url(${iconUrl(path)})" aria-hidden="true"></span>`;
  const isCore = (c) => c.group === "Core";
  const inTab = (tab) => (tab === "catalog" ? isCore : (c) => !isCore(c));
  const card = (inner, type = "elevated") => `<section class="sh-card sh-card--${type}"><div class="sh-card__content">${inner}</div></section>`;
  const statusBadge = (c) => `<span class="vn-status vn-status--${STATUS[c.status].phase} sh-support-label" title="${esc(STATUS[c.status].hint)}${c.statusSet ? "" : " (default)"}">${esc(STATUS[c.status].label)}</span>`;
  const chip = (label, attrs, pressed) => `<button class="sh-chip" type="button" aria-pressed="${pressed}" ${attrs}><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${label}</span></span></button>`;
  const button = (href, label, iconPath, type = "secondary") => `<a class="sh-button sh-button--${type} sh-button--md" href="${esc(href)}" target="_blank" rel="noopener">${icon(iconPath, 16, "sh-button__icon")}<span class="sh-button__text"><span class="sh-button__label sh-button-md">${esc(label)}</span></span></a>`;
  const head = (title, text) => `<div class="vn-head"><h1 class="sh-heading-lg">${esc(title)}</h1>${text ? `<p class="sh-body-md">${text}</p>` : ""}</div>`;

  async function loadJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.json();
  }

  // ---------- theme ----------

  function currentTheme() { try { return localStorage.getItem(THEME_KEY) || "system"; } catch { return "system"; } }
  function effectiveTheme() {
    const t = currentTheme();
    return t !== "system" ? t : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function themeFrame(frame) { try { frame.contentDocument.documentElement.dataset.theme = effectiveTheme(); } catch { /* not loaded */ } }
  function applyTheme(choice) {
    try { localStorage.setItem(THEME_KEY, choice); } catch { /* private window */ }
    const root = document.documentElement;
    if (choice === "system") root.removeAttribute("data-theme"); else root.dataset.theme = choice;
    document.querySelectorAll("[data-theme-choice]").forEach((b) => {
      const on = b.dataset.themeChoice === choice;
      b.setAttribute("aria-checked", String(on));
      b.setAttribute("aria-selected", String(on));
      b.querySelector(".sh-tab-item__label").className = `sh-tab-item__label ${on ? "sh-button-md" : "sh-body-md"}`;
    });
    document.querySelectorAll("iframe").forEach(themeFrame);
  }
  document.querySelectorAll("[data-theme-choice]").forEach((b) => b.addEventListener("click", () => applyTheme(b.dataset.themeChoice)));
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme(currentTheme()));

  // ---------- tabs ----------

  function renderTabs(tab) {
    $tabs.innerHTML = TABS.map((t) => {
      const on = t.id === tab;
      return `<a class="sh-tab-item" href="#/${t.id}" role="tab" aria-selected="${on}"${on ? ' aria-current="page"' : ""}><span class="sh-tab-item__label sh-title-md">${t.label}</span></a>`;
    }).join("");
  }

  // ---------- Home: the foundation ----------

  function pageHome() {
    const comps = state.catalog.components;
    const nIcons = Object.values(state.catalog.icons).reduce((n, list) => n + list.length, 0);
    const stat = (n, label, href) => card(`<a class="vn-comp__name sh-display vn-stat" href="${href}">${n}</a><span class="sh-body-md vn-muted">${label}</span>`);
    const sections = FOUNDATION_SECTIONS.map((s) => `<section class="vn-section" id="f-${s.id}"><h2 class="sh-heading-md">${s.title}</h2>${FOUNDATION_PAGES[s.id]()}</section>`).join("");
    return head("Shaadi DNA Foundation", "Every token, text style and icon in the Shaadi design system, drawn live from the repo. Change it in Figma, sync, and it changes here.") +
      `<div class="vn-stats">
        ${stat(Object.keys(state.tokens).length, "Tokens", "#/home")}
        ${stat(comps.filter(isCore).length, "Core components", "#/catalog")}
        ${stat(comps.filter((c) => !isCore(c)).length, "Other components", "#/components")}
        ${stat(comps.filter((c) => c.demo).length, "With web code", "#/catalog")}
        ${stat(nIcons, "Icons", "#/home")}
        ${stat(state.stories.length, "Stories", "#/stories")}
      </div>
      <section class="vn-section"><h2 class="sh-heading-md">Component status</h2><p class="sh-body-md">${Object.values(STATUS).map((s) => s.label).join(" → ")}</p>
        <div class="vn-stats">${Object.entries(STATUS).map(([id, s]) => card(
          `<span class="sh-display vn-stat">${comps.filter((c) => c.status === id).length}</span><span class="vn-status vn-status--${s.phase} sh-support-label">${s.label}</span><span class="sh-body-sm vn-muted">${s.hint}</span>`)).join("")}</div>
      </section>
      <nav class="vn-sub vn-glass" aria-label="Foundation sections" id="sub">${FOUNDATION_SECTIONS.map((s, i) => chip(s.title, `data-jump="${s.id}"`, i === 0)).join("")}</nav>
      ${sections}`;
  }

  function secColours() {
    const groups = {};
    for (const [key, t] of tokensOf("sh-color-common/", "color")) (groups[key.split("/")[1]] ||= []).push([key, t]);
    groups.translucent = tokensOf("sh-translucent/", "color");
    const swatch = ([key, t]) => {
      const v = t.values || {};
      const half = (mode) => `<span class="vn-half vn-checker"${mode === "Dark" ? ' data-theme="dark"' : ""}><span class="vn-paint" style="background:${esc(v[mode])}"></span><span class="vn-chip-label sh-support-micro">${mode}</span></span>`;
      const swatchChip = "Value" in v
        ? `<div class="vn-swatch__chip vn-swatch__chip--one"><span class="vn-half vn-checker"><span class="vn-paint" style="background:var(${t.css})"></span></span></div>`
        : `<div class="vn-swatch__chip">${half("Light")}${half("Dark")}</div>`;
      return `<section class="sh-card vn-swatch">${swatchChip}<div class="vn-swatch__body">
        <span class="sh-title-sm">${esc(key.split("/").slice(1).join("/"))}</span>
        <span class="vn-code sh-support-meta">var(${esc(t.css)})</span>
        <span class="sh-support-meta vn-muted">${esc(valueText(t))}</span>
        <span class="sh-body-sm vn-muted">${esc(purpose(t))}</span></div></section>`;
    };
    return Object.entries(groups).map(([g, list]) => `<h3 class="sh-title-lg" style="margin:var(--sh-space-24) 0 var(--sh-space-12)">${esc(g)}</h3><div class="vn-grid">${list.map(swatch).join("")}</div>`).join("");
  }

  function secGradients() {
    return `<div class="vn-grid">${tokensOf("sh-gradient/").map(([key, t]) => `<section class="sh-card vn-swatch">
      <div class="vn-swatch__chip vn-swatch__chip--one" style="background:var(${t.css})"></div>
      <div class="vn-swatch__body"><span class="sh-title-sm">${esc(key.replace("sh-gradient/", ""))}</span>
      <span class="vn-code sh-support-meta">var(${esc(t.css)})</span><span class="sh-body-sm vn-muted">${esc(purpose(t))}</span></div></section>`).join("")}</div>`;
  }

  function secTypography() {
    return `<div class="vn-rows">${state.typo.map((cls) => `<div class="vn-row"><div class="vn-row__meta"><span class="sh-title-sm">.${esc(cls)}</span><span class="vn-code sh-support-meta" data-type-metrics></span></div>
      <div class="vn-type-sample ${esc(cls)}">Find someone who gets you</div></div>`).join("")}</div>`;
  }
  function fillTypeMetrics() {
    document.querySelectorAll("[data-type-metrics]").forEach((el) => {
      const cs = getComputedStyle(el.closest(".vn-row").querySelector(".vn-type-sample"));
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
  function secShadows() {
    const names = [...new Set(tokensOf("sh-shadow/").map(([k]) => k.split("/")[1]))];
    return `<div class="vn-rows">${names.map((n) => {
      const v = (p) => `var(--sh-shadow-${n}-${p})`;
      const color = state.tokens[`sh-shadow/${n}/color`];
      return `<div class="vn-row"><div class="vn-row__meta"><span class="sh-title-sm">${esc(n)}</span>
        <span class="vn-code sh-support-meta">--sh-shadow-${esc(n)}-{x,y,blur,spread,color}</span><span class="sh-body-sm vn-muted">${esc(color ? purpose(color) : "")}</span></div>
        <div class="vn-shadow-stage"><div class="vn-shadow-sample" style="box-shadow:${v("x")} ${v("y")} ${v("blur")} ${v("spread")} ${v("color")}"></div></div></div>`;
    }).join("")}</div>`;
  }
  function secIcons() {
    const kinds = Object.keys(state.catalog.icons);
    if (!kinds.includes(ui.iconKind)) ui.iconKind = kinds[0];
    return `<div class="vn-tools">${search("Search icons", ui.iconQuery, "data-icon-search")}</div>
      <div class="vn-chips" role="group" aria-label="Icon type">${kinds.map((k) => chip(`${esc(k)} · ${state.catalog.icons[k].length}`, `data-icon-kind="${esc(k)}"`, k === ui.iconKind)).join("")}</div>
      <div class="vn-icons" data-icon-grid></div>`;
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

  const FOUNDATION_PAGES = {
    colours: secColours,
    gradients: secGradients,
    typography: secTypography,
    spacing: () => tokenRows("sh-space/", (t) => `<div class="vn-bar-sample" style="width:var(${t.css})"></div>`),
    radius: () => tokenRows("sh-radius/", (t) => `<div class="vn-radius-sample" style="border-radius:var(${t.css})"></div>`),
    stroke: () => tokenRows("sh-stroke/", (t) => `<div class="vn-stroke-sample" style="border-top-width:var(${t.css})"></div>`),
    opacity: () => `<div class="vn-checker" style="padding:var(--sh-space-16);border-radius:var(--sh-radius-card)">${tokenRows("sh-opacity/", (t) => `<div class="vn-opacity-sample" style="opacity:var(${t.css})"></div>`)}</div>`,
    shadows: secShadows,
    icons: secIcons,
  };

  // ---------- Catalog / Components ----------

  function search(placeholder, value, attr) {
    return `<label class="sh-search">${icon("line/search.svg", 16, "sh-search__icon")}
      <input class="sh-search__field sh-body-md" type="search" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" value="${esc(value)}" ${attr}>
      <button class="sh-search__clear" type="button" aria-label="Clear search" data-clear>${icon("line/close.svg", 16, "sh-search__icon")}</button></label>`;
  }
  function platformPills(c) {
    return ["Web", "Compose", "SwiftUI"].map((p) => {
      const on = c.platforms.includes(p);
      return `<span class="vn-pill sh-support-meta${on ? " vn-pill--on" : ""}">${on ? icon("filled/check.svg", 12) : ""}${p}</span>`;
    }).join("");
  }

  function pageList(tab) {
    const title = tab === "catalog" ? "Catalog" : "Components";
    const text = tab === "catalog"
      ? "The Core components: the building blocks every Shaadi screen is made of."
      : "Feature components from the full profile view, profile card, account and utility pages, built from the Core ones.";
    return head(title, text) +
      `<div class="vn-tools">${search("Search name, purpose or keyword", ui.query, "data-comp-search")}
        ${chip("Has web code", "data-web-only", ui.webOnly)}</div>
       <div class="vn-chips" role="group" aria-label="Status" data-status-chips></div>
       <div data-comp-list data-tab="${tab}"></div>`;
  }
  function renderComponentList() {
    const box = document.querySelector("[data-comp-list]");
    if (!box) return;
    const tab = box.dataset.tab;
    const q = ui.query.trim().toLowerCase();
    const match = (c) => inTab(tab)(c) && (!ui.webOnly || c.demo) && (!q || [c.name, c.purpose, ...c.keywords].join(" ").toLowerCase().includes(q));
    const counted = state.catalog.components.filter(match);
    document.querySelector("[data-status-chips]").innerHTML = [["all", "All"], ...Object.entries(STATUS).map(([id, s]) => [id, s.label])]
      .map(([id, label]) => chip(`${label} · ${id === "all" ? counted.length : counted.filter((c) => c.status === id).length}`, `data-status="${id}"`, ui.status === id)).join("");
    const shown = counted.filter((c) => ui.status === "all" || c.status === ui.status);
    const groups = {};
    for (const c of shown) (groups[c.group.replace(/ \(migration, not yet core\)/, "")] ||= []).push(c);
    box.innerHTML = Object.keys(groups).sort().map((g) => `<section class="vn-section"><h2 class="sh-title-lg">${esc(g)} · ${groups[g].length}</h2><div class="vn-grid">${
      groups[g].map((c) => card(`<div class="vn-comp__top"><a class="vn-comp__name sh-title-md" href="#/${tab}/${esc(c.name)}">${esc(c.name)}</a>${statusBadge(c)}</div>
        <p class="sh-body-sm vn-clamp">${esc(c.purpose || "No purpose line in the blueprint yet.")}</p>
        <div class="vn-pills">${platformPills(c)}</div>`)).join("")}</div></section>`).join("") ||
      `<p class="vn-muted sh-body-md">No component matches.</p>`;
  }

  function pageComponent(tab, name) {
    const c = state.catalog.components.find((x) => x.name === name);
    const back = `<a class="vn-crumb sh-support-label" href="#/${tab}">← ${tab === "catalog" ? "Catalog" : "Components"}</a>`;
    if (!c) return back + head("Not found", `No component named ${esc(name)}.`);
    const links = [
      c.figma && button(c.figma, "Open in Figma", "line/link.svg"),
      button(GITLAB + c.blueprint, "Blueprint on GitLab", "line/book.svg"),
      c.demo && button(FOUNDATION + c.demo, "Web demo, full page", "line/eye.svg"),
    ].filter(Boolean).join("");
    const extra = [c.statusSet ? "" : "default for its Figma page", c.owner && `owner ${esc(c.owner)}`, c.note && esc(c.note),
      c.mr && `<a href="${esc(c.mr)}" target="_blank" rel="noopener">merge request</a>`].filter(Boolean).join(" · ");
    const demo = c.demo
      ? `<iframe class="vn-frame" title="${esc(c.name)} web demo" src="${FOUNDATION}${esc(c.demo)}" data-autosize></iframe>`
      : `<div class="vn-empty"><span class="sh-title-md">No web code yet</span><span class="sh-body-md">The blueprint is ready; the web build of ${esc(c.name)} hasn't been written. Platforms with code: ${esc(c.platforms.join(", ") || "none")}.</span></div>`;
    return back + head(c.name, esc(c.purpose)) +
      `<div class="vn-pills">${statusBadge(c)}${platformPills(c)}<span class="vn-pill sh-support-meta">${c.variants} variants</span></div>
       <p class="sh-body-sm vn-muted" style="margin-top:var(--sh-space-8)">${esc(STATUS[c.status].hint)}${extra ? ` · ${extra}` : ""}</p>
       ${c.keywords.length ? `<div class="vn-pills" style="margin-top:var(--sh-space-8)">${c.keywords.map((k) => `<span class="vn-pill sh-support-meta">${esc(k)}</span>`).join("")}</div>` : ""}
       <div class="vn-links">${links}</div>
       <section class="vn-section"><h2 class="sh-heading-md">Where it is</h2>${stepper(c)}</section>
       <section class="vn-section"><h2 class="sh-heading-md">Live web build</h2>${demo}</section>`;
  }

  // The stage as a sh-stepper: stages before this one Done, this one Current (Done when it's Final), the rest Pending.
  function stepper(c) {
    const ids = Object.keys(STATUS);
    const at = ids.indexOf(c.status);
    return `<ol class="sh-stepper-list vn-stepper">${ids.map((id, i) => {
      const done = i < at || (i === at && id === "core");
      const kind = done ? "" : i === at ? " sh-stepper--current" : " sh-stepper--pending";
      const marker = done ? `<span class="sh-stepper__check sh-icon sh-icon--12" style="--icon:url(${iconUrl("filled/check.svg")})"></span>` : `<span class="sh-stepper__dot"></span>`;
      const word = done ? "Done" : i === at ? "Now" : "Next";
      return `<li class="sh-stepper${kind}"${i === at ? ' aria-current="step"' : ""}>
        <span class="sh-stepper__rail" aria-hidden="true"><span class="sh-stepper__marker">${marker}</span>${i < ids.length - 1 ? '<span class="sh-stepper__connector"></span>' : ""}</span>
        <span class="sh-stepper__content"><span class="sh-stepper__title sh-title-sm">${STATUS[id].label}<span class="vn-sr"> (${word})</span></span>
        <span class="sh-stepper__subtitle sh-body-sm">${STATUS[id].hint}</span></span></li>`;
    }).join("")}</ol>`;
  }

  // ---------- Stories ----------

  const storyComponents = (s) => [...new Set(s.screens.flatMap((sc) => sc.blocks.filter((b) => b.from).map((b) => b.from.split("/").pop().replace(/\.html$/, ""))))];

  function pageStories() {
    return head("Stories", "Every Jira story with its screens, put together live from the components. Open one to see its details.") +
      `<div class="vn-grid">${state.stories.map((s) => card(
        `<div class="vn-comp__top"><span class="vn-pill vn-pill--on sh-support-label">${esc(s.id)}</span><span class="vn-pill sh-support-label">${esc(s.status || "")}</span></div>
         <a class="vn-comp__name sh-heading-sm" href="#/stories/${esc(s.id)}">${esc(s.title)}</a>
         <p class="sh-body-sm vn-clamp">${esc(s.summary)}</p>
         <span class="sh-support-meta vn-muted">${s.screens.length} screens · ${storyComponents(s).length} components</span>`)).join("")}</div>`;
  }

  // A screen is assembled from blocks: a DNA component picked out of its web/ demo page ({from, pick, count, skip})
  // or a little layout HTML using DNA classes ({html}). Picked markup has its relative URLs made absolute, and the
  // demo page's stylesheets come along.
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
    const back = `<a class="vn-crumb sh-support-label" href="#/stories">← Stories</a>`;
    if (!s) return back + head("Not found", `No story ${esc(id)} in stories.json.`);
    const used = storyComponents(s);
    const link = (name) => {
      const c = state.catalog.components.find((x) => x.name === name);
      return c ? `<a class="sh-chip" href="#/${isCore(c) ? "catalog" : "components"}/${esc(name)}"><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${esc(name)}</span></span></a>` : "";
    };
    const fact = (n, label) => `<div class="vn-fact"><span class="sh-heading-md">${n}</span><span class="sh-support-label vn-muted">${label}</span></div>`;
    return back +
      `<header class="vn-story-head">
        <div class="vn-story-head__tags"><span class="vn-pill vn-pill--on sh-support-label">${esc(s.id)}</span><span class="vn-pill sh-support-label">${esc(s.status || "")}</span></div>
        <h1 class="sh-heading-lg">${esc(s.title)}</h1>
        <p class="sh-body-md">${esc(s.summary)}</p>
        <div class="vn-facts">${fact(s.screens.length, "Screens")}${fact(used.length, "Components")}${fact((s.decisions || []).length, "Decisions")}</div>
      </header>
      ${s.decisions?.length ? `<section class="vn-section"><h2 class="sh-heading-md">Decisions</h2><div class="vn-chips">${s.decisions.map((d) => `<span class="sh-chip sh-chip--info"><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${esc(d)}</span></span></span>`).join("")}</div></section>` : ""}
      <section class="vn-section"><h2 class="sh-heading-md">Screens</h2><div class="vn-screens">${s.screens.map((sc, i) => `<figure class="vn-screen">
        <div class="vn-phone"><iframe title="${esc(sc.name)}" data-screen="${i}"></iframe></div>
        <figcaption><span class="sh-title-sm">${esc(sc.name)}</span>${sc.note ? `<br><span class="sh-body-sm vn-muted">${esc(sc.note)}</span>` : ""}</figcaption></figure>`).join("")}</div></section>
      <section class="vn-section"><h2 class="sh-heading-md">Components used</h2><div class="vn-chips">${used.map(link).join("")}</div></section>`;
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
    frame.addEventListener("load", () => { themeFrame(frame); fit(); try { new ResizeObserver(fit).observe(frame.contentDocument.body); } catch { /* old browser */ } });
  }

  // Sticky offsets: the chip strip sits under the bar; anchors scroll clear of both.
  function measure() {
    document.documentElement.style.setProperty("--vn-bar-h", `${$bar.offsetHeight}px`);
    const sub = document.getElementById("sub");
    document.documentElement.style.setProperty("--vn-sub-h", `${sub ? sub.offsetHeight : 0}px`);
  }
  new ResizeObserver(measure).observe($bar);

  function route() {
    const [tab = "home", item] = (location.hash.replace(/^#\/?/, "") || "home").replace(/\/$/, "").split("/").map(decodeURIComponent);
    const known = TABS.some((t) => t.id === tab) ? tab : "home";
    renderTabs(known);
    let html;
    if (known === "home") html = pageHome();
    else if (known === "stories") html = item ? pageStory(item) : pageStories();
    else html = item ? pageComponent(known, item) : pageList(known);
    $main.innerHTML = html;
    window.scrollTo(0, 0);
    const h1 = $main.querySelector("h1")?.textContent;
    document.title = h1 && known !== "home" ? `${h1} · Shaadi DNA` : "Shaadi DNA";

    if (known === "home") { renderIconGrid(); document.fonts.ready.then(fillTypeMetrics); measure(); }
    if ((known === "catalog" || known === "components") && !item) renderComponentList();
    if (known === "stories" && item) fillStoryScreens(item);
    document.querySelectorAll("iframe").forEach((f) => f.addEventListener("load", () => themeFrame(f)));
    document.querySelectorAll("iframe[data-autosize]").forEach(autosize);
  }

  $main.addEventListener("input", (e) => {
    if (e.target.matches("[data-comp-search]")) { ui.query = e.target.value; renderComponentList(); }
    if (e.target.matches("[data-icon-search]")) { ui.iconQuery = e.target.value; renderIconGrid(); }
  });
  $main.addEventListener("click", (e) => {
    const t = (sel) => e.target.closest(sel);
    if (t("[data-clear]")) {
      const field = t("[data-clear]").closest(".sh-search").querySelector("input");
      field.value = ""; field.dispatchEvent(new Event("input", { bubbles: true })); field.focus();
    } else if (t("[data-web-only]")) {
      ui.webOnly = !ui.webOnly; t("[data-web-only]").setAttribute("aria-pressed", String(ui.webOnly)); renderComponentList();
    } else if (t("[data-status]")) {
      ui.status = t("[data-status]").dataset.status; renderComponentList();
    } else if (t("[data-icon-kind]")) {
      const b = t("[data-icon-kind]");
      ui.iconKind = b.dataset.iconKind;
      document.querySelectorAll("[data-icon-kind]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      renderIconGrid();
    } else if (t("[data-jump]")) {
      const b = t("[data-jump]");
      document.querySelectorAll("[data-jump]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      document.getElementById(`f-${b.dataset.jump}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  async function start() {
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
