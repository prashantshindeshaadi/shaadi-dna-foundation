# Lexend-SH · sh-typo kit

Shaadi's typeface: **Lexend-SH VF**, a derivative of Lexend. 22 text styles,
3 breakpoints. Font version 1.009.

This file is also the README of the shareable kit. Build the kit with
`python3 tools/build.py`; it lands at `dist/sh-typo-kit.zip`.

## Which file is mine

| You are | Kit folder | Font |
|---|---|---|
| Designer | `designer/` | `LexendSH-VF.ttf` (variable) |
| Web developer | `developer/web/` | `fonts/LexendSH-VF.woff2` (variable) |
| Android developer | `developer/android/` | `res/font/lexendsh_*.ttf` (4 static) |
| iOS developer | `developer/ios/` | `Fonts/LexendSH-*.ttf` (4 static) |

```
sh-typo-kit/
  README.md · OFL.txt
  designer/    LexendSH-VF.ttf · figma-variables/ (Mobile, Tablet, Desktop)
  developer/
    web/       fonts/LexendSH-VF.woff2 · sh-typo.css · preview.html
    android/   res/font/lexendsh_{regular,medium,bold,black}.ttf · ShTypography.kt
    ios/       Fonts/LexendSH-{Regular,Medium,Bold,Black}.ttf · ShTypography.swift
```

Figma and web use the variable font; Android and iOS use the four static files.
All are cut from the same outlines at the same weights, so they render
identically.

## Designers

1. Remove older Lexend-SH from Font Book.
2. Install `designer/LexendSH-VF.ttf`. Figma shows **Lexend-SH VF** with
   Regular, Medium, Bold and Black.

`figma-variables/` is a backup of the `sh-typo` collection, for restoring it or
setting up a new file. The live variables are already in the Shaadi DNA library.

## Web

Copy `developer/web/` into the project, keeping `fonts/` next to the CSS. Load
`sh-typo.css` once. Then use a class or the variables:

```html
<h1 class="sh-heading-lg">Find someone who feels like home</h1>
```

```css
.profile-name {
  font-family: var(--sh-typo-font-family-primary);
  font-size: var(--sh-typo-title-lg-size);
  line-height: var(--sh-typo-title-lg-line-height);
  font-weight: var(--sh-typo-title-lg-weight);
  letter-spacing: var(--sh-typo-title-lg-letter-spacing);
}
```

The names match Figma Dev Mode and the foundation's `tokens.css`. Breakpoints
(768px, 1024px) are inside the CSS. Never ship the TTF to the web.

## Android (Jetpack Compose)

Copy `res/font/*.ttf` into `app/src/main/res/font/`, add `ShTypography.kt`, set
its `package` and `R` import.

```kotlin
val type = ShTypography.forWidth(LocalConfiguration.current.screenWidthDp)
Text("Find someone who feels like home", style = type.headingLg)
```

Switches at 600dp and 840dp. Support Micro is uppercase: pass `text.uppercase()`.

## iOS (SwiftUI / UIKit)

Add `Fonts/*.ttf` to the app target, list them under **Fonts provided by
application** (`UIAppFonts`) in Info.plist, add `ShTypography.swift`.

```swift
Text("Find someone who feels like home").shTextStyle(.headingLg)          // SwiftUI
label.attributedText = ShTextStyle.bodyMd.spec(.mobile).attributed("Hi")   // UIKit
```

Compact width uses Mobile, regular width (iPad) uses Tablet. Sizes follow
Dynamic Type.

## Rules

1. Use the weight numbers below exactly. Never `normal`, `bold`, 400 or 700. A
   wrong number still renders, so nothing warns you.
2. Use a style, never a loose size. No style fits? Ask.
3. One Display per screen. `support/meta` only for timestamps, counts and
   "last seen", never anything a member must read to act.

## Version 1.009

- Weights recalibrated (table below). Regular unchanged.
- Every glyph sits 30 units (3% of the size) higher, so text is optically
  centred in its line box. Line heights didn't change; no code change needed.
  Side effects: next to another font on the same line (Hindi, Marathi system
  fallback) Lexend-SH sits 3% higher, and cap-height trimming (Figma vertical
  trim, CSS `text-box-trim`) is 30 units out.
- Update 2026-10-23 (still 1.009): capital **I** and **J** (and their accented
  forms) now use the former `ss01` alternates by default. **I** is narrower
  (Regular 464 → 308 units), so lines with a capital I get slightly shorter.
  Replace the font everywhere (Font Book, web, Android, iOS); the name and
  version are unchanged, so apps keep the old file until restarted.

## Licence

Derivative of Lexend under the SIL Open Font License 1.1. `OFL.txt` travels with
the font files, always.
