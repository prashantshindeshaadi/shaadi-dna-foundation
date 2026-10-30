
## Later: self-unlock (tit-for-tat) cards drop the card box
New look, from the Education & Career mock-up. It applies wherever this "locked, add yours / connect to see" card is used:
- **No box:** no outline, shadow or rounded card. The section's real content shows blurred (`background/blur/soft`, 8) and fades into the page: clear at the top, `background/default` from 60% down. The reason and the Tertiary CTA sit on the solid part.
- **Changed:**
  - `sh-fpv-tit-for-tat-card` main. All 23 uses update with it: Lifestyle, Education & Career, Family, Contact, and Astro (She hasn't added / You haven't added / Neither / Request sent).
  - The hand-built locked cards in `sh-fpv-photo-break`: Accept gated, Upgrade gated, Tit for tat.
  - `sh-fpv-photo-album`: all 15 gated variants (Accept / Upgrade / Tit for tat × overflow). The album's photo blur now sits on the photos themselves instead of on the overlay.
  - The overlay fade colour was bound to a library variable from another file. It's now local `background/default`.
- **Kept for now:** the art circle. It will be replaced by a unique graphic per section type later.
- Fix: the blurred sample is the whole section, so its own title (e.g. "Astro Compatibility") showed blurred under the real title. That title is now hidden inside the blurred sample, in the main and in all 23 uses, so only the section's content blurs.

## Later: sh-list Type=Match, and contact rows on sh-list
- New part **`sh-list-match`** and wrapper **Type=Match**: icon + name + result, built on Score's own structure (40 tall, not tappable). Result: **Match** (check) · **No match** (cross, name dimmed) · **Points** (e.g. 3 / 3) · **Zero points** (0 / 6, name and points dimmed) · **Locked** (lock, name and icon dimmed).
- **Rule: a score of 0 never dims the icon.** It means "no match", so only the text dims. Also applied to `sh-list-score` State=No match (the pictogram stays full colour).
- Every live `astro/KootaRow` from Daren's pasted sheets (28: 14 Match, 6 No match, 7 Points, 1 Zero points) is now `sh-list` Type=Match, with its name, icon and points kept. Two more pack icons for the North-chart rows: `sh-icon/koota-nadi` (Health), `sh-icon/koota-varna` (Work).
- `sh-list-default`:
  - New **Show title suffix** + **Title suffix**: text right after the title that never truncates.
  - New variant **Leading=None, Trailing=Action, Style=Inline**: no padding, 40 tall; the space around it is the tap area. On this row the title is one line and cuts with "…", so with a suffix the cut lands before it.
- Phone-number sheet (4 states, 3 copies, loose frame): the phone + SMS and email + Email rows are now `sh-list` Inline · Action. The email shows "sb4_8SH123…@emaillocker.com": Title = the part before @, Title suffix = "@domain". Where the whole address fits (the wider loose frame), it is one Title with no suffix. The loose frame's old remote `sh-button` is now ours.
- **Developers:** email = two texts in one row: local part (`maxLines 1`, ellipsis) then the domain, never truncated.

## Later: Preference rows expand and collapse
- `sh-list-preference`: the property **Style** is now **Expand**, with values **Off** (short text, no link) · **Collapsed** (subtitle cut at 2 lines + "Read more ⌄") · **Expanded** (full subtitle + "Hide ⌃"). Tapping the link switches between the two.
- The link reads "Read more" (sentence case), per the text-link rule. All 109 uses kept their state; none moved.
- **Developers:** one boolean `expanded`, shown only when the text needs more than 2 lines.
