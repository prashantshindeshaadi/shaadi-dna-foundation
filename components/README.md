# Components

One folder per `sh-*` component, named exactly like the Figma component. Inside: the
blueprint `<sh-name>.md`, generated from Figma by `tools/components.py`. Code (`*.tsx`, `*.swift`,
`*.kt`) and Code Connect files go in the same folder when they exist.

Figma Code Connect links every component to its blueprint (label: Markdown), so Dev Mode and the
Figma MCP point straight here. When a code component is built, re-link it to the code file.

A component is in the system when it sits on the Core page; migration-page components are
work in progress and may still change.

## Core

| Component | Variants | Properties | Blueprint | Figma |
|---|---|---|---|---|
| `sh-accordion` | 2 | 4 | [sh-accordion/sh-accordion.md](sh-accordion/sh-accordion.md) | [`2718:41883`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41883) |
| `sh-alert` | 8 | 7 | [sh-alert/sh-alert.md](sh-alert/sh-alert.md) | [`2718:41675`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41675) |
| `sh-app-header` | 3 | 3 | [sh-app-header/sh-app-header.md](sh-app-header/sh-app-header.md) | [`2712:13153`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13153) |
| `sh-avatar` | 9 | 4 | [sh-avatar/sh-avatar.md](sh-avatar/sh-avatar.md) | [`2486:15378`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2486-15378) |
| `sh-avatar-glyph` | 6 | 2 | [sh-avatar-glyph/sh-avatar-glyph.md](sh-avatar-glyph/sh-avatar-glyph.md) | [`2644:42085`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-42085) |
| `sh-avatar-stack` | 1 | 2 | [sh-avatar-stack/sh-avatar-stack.md](sh-avatar-stack/sh-avatar-stack.md) | [`2710:24413`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2710-24413) |
| `sh-badge` | 2 | 4 | [sh-badge/sh-badge.md](sh-badge/sh-badge.md) | [`2364:5662`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2364-5662) |
| `sh-bottom-sheet` | 12 | 18 | [sh-bottom-sheet/sh-bottom-sheet.md](sh-bottom-sheet/sh-bottom-sheet.md) | [`2638:64989`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2638-64989) |
| `sh-button` | 108 | 14 | [sh-button/sh-button.md](sh-button/sh-button.md) | [`163:1301`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=163-1301) |
| `sh-card` | 6 | 5 | [sh-card/sh-card.md](sh-card/sh-card.md) | [`2613:33481`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2613-33481) |
| `sh-carousel-dots` | 1 | 0 | [sh-carousel-dots/sh-carousel-dots.md](sh-carousel-dots/sh-carousel-dots.md) | [`2225:4974`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2225-4974) |
| `sh-chat-bubble` | 3 | 3 | [sh-chat-bubble/sh-chat-bubble.md](sh-chat-bubble/sh-chat-bubble.md) | [`2719:42995`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-42995) |
| `sh-chat-composer` | 2 | 2 | [sh-chat-composer/sh-chat-composer.md](sh-chat-composer/sh-chat-composer.md) | [`2719:43030`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-43030) |
| `sh-checkbox` | 10 | 2 | [sh-checkbox/sh-checkbox.md](sh-checkbox/sh-checkbox.md) | [`2496:22479`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-22479) |
| `sh-chip` | 33 | 15 | [sh-chip/sh-chip.md](sh-chip/sh-chip.md) | [`306:3749`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=306-3749) |
| `sh-countdown` | 2 | 6 | [sh-countdown/sh-countdown.md](sh-countdown/sh-countdown.md) | [`2718:41900`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41900) |
| `sh-data-card` | 3 | 9 | [sh-data-card/sh-data-card.md](sh-data-card/sh-data-card.md) | [`2644:46398`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2644-46398) |
| `sh-data-point` | 12 | 17 | [sh-data-point/sh-data-point.md](sh-data-point/sh-data-point.md) | [`2470:15412`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2470-15412) |
| `sh-date-picker` | 2 | 1 | [sh-date-picker/sh-date-picker.md](sh-date-picker/sh-date-picker.md) | [`2719:42965`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-42965) |
| `sh-dialog` | 2 | 4 | [sh-dialog/sh-dialog.md](sh-dialog/sh-dialog.md) | [`2718:41832`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41832) |
| `sh-divider` | 6 | 2 | [sh-divider/sh-divider.md](sh-divider/sh-divider.md) | [`594:31711`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=594-31711) |
| `sh-empty-state` | 1 | 5 | [sh-empty-state/sh-empty-state.md](sh-empty-state/sh-empty-state.md) | [`2718:41694`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41694) |
| `sh-icon-button` | 75 | 12 | [sh-icon-button/sh-icon-button.md](sh-icon-button/sh-icon-button.md) | [`567:26954`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=567-26954) |
| `sh-icon-button-with-label` | 1 | 2 | [sh-icon-button-with-label/sh-icon-button-with-label.md](sh-icon-button-with-label/sh-icon-button-with-label.md) | [`2198:32247`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2198-32247) |
| `sh-indicator` | 4 | 3 | [sh-indicator/sh-indicator.md](sh-indicator/sh-indicator.md) | [`2717:39751`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2717-39751) |
| `sh-input` | 24 | 12 | [sh-input/sh-input.md](sh-input/sh-input.md) | [`1467:17271`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=1467-17271) |
| `sh-list` | 42 | 16 | [sh-list/sh-list.md](sh-list/sh-list.md) | [`2643:35319`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2643-35319) |
| `sh-logo` | 4 | 2 | [sh-logo/sh-logo.md](sh-logo/sh-logo.md) | [`2721:43543`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2721-43543) |
| `sh-menu` | 1 | 0 | [sh-menu/sh-menu.md](sh-menu/sh-menu.md) | [`2718:41740`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41740) |
| `sh-menu-item` | 5 | 5 | [sh-menu-item/sh-menu-item.md](sh-menu-item/sh-menu-item.md) | [`2718:41739`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41739) |
| `sh-navigation-bar` | 15 | 2 | [sh-navigation-bar/sh-navigation-bar.md](sh-navigation-bar/sh-navigation-bar.md) | [`2711:12618`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-12618) |
| `sh-navigation-item` | 4 | 5 | [sh-navigation-item/sh-navigation-item.md](sh-navigation-item/sh-navigation-item.md) | [`2711:12054`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-12054) |
| `sh-offer-card` | 2 | 2 | [sh-offer-card/sh-offer-card.md](sh-offer-card/sh-offer-card.md) | [`2718:40923`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-40923) |
| `sh-otp-input` | 8 | 4 | [sh-otp-input/sh-otp-input.md](sh-otp-input/sh-otp-input.md) | [`2718:42875`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-42875) |
| `sh-overlay` | 4 | 10 | [sh-overlay/sh-overlay.md](sh-overlay/sh-overlay.md) | [`2314:18393`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2314-18393) |
| `sh-pagination` | 1 | 0 | [sh-pagination/sh-pagination.md](sh-pagination/sh-pagination.md) | [`2718:41908`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41908) |
| `sh-pagination-item` | 3 | 2 | [sh-pagination-item/sh-pagination-item.md](sh-pagination-item/sh-pagination-item.md) | [`2718:41907`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41907) |
| `sh-photo-upload` | 4 | 1 | [sh-photo-upload/sh-photo-upload.md](sh-photo-upload/sh-photo-upload.md) | [`2719:42897`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2719-42897) |
| `sh-photo-wrapper` | 1 | 3 | [sh-photo-wrapper/sh-photo-wrapper.md](sh-photo-wrapper/sh-photo-wrapper.md) | [`2530:10330`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2530-10330) |
| `sh-progress-bar` | 3 | 1 | [sh-progress-bar/sh-progress-bar.md](sh-progress-bar/sh-progress-bar.md) | [`2712:13063`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13063) |
| `sh-progress-ring` | 1 | 3 | [sh-progress-ring/sh-progress-ring.md](sh-progress-ring/sh-progress-ring.md) | [`2613:33495`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2613-33495) |
| `sh-radio` | 10 | 2 | [sh-radio/sh-radio.md](sh-radio/sh-radio.md) | [`2496:22347`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-22347) |
| `sh-search` | 2 | 4 | [sh-search/sh-search.md](sh-search/sh-search.md) | [`2597:29917`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-29917) |
| `sh-section` | 1 | 2 | [sh-section/sh-section.md](sh-section/sh-section.md) | [`2613:34398`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2613-34398) |
| `sh-section-header` | 1 | 4 | [sh-section-header/sh-section-header.md](sh-section-header/sh-section-header.md) | [`2606:29601`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2606-29601) |
| `sh-segmented-control` | 3 | 1 | [sh-segmented-control/sh-segmented-control.md](sh-segmented-control/sh-segmented-control.md) | [`2711:11953`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-11953) |
| `sh-select` | 5 | 5 | [sh-select/sh-select.md](sh-select/sh-select.md) | [`2718:42776`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-42776) |
| `sh-semantic-button` | 216 | 13 | [sh-semantic-button/sh-semantic-button.md](sh-semantic-button/sh-semantic-button.md) | [`562:23918`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=562-23918) |
| `sh-skeleton` | 4 | 1 | [sh-skeleton/sh-skeleton.md](sh-skeleton/sh-skeleton.md) | [`2712:13115`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13115) |
| `sh-slider` | 9 | 4 | [sh-slider/sh-slider.md](sh-slider/sh-slider.md) | [`2597:29841`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-29841) |
| `sh-spinner` | 9 | 2 | [sh-spinner/sh-spinner.md](sh-spinner/sh-spinner.md) | [`2718:41521`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41521) |
| `sh-status-bar` | 4 | 4 | [sh-status-bar/sh-status-bar.md](sh-status-bar/sh-status-bar.md) | [`232:6808`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=232-6808) |
| `sh-stepper` | 3 | 5 | [sh-stepper/sh-stepper.md](sh-stepper/sh-stepper.md) | [`2712:13089`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13089) |
| `sh-tab` | 6 | 6 | [sh-tab/sh-tab.md](sh-tab/sh-tab.md) | [`2711:11922`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2711-11922) |
| `sh-tabs` | 2 | 1 | [sh-tabs/sh-tabs.md](sh-tabs/sh-tabs.md) | [`2721:43483`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2721-43483) |
| `sh-tag` | 20 | 11 | [sh-tag/sh-tag.md](sh-tag/sh-tag.md) | [`2357:23671`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2357-23671) |
| `sh-text-link` | 44 | 10 | [sh-text-link/sh-text-link.md](sh-text-link/sh-text-link.md) | [`2348:22277`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2348-22277) |
| `sh-toast` | 5 | 5 | [sh-toast/sh-toast.md](sh-toast/sh-toast.md) | [`2718:41602`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2718-41602) |
| `sh-toggle` | 10 | 2 | [sh-toggle/sh-toggle.md](sh-toggle/sh-toggle.md) | [`2496:22571`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-22571) |
| `sh-tooltip` | 8 | 5 | [sh-tooltip/sh-tooltip.md](sh-tooltip/sh-tooltip.md) | [`2712:13106`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13106) |

