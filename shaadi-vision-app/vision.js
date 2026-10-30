/*
 * Shaadi Vision App — a phone-sized Shaadi app built only from DNA components.
 *
 * Tabs (sh-navigation-bar): Home · Matches · Catalog · Components · Premium.
 *   Home, Matches, Premium  real screens from the Shaadi DNA Figma file: screens/<name>.html fragments
 *   Catalog                 the Core components, and the Foundation (tokens, type, icons)
 *   Components              every other component, and the Jira stories (stories.json)
 * Data: ../shaadi-dna-foundation/dist/json/tokens.json, dist/vision/catalog.json (tools/build.py), stories.json.
 * Routes: #/home · #/matches · #/premium · #/catalog[/foundation[/<section>]|/<sh-name>]
 *         #/components[/stories|/<sh-name>] · #/stories/<JIRA-ID>
 */
(() => {
  "use strict";

  const FOUNDATION = "../shaadi-dna-foundation/";
  const GITLAB = "https://gitlab.com/shaadi/shaadi-app/ai/vision/-/blob/main/shaadi-dna-foundation/";
  const THEME_KEY = "vn-theme";

  const TABS = [
    { id: "home", label: "Home", icon: "shaadi" },
    { id: "matches", label: "Matches", icon: "user-multiple" },
    { id: "catalog", label: "Catalog", icon: "book" },
    { id: "components", label: "Components", icon: "block" },
    { id: "premium", label: "Premium", icon: "premium" },
  ];
  const SCREENS = { home: "screens/home.html", matches: "screens/matches.html", premium: "screens/premium.html" };
  const FOUNDATION_SECTIONS = [
    { id: "colours", title: "Colours", icon: "paint-board", text: "Every colour token, Light and Dark" },
    { id: "gradients", title: "Gradients", icon: "magic-wand", text: "The sh-gradient styles" },
    { id: "typography", title: "Typography", icon: "type", text: "The Lexend-SH text styles" },
    { id: "spacing", title: "Spacing", icon: "expand", text: "Steps and semantic roles" },
    { id: "radius", title: "Radius", icon: "crop", text: "Corner radius scale and roles" },
    { id: "stroke", title: "Stroke", icon: "minus-sign", text: "Border widths" },
    { id: "opacity", title: "Opacity", icon: "eye", text: "Hidden to full" },
    { id: "shadows", title: "Shadows", icon: "light", text: "x, y, blur, spread and colour" },
    { id: "icons", title: "Icons", icon: "star", text: "The sh-icon pack" },
  ];
  // Component life (FOUNDATION.md §8), in order. phase picks the badge colour; the word is the non-colour cue.
  const STATUS = {
    "draft": { label: "Draft", phase: "design", hint: "Being designed in Figma" },
    "synced": { label: "Synced", phase: "repo", hint: "Pulled from Figma into the repo: blueprint and web code" },
    "handed-off": { label: "Handed to dev", phase: "repo", hint: "Sent to the developers' repo as a merge request" },
    "in-development": { label: "In development", phase: "dev", hint: "A developer is building the real component" },
    "in-review": { label: "In review", phase: "dev", hint: "The designer is checking the developer's version" },
    "core": { label: "Final", phase: "final", hint: "Released in the developers' library, Figma aligned" },
  };
  // An icon from the pack for every component, by the first word of its name that matches.
  const COMPONENT_ICONS = [
    ["astro", "astro"], ["you-and-her", "heart"], ["compatibility", "heart-handshake"], ["family", "family"], ["education", "education"],
    ["lifestyle", "fitness"], ["contact", "call"], ["request", "user-add"], ["album", "album"], ["photo-break", "image"],
    ["photo-upload", "upload"], ["photo", "gallery"], ["user-images", "gallery"], ["silhouette", "person"], ["placeholder", "person"],
    ["avatar-stack", "user-multiple"], ["avatar", "person"], ["profile-identity", "user-check"], ["profile-card", "user-square"],
    ["mini-card", "user-square"], ["info-detail", "information-circle"], ["tag", "tag"], ["chip", "tag"], ["badge", "medal"],
    ["blur-overlay", "lock"], ["locked", "lock"], ["sealed", "lock"], ["overlay", "eye-off"], ["boundaries", "shield"],
    ["privacy", "privacy"], ["sheet", "collapse"], ["dialog", "message"], ["toast", "notification"], ["alert", "alert-circle"],
    ["tooltip", "information-circle"], ["accordion", "expand"], ["chat-bubble", "chat-bubble"], ["chat-composer", "send"],
    ["empty-state", "inbox"], ["status-bar", "signal"], ["app-header", "menu"], ["header", "id-card"], ["footer", "connect"],
    ["section", "list-view"], ["list", "list-view"], ["menu", "more-vertical"], ["select", "arrow-down-01"], ["search", "search"],
    ["otp", "key"], ["input", "edit"], ["date-picker", "calendar"], ["slider", "filter"], ["stepper", "repeat"],
    ["checkbox", "check-circle"], ["radio", "target"], ["toggle", "toggle-on"], ["semantic-button", "thumbs-up"],
    ["icon-button", "star-circle"], ["action-island", "connect"], ["action-note", "edit"], ["text-link", "link"], ["button", "plus-circle"],
    ["segmented", "grid-view"], ["tab", "grid-view"], ["navigation", "navigation"], ["pagination", "more-horizontal"],
    ["carousel", "image"], ["progress-ring", "target"], ["progress-bar", "chart-increase"], ["spinner", "loader-circle"],
    ["skeleton", "loader-circle"], ["countdown", "timer"], ["data-card", "chart-bar"], ["data-point", "check"], ["offer", "discount"],
    ["plan", "premium"], ["membership", "premium"], ["premium", "premium"], ["addon", "gift"], ["account", "person"], ["map", "map"],
    ["location", "location-pin"], ["brand", "shaadi"], ["logo", "shaadi"], ["graphic", "image"], ["divider", "minus-sign"],
    ["indicator", "notification"], ["card", "contact-card"], ["icon", "star"], ["pinned", "pin"], ["summary", "clipboard"],
    ["grabber", "minus-sign"], ["ask", "help-circle"], ["breakdown", "chart-bar"],
  ];

  const state = { tokens: {}, catalog: { components: [], icons: {} }, stories: [], typo: [], screens: {} };
  const ui = { query: "", status: "all", iconKind: "line", iconQuery: "" };
  const $main = document.getElementById("main");
  const $nav = document.getElementById("nav");

  // ---------- helpers ----------

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const abs = (path) => new URL(path, location.href).href;
  // Absolute: a url() inside the --icon custom property resolves against sh-icon.css, not this page.
  const iconUrl = (path) => abs(`${FOUNDATION}icons/${path}`);
  const icon = (path, size = 16, cls = "") => `<span class="sh-icon sh-icon--${size} ${cls}" style="--icon:url(${iconUrl(path)})" aria-hidden="true"></span>`;
  const tokensOf = (prefix, type) => Object.entries(state.tokens).filter(([k, v]) => k.startsWith(prefix) && (!type || v.type === type));
  const purpose = (t) => (t.description || "").replace(/^Purpose:\s*/, "");
  const valueText = (t) => { const v = t.values || {}; return "Value" in v ? v.Value : Object.entries(v).map(([m, x]) => `${m} ${x}`).join(" · "); };
  const px = (t) => parseFloat((t.values || {}).Value) || 0;
  const isCore = (c) => c.group === "Core";
  const tabOf = (c) => (isCore(c) ? "catalog" : "components");
  const componentIcon = (name) => (COMPONENT_ICONS.find(([k]) => name.includes(k)) || [0, "block"])[1];
  const statusBadge = (c) => `<span class="vn-status vn-status--${STATUS[c.status].phase} sh-support-label">${esc(STATUS[c.status].label)}</span>`;

  // ---------- DNA component markup ----------

  function appHeader({ title, back, actions = "" }) {
    if (back) {
      return `<header class="sh-app-header sh-app-header--back vn-sticky"><div class="sh-app-header__bar">
        <div class="sh-app-header__navigation"><a class="sh-icon-button sh-icon-button--tertiary sh-icon-button--md" href="${back}" aria-label="Go back"><span class="sh-icon-button__icon sh-icon" style="--icon:url(${iconUrl("line/arrow-left-01.svg")})" aria-hidden="true"></span></a></div>
        <h1 class="sh-app-header__title sh-title-lg">${esc(title)}</h1>
        <div class="sh-app-header__actions">${actions}</div></div></header>`;
    }
    return `<header class="sh-app-header sh-app-header--title vn-sticky"><div class="sh-app-header__bar">
      <h1 class="sh-app-header__title sh-heading-sm">${esc(title)}</h1>
      <div class="sh-app-header__actions">${actions || themeButton()}</div></div></header>`;
  }
  function themeButton() {
    const dark = effectiveTheme() === "dark";
    return `<button class="sh-icon-button sh-icon-button--tertiary sh-icon-button--md" type="button" data-theme-toggle aria-label="${dark ? "Light mode" : "Dark mode"}"><span class="sh-icon-button__icon sh-icon" style="--icon:url(${iconUrl(`line/${dark ? "light" : "dark"}.svg`)})" aria-hidden="true"></span></button>`;
  }
  function tabGroup(items, current) {
    return `<div class="sh-tab-group vn-tabs" role="tablist">${items.map(([href, label]) =>
      `<a class="sh-tab-item" href="${href}" role="tab" aria-selected="${href === current}"><span class="sh-tab-item__label sh-title-md">${esc(label)}</span></a>`).join("")}</div>`;
  }
  function row({ href, iconName, title, badge = "", subtitle = "", divider = true }) {
    return `<div class="sh-list-default sh-list-default--icon-circle sh-list-default--chevron"><a class="sh-list-default__row" href="${href}">
      <span class="sh-list-default__leading"><span class="sh-list-default__icon-circle"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(${iconUrl(`line/${iconName}.svg`)})" aria-hidden="true"></span></span></span>
      <span class="sh-list-default__content"><span class="sh-list-default__title-row"><span class="sh-list-default__title sh-body-md">${esc(title)}</span>${badge}</span>
      ${subtitle ? `<span class="sh-list-default__subtitle sh-body-sm vn-clamp">${esc(subtitle)}</span>` : ""}</span>
      <span class="sh-list-default__trailing"><span class="sh-list-default__icon sh-icon sh-icon--20" style="--icon:url(${iconUrl("line/arrow-right-01.svg")})" aria-hidden="true"></span></span>
    </a>${divider ? '<hr class="sh-list-default__divider sh-divider sh-divider--soft">' : ""}</div>`;
  }
  const chip = (label, attrs, pressed) => `<button class="sh-chip" type="button" aria-pressed="${pressed}" ${attrs}><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${label}</span></span></button>`;
  const infoChip = (label) => `<span class="sh-chip sh-chip--info"><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${esc(label)}</span></span></span>`;
  const card = (inner) => `<section class="sh-card sh-card--elevated"><div class="sh-card__content">${inner}</div></section>`;
  function emptyState(pictogram, title, body) {
    return `<section class="sh-empty-state vn-block"><img class="sh-empty-state__pictogram" src="${abs(`${FOUNDATION}icons/pictogram/${pictogram}@2x.png`)}" alt="">
      <div class="sh-empty-state__text"><h2 class="sh-empty-state__title sh-heading-sm">${esc(title)}</h2><p class="sh-empty-state__body sh-body-md">${esc(body)}</p></div></section>`;
  }
  function search(placeholder, value, attr) {
    return `<label class="sh-search"><span class="sh-search__icon sh-icon sh-icon--16" style="--icon:url(${iconUrl("line/search.svg")})" aria-hidden="true"></span>
      <input class="sh-search__field sh-body-md" type="search" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" value="${esc(value)}" ${attr}>
      <button class="sh-search__clear" type="button" aria-label="Clear search" data-clear><span class="sh-search__icon sh-icon sh-icon--16" style="--icon:url(${iconUrl("line/close.svg")})" aria-hidden="true"></span></button></label>`;
  }
  function button(href, label, iconName, type = "secondary") {
    return `<a class="sh-button sh-button--${type} sh-button--sm" href="${esc(href)}" target="_blank" rel="noopener"><span class="sh-button__icon sh-icon" style="--icon:url(${iconUrl(`line/${iconName}.svg`)})" aria-hidden="true"></span><span class="sh-button__text"><span class="sh-button__label sh-button-sm">${esc(label)}</span></span></a>`;
  }
  // The stage as a sh-stepper: earlier stages Done, this one Current (Done when it's Final), the rest Pending.
  function stepper(c) {
    const ids = Object.keys(STATUS);
    const at = ids.indexOf(c.status);
    return `<ol class="sh-stepper-list vn-stepper">${ids.map((id, i) => {
      const done = i < at || (i === at && id === "core");
      const kind = done ? "" : i === at ? " sh-stepper--current" : " sh-stepper--pending";
      const marker = done ? `<span class="sh-stepper__check sh-icon sh-icon--12" style="--icon:url(${iconUrl("filled/check.svg")})"></span>` : `<span class="sh-stepper__dot"></span>`;
      return `<li class="sh-stepper${kind}"${i === at ? ' aria-current="step"' : ""}>
        <span class="sh-stepper__rail" aria-hidden="true"><span class="sh-stepper__marker">${marker}</span>${i < ids.length - 1 ? '<span class="sh-stepper__connector"></span>' : ""}</span>
        <span class="sh-stepper__content"><span class="sh-stepper__title sh-title-sm">${STATUS[id].label}<span class="vn-sr"> (${done ? "Done" : i === at ? "Now" : "Next"})</span></span>
        <span class="sh-stepper__subtitle sh-body-sm">${STATUS[id].hint}</span></span></li>`;
    }).join("")}</ol>`;
  }

  // ---------- theme ----------

  function currentTheme() { try { return localStorage.getItem(THEME_KEY) || "system"; } catch { return "system"; } }
  function effectiveTheme() { const t = currentTheme(); return t !== "system" ? t : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function themeFrame(frame) { try { frame.contentDocument.documentElement.dataset.theme = effectiveTheme(); } catch { /* not loaded */ } }
  function applyTheme(choice) {
    try { localStorage.setItem(THEME_KEY, choice); } catch { /* private window */ }
    if (choice === "system") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = choice;
    document.querySelectorAll("[data-theme-toggle]").forEach((b) => { b.outerHTML = themeButton(); });
    document.querySelectorAll("iframe").forEach(themeFrame);
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme(currentTheme()));

  // ---------- bottom navigation (sh-navigation-bar) ----------

  function renderNav(tab) {
    $nav.innerHTML = TABS.map((t) => {
      const on = t.id === tab;
      return `<a class="sh-navigation-item" href="#/${t.id}"${on ? ' aria-current="page"' : ""}>
        <span class="sh-navigation-item__icon-wrap"><span class="sh-navigation-item__icon sh-icon sh-icon--24" style="--icon:url(${iconUrl(`${on ? "filled" : "line"}/${t.icon}.svg`)})" aria-hidden="true"></span></span>
        <span class="sh-navigation-item__label sh-body-sm">${t.label}</span></a>`;
    }).join("");
  }

  // ---------- Home / Matches / Premium: real screens ----------

  async function pageScreen(id) {
    if (!(id in state.screens)) {
      try {
        const r = await fetch(SCREENS[id]);
        state.screens[id] = r.ok ? (await r.text()).replaceAll("ICON/", iconUrl("")).replaceAll("ASSET/", abs(FOUNDATION)) : null;
      } catch { state.screens[id] = null; }
    }
    const label = TABS.find((t) => t.id === id).label;
    return state.screens[id] || appHeader({ title: label }) + emptyState("heart", `${label} is on its way`, "This screen is being built from the Figma design. Check back soon.");
  }

  // ---------- Catalog / Components ----------

  function pageList(tab) {
    const title = tab === "catalog" ? "Catalog" : "Components";
    const tabs = tab === "catalog"
      ? tabGroup([["#/catalog", "Core components"], ["#/catalog/foundation", "Foundation"]], "#/catalog")
      : tabGroup([["#/components", "Components"], ["#/components/stories", "Stories"]], "#/components");
    return appHeader({ title }) + tabs +
      `<div class="vn-block">${search("Search name, purpose or keyword", ui.query, "data-comp-search")}</div>
       <div class="vn-scroll-x" role="group" aria-label="Stage" data-status-chips></div>
       <div data-comp-list data-tab="${tab}"></div>`;
  }
  function renderComponentList() {
    const box = document.querySelector("[data-comp-list]");
    if (!box) return;
    const tab = box.dataset.tab;
    const q = ui.query.trim().toLowerCase();
    const match = (c) => tabOf(c) === tab && (!q || [c.name, c.purpose, ...c.keywords].join(" ").toLowerCase().includes(q));
    const counted = state.catalog.components.filter(match);
    document.querySelector("[data-status-chips]").innerHTML = [["all", "All"], ...Object.entries(STATUS).map(([id, s]) => [id, s.label])]
      .map(([id, label]) => chip(`${label} · ${id === "all" ? counted.length : counted.filter((c) => c.status === id).length}`, `data-status="${id}"`, ui.status === id)).join("");
    const shown = counted.filter((c) => ui.status === "all" || c.status === ui.status);
    const groups = {};
    for (const c of shown) (groups[c.group.replace(/ \(migration, not yet core\)/, "")] ||= []).push(c);
    box.innerHTML = Object.keys(groups).sort().map((g) => `<h2 class="vn-group sh-support-label">${esc(g)} · ${groups[g].length}</h2>${
      groups[g].map((c, i) => row({ href: `#/${tab}/${c.name}`, iconName: componentIcon(c.name), title: c.name, badge: statusBadge(c),
        subtitle: c.purpose || "No purpose line in the blueprint yet.", divider: i < groups[g].length - 1 })).join("")}`).join("") ||
      emptyState("heart", "No component matches", "Try another word, or clear the stage filter.");
  }

  function pageComponent(tab, name) {
    const c = state.catalog.components.find((x) => x.name === name);
    if (!c) return appHeader({ title: "Not found", back: `#/${tab}` }) + emptyState("heart", "No such component", `There's no component named ${name}.`);
    const platforms = ["Web", "Compose", "SwiftUI"].map((p) => `<span class="vn-pill sh-support-meta${c.platforms.includes(p) ? " vn-pill--on" : ""}">${c.platforms.includes(p) ? icon("filled/check.svg", 12) : ""}${p}</span>`).join("");
    const links = [c.figma && button(c.figma, "Figma", "link"), button(GITLAB + c.blueprint, "Blueprint", "book"), c.demo && button(FOUNDATION + c.demo, "Full page", "eye")].filter(Boolean).join("");
    const demo = c.demo
      ? `<iframe class="vn-frame" title="${esc(c.name)} web build" src="${FOUNDATION}${esc(c.demo)}" data-autosize></iframe>`
      : emptyState("dna", "No web code yet", `The blueprint is ready; the web build of ${c.name} hasn't been written.`);
    return appHeader({ title: c.name, back: `#/${tab}` }) +
      `<div class="vn-block"><div class="vn-pills">${statusBadge(c)}${platforms}<span class="vn-pill sh-support-meta">${c.variants} variants</span></div>
        <p class="sh-body-md vn-intro">${esc(c.purpose)}</p><div class="vn-buttons">${links}</div></div>
       <h2 class="vn-group sh-support-label">Where it is</h2><div class="vn-block">${stepper(c)}</div>
       <h2 class="vn-group sh-support-label">Live web build</h2>${demo}`;
  }

  // ---------- Foundation ----------

  function pageFoundation() {
    const comps = state.catalog.components;
    const nIcons = Object.values(state.catalog.icons).reduce((n, l) => n + l.length, 0);
    const stat = (n, label) => card(`<span class="sh-heading-md">${n}</span><span class="sh-body-sm vn-muted">${label}</span>`);
    return appHeader({ title: "Catalog" }) + tabGroup([["#/catalog", "Core components"], ["#/catalog/foundation", "Foundation"]], "#/catalog/foundation") +
      `<div class="vn-block"><p class="sh-body-md vn-intro">Shaadi DNA Foundation: every token, text style and icon, live from the repo.</p>
        <div class="vn-stats">${stat(Object.keys(state.tokens).length, "Tokens")}${stat(nIcons, "Icons")}${stat(comps.length, "Components")}${stat(comps.filter((c) => c.demo).length, "With web code")}</div></div>` +
      FOUNDATION_SECTIONS.map((s, i) => row({ href: `#/catalog/foundation/${s.id}`, iconName: s.icon, title: s.title, subtitle: s.text, divider: i < FOUNDATION_SECTIONS.length - 1 })).join("");
  }
  function pageFoundationSection(id) {
    const s = FOUNDATION_SECTIONS.find((x) => x.id === id);
    if (!s) return appHeader({ title: "Not found", back: "#/catalog/foundation" }) + emptyState("heart", "Nothing here", "That foundation section doesn't exist.");
    return appHeader({ title: s.title, back: "#/catalog/foundation" }) + `<div class="vn-block"><p class="sh-body-md vn-intro">${esc(s.text)}.</p></div>` + SECTIONS[id]();
  }
  function swatchCard(key, t) {
    const v = t.values || {};
    const half = (mode) => `<span class="vn-half vn-checker"${mode === "Dark" ? ' data-theme="dark"' : ""}><span class="vn-paint" style="background:${esc(v[mode])}"></span></span>`;
    const chipHtml = "Value" in v ? `<div class="vn-swatch__chip vn-swatch__chip--one vn-checker"><span class="vn-half"><span class="vn-paint" style="background:var(${t.css})"></span></span></div>` : `<div class="vn-swatch__chip">${half("Light")}${half("Dark")}</div>`;
    return `<div class="vn-swatch">${chipHtml}<div class="vn-swatch__body"><span class="sh-title-sm">${esc(key.split("/").slice(1).join("/"))}</span><span class="vn-code sh-support-meta">${esc(t.css)}</span><span class="sh-support-meta vn-muted">${esc(valueText(t))}</span></div></div>`;
  }
  function tokenRows(prefix, sample) {
    return `<div class="vn-rows">${tokensOf(prefix, "number").sort((a, b) => px(a[1]) - px(b[1])).map(([key, t]) => `<div class="vn-row">
      <span class="sh-title-sm">${esc(key.replace(prefix, ""))} · ${esc(valueText(t))}</span><span class="vn-code sh-support-meta">var(${esc(t.css)})</span>${sample(t)}</div>`).join("")}</div>`;
  }
  const SECTIONS = {
    colours: () => {
      const groups = {};
      for (const [k, t] of tokensOf("sh-color-common/", "color")) (groups[k.split("/")[1]] ||= []).push([k, t]);
      groups.translucent = tokensOf("sh-translucent/", "color");
      return Object.entries(groups).map(([g, list]) => `<h2 class="vn-group sh-support-label">${esc(g)}</h2><div class="vn-swatches">${list.map(([k, t]) => swatchCard(k, t)).join("")}</div>`).join("");
    },
    gradients: () => `<div class="vn-swatches">${tokensOf("sh-gradient/").map(([k, t]) => `<div class="vn-swatch"><div class="vn-swatch__chip vn-swatch__chip--one" style="background:var(${t.css})"></div><div class="vn-swatch__body"><span class="sh-title-sm">${esc(k.replace("sh-gradient/", ""))}</span><span class="vn-code sh-support-meta">${esc(t.css)}</span></div></div>`).join("")}</div>`,
    typography: () => `<div class="vn-rows">${state.typo.map((cls) => `<div class="vn-row"><span class="vn-code sh-support-meta">.${esc(cls)} · <span data-type-metrics></span></span><span class="vn-type-sample ${esc(cls)}">Find someone who gets you</span></div>`).join("")}</div>`,
    spacing: () => tokenRows("sh-space/", (t) => `<div class="vn-bar-sample" style="width:var(${t.css})"></div>`),
    radius: () => tokenRows("sh-radius/", (t) => `<div class="vn-radius-sample" style="border-radius:var(${t.css})"></div>`),
    stroke: () => tokenRows("sh-stroke/", (t) => `<div class="vn-stroke-sample" style="border-top-width:var(${t.css})"></div>`),
    opacity: () => tokenRows("sh-opacity/", (t) => `<div class="vn-opacity-sample" style="opacity:var(${t.css})"></div>`),
    shadows: () => `<div class="vn-rows">${[...new Set(tokensOf("sh-shadow/").map(([k]) => k.split("/")[1]))].map((n) => {
      const v = (p) => `var(--sh-shadow-${n}-${p})`;
      return `<div class="vn-row"><span class="sh-title-sm">${esc(n)}</span><div class="vn-shadow-sample" style="box-shadow:${v("x")} ${v("y")} ${v("blur")} ${v("spread")} ${v("color")}"></div></div>`;
    }).join("")}</div>`,
    icons: () => {
      const kinds = Object.keys(state.catalog.icons);
      if (!kinds.includes(ui.iconKind)) ui.iconKind = kinds[0];
      return `<div class="vn-block">${search("Search icons", ui.iconQuery, "data-icon-search")}</div>
        <div class="vn-scroll-x" role="group" aria-label="Icon type">${kinds.map((k) => chip(`${esc(k)} · ${state.catalog.icons[k].length}`, `data-icon-kind="${esc(k)}"`, k === ui.iconKind)).join("")}</div>
        <div class="vn-icons" data-icon-grid></div>`;
    },
  };
  function renderIconGrid() {
    const grid = document.querySelector("[data-icon-grid]");
    if (!grid) return;
    const mono = ui.iconKind === "line" || ui.iconKind === "filled";
    const q = ui.iconQuery.trim().toLowerCase();
    const list = state.catalog.icons[ui.iconKind].filter((f) => !q || f.includes(q));
    grid.innerHTML = list.map((f) => {
      const path = `${ui.iconKind}/${f}`;
      const art = mono && f.endsWith(".svg") ? icon(path, 24) : `<img src="${abs(`${FOUNDATION}icons/${path}`)}" alt="">`;
      return `<div class="vn-icon" title="${esc(path)}">${art}<span class="vn-code sh-support-meta">${esc(f.replace(/\.(svg|png)$/, ""))}</span></div>`;
    }).join("");
    grid.hidden = !list.length;
    grid.insertAdjacentHTML("afterend", list.length ? "" : emptyState("heart", "No icon matches", "Try another name."));
  }
  function fillTypeMetrics() {
    document.querySelectorAll("[data-type-metrics]").forEach((el) => {
      const cs = getComputedStyle(el.closest(".vn-row").querySelector(".vn-type-sample"));
      el.textContent = `${cs.fontSize} / ${cs.lineHeight} · ${cs.fontWeight}`;
    });
  }

  // ---------- Stories ----------

  const storyComponents = (s) => [...new Set(s.screens.flatMap((sc) => sc.blocks.filter((b) => b.from).map((b) => b.from.split("/").pop().replace(/\.html$/, ""))))];
  function pageStories() {
    return appHeader({ title: "Components" }) + tabGroup([["#/components", "Components"], ["#/components/stories", "Stories"]], "#/components/stories") +
      `<div class="vn-block"><p class="sh-body-md vn-intro">Every Jira story with its screens, put together live from the components.</p></div>` +
      (state.stories.map((s, i) => row({ href: `#/stories/${s.id}`, iconName: "notebook", title: `${s.id} · ${s.title}`, badge: `<span class="vn-pill sh-support-micro">${esc(s.status || "")}</span>`,
        subtitle: `${s.screens.length} screens · ${storyComponents(s).length} components`, divider: i < state.stories.length - 1 })).join("") ||
       emptyState("heart", "No stories yet", "Stories appear here when a Jira story adds its screens."));
  }
  // A screen is assembled from blocks: a DNA component picked out of its web/ demo page ({from, pick, count, skip})
  // or layout HTML using DNA classes ({html}). Picked markup gets absolute URLs; the demo's stylesheets come along.
  async function buildScreen(screen) {
    const links = new Set();
    const parts = [];
    for (const block of screen.blocks) {
      if (block.html) { parts.push(block.html); continue; }
      const src = new URL(FOUNDATION + block.from, location.href);
      const doc = new DOMParser().parseFromString(await (await fetch(src)).text(), "text/html");
      doc.querySelectorAll('link[rel="stylesheet"]').forEach((l) => links.add(new URL(l.getAttribute("href"), src).href));
      const nodes = [...doc.querySelectorAll(block.pick)].slice(block.skip || 0, (block.skip || 0) + (block.count || 1));
      if (!nodes.length) { parts.push(`<p class="sh-body-sm">Missing: ${esc(block.pick)}</p>`); continue; }
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
    if (!s) return appHeader({ title: "Not found", back: "#/components/stories" }) + emptyState("heart", "No such story", `${id} isn't in stories.json.`);
    const used = storyComponents(s);
    const fact = (n, label) => `<div class="vn-fact"><span class="sh-heading-md">${n}</span><span class="sh-support-label vn-muted">${label}</span></div>`;
    const usedChips = used.map((name) => {
      const c = state.catalog.components.find((x) => x.name === name);
      return c ? `<a class="sh-chip" href="#/${tabOf(c)}/${esc(name)}"><span class="sh-chip__content"><span class="sh-chip__label sh-body-md">${esc(name)}</span></span></a>` : "";
    }).join("");
    return appHeader({ title: s.id, back: "#/components/stories" }) +
      `<div class="vn-block"><div class="vn-pills"><span class="vn-pill vn-pill--on sh-support-label">${esc(s.id)}</span><span class="vn-pill sh-support-label">${esc(s.status || "")}</span></div>
        <h2 class="sh-heading-md">${esc(s.title)}</h2><p class="sh-body-md vn-intro">${esc(s.summary)}</p>
        <div class="vn-facts">${fact(s.screens.length, "Screens")}${fact(used.length, "Components")}${fact((s.decisions || []).length, "Decisions")}</div></div>
       ${s.decisions?.length ? `<h2 class="vn-group sh-support-label">Decisions</h2><div class="vn-scroll-x">${s.decisions.map(infoChip).join("")}</div>` : ""}
       ${s.screens.map((sc, i) => `<h2 class="vn-group sh-support-label">${esc(sc.name)}</h2><div class="vn-story-screen"><iframe title="${esc(sc.name)}" data-screen="${i}"></iframe></div>`).join("")}
       <h2 class="vn-group sh-support-label">Components used</h2><div class="vn-scroll-x">${usedChips}</div>`;
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

  async function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "home").replace(/\/$/, "").split("/").map(decodeURIComponent);
    const [first, second, third] = parts;
    let tab = first === "stories" ? "components" : TABS.some((t) => t.id === first) ? first : "home";
    renderNav(tab);
    let html;
    if (SCREENS[tab]) html = await pageScreen(tab);
    else if (first === "stories") html = pageStory(second);
    else if (tab === "catalog" && second === "foundation") html = third ? pageFoundationSection(third) : pageFoundation();
    else if (tab === "components" && second === "stories") html = pageStories();
    else html = second ? pageComponent(tab, second) : pageList(tab);
    $main.innerHTML = html;
    $main.scrollTop = 0;
    const title = $main.querySelector("h1")?.textContent?.trim();
    document.title = title && tab !== "home" ? `${title} · Shaadi` : "Shaadi";

    if ((tab === "catalog" || tab === "components") && !second) renderComponentList();
    if (third === "icons") renderIconGrid();
    if (third === "typography") document.fonts.ready.then(fillTypeMetrics);
    if (first === "stories") fillStoryScreens(second);
    document.querySelectorAll("iframe").forEach((f) => f.addEventListener("load", () => themeFrame(f)));
    document.querySelectorAll("iframe[data-autosize]").forEach(autosize);
  }

  $main.addEventListener("input", (e) => {
    if (e.target.matches("[data-comp-search]")) { ui.query = e.target.value; renderComponentList(); }
    if (e.target.matches("[data-icon-search]")) { ui.iconQuery = e.target.value; document.querySelector("[data-icon-grid]")?.nextElementSibling?.matches(".sh-empty-state") && document.querySelector("[data-icon-grid]").nextElementSibling.remove(); renderIconGrid(); }
  });
  $main.addEventListener("click", (e) => {
    const t = (sel) => e.target.closest(sel);
    if (t("[data-theme-toggle]")) {
      applyTheme(effectiveTheme() === "dark" ? "light" : "dark");
    } else if (t("[data-clear]")) {
      const field = t("[data-clear]").closest(".sh-search").querySelector("input");
      field.value = ""; field.dispatchEvent(new Event("input", { bubbles: true })); field.focus();
    } else if (t("[data-status]")) {
      ui.status = t("[data-status]").dataset.status; renderComponentList();
    } else if (t("[data-icon-kind]")) {
      const b = t("[data-icon-kind]");
      ui.iconKind = b.dataset.iconKind;
      document.querySelectorAll("[data-icon-kind]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      document.querySelector("[data-icon-grid]")?.nextElementSibling?.matches(".sh-empty-state") && document.querySelector("[data-icon-grid]").nextElementSibling.remove();
      renderIconGrid();
    }
  });

  async function start() {
    document.querySelectorAll("[data-icon]").forEach((el) => el.style.setProperty("--icon", `url(${iconUrl(el.dataset.icon)})`));
    applyTheme(currentTheme());
    try {
      const [tokens, catalog, stories, typoCss] = await Promise.all([
        fetch(FOUNDATION + "dist/json/tokens.json").then((r) => r.json()),
        fetch(FOUNDATION + "dist/vision/catalog.json").then((r) => r.json()),
        fetch("stories.json").then((r) => r.json()),
        fetch(FOUNDATION + "dist/sh-typo-kit/developer/web/sh-typo.css").then((r) => r.text()),
      ]);
      Object.assign(state, { tokens, catalog, stories });
      state.typo = [...new Set([...typoCss.matchAll(/^\.(sh-[a-z0-9-]+)\s*\{/gm)].map((m) => m[1]))];
    } catch (err) {
      $main.innerHTML = appHeader({ title: "Shaadi" }) + emptyState("dna", "Build the foundation first", `Run python3 shaadi-dna-foundation/tools/build.py, then reload. (${err.message})`);
      return;
    }
    addEventListener("hashchange", route);
    route();
  }
  start();
})();
