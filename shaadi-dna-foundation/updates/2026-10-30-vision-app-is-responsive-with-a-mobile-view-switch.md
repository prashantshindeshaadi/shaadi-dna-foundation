# Vision App is responsive, with a Mobile view switch

**2026-10-30**

## What changed
- The app now fits every screen. It uses the same breakpoints as the tokens (768 and 1024) and the matching sh-navigation-bar layout for each:
  - **Phone:** a floating bar at the bottom.
  - **Tablet:** a wide floating bar with inline items.
  - **Desktop:** a left sidebar. The content is centred, and Home, Matches and Premium keep their phone width.
- **Mobile view switch (tablet and desktop):** opens the same app at phone width inside a phone frame, with its status bar. **Desktop view** brings it back to the page you were on. The app remembers your choice, and the theme follows into the frame.
- **Alignment fixed:** search fields, chips and group labels now use the same 16 px gutter as the list rows. Before, `sh-space/page-margin` grew to 80 on desktop and pushed them out of line.
- **Grids widen with the screen:** colour swatches, icons and stats cards.
- **Component pictures (ready, not fetched yet):** `tools/thumbnails.py` fetches each component's picture from Figma. The app shows it in lists and on the component page; until then each row keeps its pack icon. `/shaadi-dna-sync` runs it.

## Who needs to do something
- **Prashant:** run the thumbnail script once with your Figma token. After that, the sync keeps the pictures current.

## Checks
- [x] Checked at 601, 900 and 1280 wide, and in Mobile view; no console errors from the app
