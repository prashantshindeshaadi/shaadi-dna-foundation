# Lexend-SH

Shaadi's build of Lexend. The ss01 double-storey `a` and `g` are the default
glyphs; the serifed `I` and `J` are kept, so "Il1" stays distinguishable.

Weights: **360 regular · 480 medium · 600 bold · 720 black**. These are not
standard weights. Use them as-is — never round to 400/500/600/700, or the
calibration is lost.

## Files

| File | Family | PostScript | Use |
|---|---|---|---|
| `LexendSH-VF.ttf` | **Lexend-SH VF** | `LexendSHVF-Regular` | **Primary.** Variable, wght 100–900, default 360 |
| `LexendSH-Regular.ttf` | Lexend-SH | `LexendSH-Regular` | Static fallback, 360 |
| `LexendSH-Medium.ttf` | Lexend-SH Medium | `LexendSH-Medium` | Static fallback, 480 |
| `LexendSH-Bold.ttf` | Lexend-SH | `LexendSH-Bold` | Static fallback, 600 |
| `LexendSH-Black.ttf` | Lexend-SH Black | `LexendSH-Black` | Static fallback, 720 |

The two families are deliberately separate. `Lexend-SH VF` is the variable font;
`Lexend-SH` is the static set. Keeping them apart stops the operating system
deduplicating one against the other.

Static fallbacks are for Android below API 26, React Native, Flutter and email —
anywhere variable fonts aren't reliable.

## Designers

Install `LexendSH-VF.ttf`. Figma shows **Lexend-SH VF** with Regular, Medium,
Bold and Black as styles, plus a Variable tab with the weight slider.

Install the statics only if you need them for a specific export path. Having
both sets installed is fine, since the family names differ.

## Web

Compress to WOFF2 first — never ship TTF:

```bash
pip install fonttools brotli
fonttools ttLib.woff2 compress fonts/LexendSH-VF.ttf
```

```css
@font-face {
  font-family: 'Lexend-SH VF';
  src: url('LexendSH-VF.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

:root { font-synthesis: none; }

body { font-family: 'Lexend-SH VF', system-ui, sans-serif; font-weight: 360; }
```

The `font-weight: 100 900` range is what makes 360 and 480 resolve exactly
instead of snapping to the nearest standard weight.

## Android

API 26+, variable: `res/font/lexendsh_vf.ttf`

```xml
<TextView
    android:fontFamily="@font/lexendsh_vf"
    android:fontVariationSettings="'wght' 360" />
```

Below API 26, statics as `lexend_sh_regular.ttf` and so on, with a
`font-family` XML mapping each file to its `android:fontWeight`.

## iOS

Add to the bundle and list under `UIAppFonts`.

```swift
// Static
UIFont(name: "LexendSH-Medium", size: 16)

// Variable — UIKit has no public axis API, so Core Text is needed
let desc = UIFontDescriptor(fontAttributes: [
    .name: "LexendSHVF-Regular",
    kCTFontVariationAttribute as UIFontDescriptor.AttributeName: [2003265652: 480]
])   // 2003265652 = 'wght'
let font = UIFont(descriptor: desc, size: 16)
```

## Licence

Derivative of Lexend (Copyright 2019 The Lexend Project Authors) under the SIL
Open Font License 1.1. Lexend declares no Reserved Font Name, so the renamed
derivative is permitted. Keep `OFL.txt` alongside these files. Modifications are
recorded in each file's copyright notice.