## Navigation, payment, account (migration, not yet core)

| Component | Variants | Properties | Blueprint | Figma |
|---|---|---|---|---|
| `sh-account-header` | 1 | 4 | [account/sh-account-header/sh-account-header.md](account/sh-account-header/sh-account-header.md) | [`2712:13717`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13717) |
| `sh-addon-card` | 2 | 4 | [account/sh-addon-card/sh-addon-card.md](account/sh-addon-card/sh-addon-card.md) | [`2712:13683`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13683) |
| `sh-brand-footer` | 1 | 2 | [account/sh-brand-footer/sh-brand-footer.md](account/sh-brand-footer/sh-brand-footer.md) | [`2712:13754`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13754) |
| `sh-location-bar` | 1 | 3 | [account/sh-location-bar/sh-location-bar.md](account/sh-location-bar/sh-location-bar.md) | [`2712:13770`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13770) |
| `sh-map-background` | 1 | 0 | [account/sh-map-background/sh-map-background.md](account/sh-map-background/sh-map-background.md) | [`2715:10572`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2715-10572) |
| `sh-map-pin` | 2 | 1 | [account/sh-map-pin/sh-map-pin.md](account/sh-map-pin/sh-map-pin.md) | [`2712:13798`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13798) |
| `sh-membership-card` | 2 | 4 | [account/sh-membership-card/sh-membership-card.md](account/sh-membership-card/sh-membership-card.md) | [`2712:13716`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2712-13716) |
| `sh-plan-card` | 14 | 8 | [account/sh-plan-card/sh-plan-card.md](account/sh-plan-card/sh-plan-card.md) | [`2710:28466`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2710-28466) |

