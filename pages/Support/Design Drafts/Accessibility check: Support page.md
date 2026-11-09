# Accessibility check: Support page

Checked against WCAG 2 AA: 4.5:1 for normal text, 3:1 for large text and graphics or UI components.
Ratios calculated from the exact hex codes in the designs. To use this as evidence, also run the key pairs through https://webaim.org/resources/contrastchecker/ and screenshot the results (save in `evidence/screenshots/`).

## Light mode

| Pair | Colours | Ratio | Needed | Result |
|---|---|---|---|---|
| Main text on page background | `#3B565F` on `#FDF9F8` | 7.5:1 | 4.5:1 | Pass |
| Main text on cards | `#3B565F` on `#FFFFFF` | 7.8:1 | 4.5:1 | Pass |
| Main text on hero tint | `#3B565F` on `#FBEEF2` | 6.9:1 | 4.5:1 | Pass |
| Main text on section tint | `#3B565F` on `#F2EBF1` | 6.7:1 | 4.5:1 | Pass |
| Text links on page background | `#3F7077` on `#FDF9F8` | 5.3:1 | 4.5:1 | Pass |
| Primary button text | `#1A2A30` on `#6A9FA6` | 5.0:1 | 4.5:1 | Pass |
| Secondary button / quote box text | `#1F3036` on `#DCA5C4` | 6.7:1 | 4.5:1 | Pass |
| Footer text | `#FFFFFF` on `#3B565F` | 7.8:1 | 4.5:1 | Pass |
| Progress bar fill vs track (graphic) | `#3F7077` on `#FBEEF2` | 4.9:1 | 3:1 | Pass |
| Primary button fill vs page background (graphic) | `#6A9FA6` on `#FDF9F8` | 2.8:1 | 3:1 | Fail |

## Dark mode

| Pair | Colours | Ratio | Needed | Result |
|---|---|---|---|---|
| Main text on page background | `#F3ECEF` on `#12191C` | 15.3:1 | 4.5:1 | Pass |
| Main text on cards | `#F3ECEF` on `#1B262B` | 13.3:1 | 4.5:1 | Pass |
| Main text on hero tint | `#F3ECEF` on `#282A2F` | 12.3:1 | 4.5:1 | Pass |
| Main text on section tint | `#F3ECEF` on `#292B34` | 12.1:1 | 4.5:1 | Pass |
| Secondary text on page background | `#B9C9CD` on `#12191C` | 10.4:1 | 4.5:1 | Pass |
| Secondary text on cards | `#B9C9CD` on `#1B262B` | 9.1:1 | 4.5:1 | Pass |
| Text links on page background | `#8CC3CA` on `#12191C` | 9.1:1 | 4.5:1 | Pass |
| Primary button text | `#10191C` on `#6A9FA6` | 6.0:1 | 4.5:1 | Pass |
| Secondary button / quote box text | `#1F1A22` on `#DCA5C4` | 8.3:1 | 4.5:1 | Pass |
| Footer text | `#F3ECEF` on `#0C1215` | 16.2:1 | 4.5:1 | Pass |
| Progress bar fill vs track (graphic) | `#6A9FA6` on `#282A2F` | 4.9:1 | 3:1 | Pass |
| Primary button fill vs page background (graphic) | `#6A9FA6` on `#12191C` | 6.0:1 | 3:1 | Pass |

## Findings

- All text pairs pass in both modes.
- The teal button fill (`#6A9FA6`) against the pale page background is below 3:1 in light mode. The button is identified by its label, so this is advisory only, but it is why button text is dark and why a 2px outline or a stronger shape can be added if a reviewer wants it.
- Links use the darker teal `#3F7077` in light mode because `#6A9FA6` on the pale background is only 2.8:1.

## Manual checks (from the design files)

| Check | Result | Note |
|---|---|---|
| Every image has alt text | Pass | Hero, team and figures photos all have descriptions |
| Body text is at least 16px | Mostly pass | Body and card text are 16px or more. Footer small print is 14px and the phone logo name is 15px |
| Phone buttons are large enough to tap | Pass | Buttons are at least 52px tall and full width |
| Colour is not the only signal | Pass | Links keep underlines in the navigation, buttons carry labels |
| Heading order | Pass | One H1, then H2 sections |
| Keyboard use | Not tested | Needs a real build to test |
| Screen reader | Not tested | Needs a real build to test |

## To do
- [ ] Run the key pairs through the WebAIM checker and screenshot
- [ ] Decide whether to raise footer small print to 16px
- [ ] Test keyboard and screen reader use once the page is built