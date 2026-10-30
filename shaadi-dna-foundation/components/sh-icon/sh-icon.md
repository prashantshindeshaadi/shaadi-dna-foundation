# sh-icon

**Purpose:** How the Shaadi icon pack is drawn in code. The pack itself (400 icons, one Figma component set per
icon, `sh-icon/<name>`) is listed in [../icons.md](../icons.md); the SVGs are in `../../icons/<type>/<name>.svg`.

**Built from:** the icon SVGs exported from Figma by `tools/components.py`; sizes and stroke weights from the
`sh-icon` tokens (`sh-icon/size/12…24`, `sh-icon/stroke/12…24`).

**Rules:**
- Line and filled icons are single-colour. They take the surrounding text colour, or a paint: a colour token,
  or a gradient token through the glyph (e.g. You & Her = `sh-gradient/brand/default`, Astro = `sh-gradient/premium/default`).
- Pictograms, brand marks, badges and multi-colour tag art (Online / Offline dots, Top Profile wings) keep their own colours.
- Size is always one of the `sh-icon/size` tokens. Never recolour an icon away from its component's token.
- Decorative icons are hidden from screen readers; an icon that is the only content of a control gets a label
  on the control (sh-icon-button "Screen reader label").
- Line icons in the SVGs are drawn at 24 with `sh-icon/stroke/24`; scaled down they keep that proportion. Where the
  exact per-size stroke matters, import the size's own export.

**Code:** Web (HTML/CSS): [sh-icon.css](web/sh-icon.css), [sh-icon.html](web/sh-icon.html) · Jetpack Compose: [ShIcon.kt](compose/ShIcon.kt) · SwiftUI: [ShIcon.swift](swiftui/ShIcon.swift)

| Platform | Line / filled icon | Paint | Own colours | Badge |
|---|---|---|---|---|
| Web | `<span class="sh-icon sh-icon--16" style="--icon:url(…/icons/line/close.svg)">` | `.sh-icon--brand`, `.sh-icon--premium`, or `--sh-icon-paint: <token>` | `<img class="sh-icon sh-icon--12" src="…/icons/tag/online.svg">` | `<img class="sh-badge sh-badge--20" src="…/icons/misc/verified-badge.svg" alt="Verified">` |
| Compose | `ShIcon(R.drawable.sh_icon_line_close, size)` | `paint = ShIconPaint.Tint(color)` / `ShIconPaint.Gradient(ShGradient.brandDefault())` | `ShIconPaint.Original` | `ShBadge(R.drawable.sh_icon_misc_verified_badge, "Verified", height)` |
| SwiftUI | `ShIcon("line/close", size: SH.Icon.size16)` | `paint: .color(…)` / `.gradient(SH.Gradient.brandDefault)` | `.original` | `ShBadge("misc/verified-badge", label: "Verified")` |

Components that take an icon as a property use `ShIconSpec(icon, paint)`.

**Asset names:** Android vector drawables `sh_icon_<type>_<name>` (hyphens → underscores); iOS asset catalogue
`sh-icon/<type>/<name>` (Preserve Vector Data; Render As Template for line/filled, Original for the rest).

*Hand-written (no single Figma set). Icon list: [../icons.md](../icons.md).*