## Full profile view (migration, not yet core)

| Component | Variants | Properties | Blueprint | Figma |
|---|---|---|---|---|
| `sh-fpv-album-view` | 2 | 1 | [fpv/sh-fpv-album-view/sh-fpv-album-view.md](fpv/sh-fpv-album-view/sh-fpv-album-view.md) | [`2597:20812`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-20812) |
| `sh-fpv-compatibility` | 2 | 1 | [fpv/sh-fpv-compatibility/sh-fpv-compatibility.md](fpv/sh-fpv-compatibility/sh-fpv-compatibility.md) | [`2597:20704`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-20704) |
| `sh-fpv-footer` | 6 | 1 | [fpv/sh-fpv-footer/sh-fpv-footer.md](fpv/sh-fpv-footer/sh-fpv-footer.md) | [`2597:22556`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-22556) |
| `sh-fpv-header` | 1 | 6 | [fpv/sh-fpv-header/sh-fpv-header.md](fpv/sh-fpv-header/sh-fpv-header.md) | [`2597:22909`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-22909) |
| `sh-fpv-inbox` | 1 | 0 | [fpv/sh-fpv-inbox/sh-fpv-inbox.md](fpv/sh-fpv-inbox/sh-fpv-inbox.md) | [`2597:22419`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-22419) |
| `sh-fpv-photo-area` | 3 | 1 | [fpv/sh-fpv-photo-area/sh-fpv-photo-area.md](fpv/sh-fpv-photo-area/sh-fpv-photo-area.md) | [`2638:60771`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2638-60771) |
| `sh-fpv-photo-break` | 1 | 0 | [fpv/sh-fpv-photo-break/sh-fpv-photo-break.md](fpv/sh-fpv-photo-break/sh-fpv-photo-break.md) | [`2597:19901`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-19901) |
| `sh-fpv-photo-stack` | 6 | 1 | [fpv/sh-fpv-photo-stack/sh-fpv-photo-stack.md](fpv/sh-fpv-photo-stack/sh-fpv-photo-stack.md) | [`2606:30576`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2606-30576) |
| `sh-fpv-sticky-header` | 2 | 1 | [fpv/sh-fpv-sticky-header/sh-fpv-sticky-header.md](fpv/sh-fpv-sticky-header/sh-fpv-sticky-header.md) | [`2597:19905`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2597-19905) |

