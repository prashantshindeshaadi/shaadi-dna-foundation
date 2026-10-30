# Vision App never mixes cached and new files

**2026-10-30**

## What changed
- The app's own files (vision.js, vision.css, screens.css, tokens and type kit) load with a per-visit version stamp.
- Each component stylesheet in `dist/vision/components.css` carries its file's change time.

## Why
A browser had kept the old script while loading the new styles, so the desktop sidebar drew as a phone bar: a big round pill with overlapping labels. Now every reload gets matching files.

## Who needs to do something
- Nothing. Reload the app once.
