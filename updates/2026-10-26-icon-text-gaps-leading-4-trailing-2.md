# Buttons and text links: leading gap 4, trailing gap 2 (Medium)

**2026-10-26**

## What changed

- **Common component change:** the gap from the leading icon to the label is now 2 px wider than the gap from the label to the trailing icon. The rule is leading = trailing + `sh-space/2`:

  | Size | Leading icon → text | Text → trailing icon |
  |---|---|---|
  | Large | 6 | 4 |
  | Medium | 4 | 2 |
  | Small | 4 | 2 |

- How it's built: the row gap stays as it was (the trailing gap: Large 4, Medium / Small 2), and the `Leading icon` frame gets `sh-space/2` right padding. With the leading icon off, the label isn't shifted.
- Applied to `sh-button` (90 variants with icons), `sh-semantic-button` (180) and `sh-text-link` (22). 0 of 1,276 copies override it.
- The `sh-button` blueprint lists both gaps per size.

## Why

An icon in front of a label needs a little more air than a trailing chevron or arrow, which belongs to the label.

## Who needs to do something

- **Developers:** leading icon margin-right = trailing gap + 2 (6 / 4 / 4), trailing gap 4 / 2 / 2 for Large / Medium / Small.

## Checks

- [x] Measured on Primary: Large 6 / 4, Medium 4 / 2, Small 4 / 2
- [x] Buttons, semantic buttons and text links render at all sizes