## Profile card (migration, not yet core)

| Component | Variants | Properties | Blueprint | Figma |
|---|---|---|---|---|
| `sh-action-island` | 2 | 2 | [profile-card/sh-action-island/sh-action-island.md](profile-card/sh-action-island/sh-action-island.md) | [`2594:16928`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16928) |
| `sh-action-note` | 4 | 5 | [profile-card/sh-action-note/sh-action-note.md](profile-card/sh-action-note/sh-action-note.md) | [`2594:16750`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16750) |
| `sh-action-row` | 6 | 3 | [profile-card/sh-action-row/sh-action-row.md](profile-card/sh-action-row/sh-action-row.md) | [`2594:16861`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2594-16861) |
| `sh-avatar-placeholder` | 4 | 2 | [profile-card/sh-avatar-placeholder/sh-avatar-placeholder.md](profile-card/sh-avatar-placeholder/sh-avatar-placeholder.md) | [`2239:13257`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2239-13257) |
| `sh-info-detail` | 4 | 4 | [profile-card/sh-info-detail/sh-info-detail.md](profile-card/sh-info-detail/sh-info-detail.md) | [`2825:43215`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2825-43215) |
| `sh-mini-card` | 2 | 9 | [profile-card/sh-mini-card/sh-mini-card.md](profile-card/sh-mini-card/sh-mini-card.md) | [`2780:68360`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2780-68360) |
| `sh-profile-card` | 8 | 3 | [profile-card/sh-profile-card/sh-profile-card.md](profile-card/sh-profile-card/sh-profile-card.md) | [`2579:25592`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2579-25592) |
| `sh-profile-card-info` | 1 | 14 | [profile-card/sh-profile-card-info/sh-profile-card-info.md](profile-card/sh-profile-card-info/sh-profile-card-info.md) | [`2496:27797`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2496-27797) |
| `sh-tag-profile` | 6 | 1 | [profile-card/sh-tag-profile/sh-tag-profile.md](profile-card/sh-tag-profile/sh-tag-profile.md) | [`2813:41954`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2813-41954) |
| `sh-user-images` | 26 | 2 | [profile-card/sh-user-images/sh-user-images.md](profile-card/sh-user-images/sh-user-images.md) | [`2248:13619`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=2248-13619) |

## Utility

| Component | Variants | Properties | Blueprint | Figma |
|---|---|---|---|---|
| `sh-navigation-dashboard/primary-item` | 5 | 4 | [utility/sh-navigation-dashboard-primary-item/sh-navigation-dashboard-primary-item.md](utility/sh-navigation-dashboard-primary-item/sh-navigation-dashboard-primary-item.md) | [`436:6142`](https://www.figma.com/design/l1SuD1Q1l8QXGvtomszGYW/Shaadi-DNA?node-id=436-6142) |

## Icons

[icons.md](icons.md) — the icon map; SVGs in `../icons/`.
