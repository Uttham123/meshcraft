# MEESHO Design System — Machine-Readable Index
<!-- Version: 2.1 | April 2026 | Browsing Experience Team -->
<!-- This file is the primary context file for AI agents working with the MESH Design System. Read this before any other file. -->

## What This Is
MESH is the Meesho Design System. It governs UI across the Meesho Android app (primary platform) for 140M+ users — buyer-facing (shopping) and seller-facing (listing, inventory) surfaces.

## Platform Constraints
- **Primary platform:** Android (mobile-first)
- **Minimum touch target:** 48dp × 48dp
- **Grid:** 4px baseline grid, no column/gutter system (margin only)
- **User base:** T3/T4 users — low-end devices, variable connectivity, mixed digital literacy
- **Languages:** English + Hindi (Devanagari script). All UI must support bilingual rendering.
- **Font:** Mier B02 (Book / Demi / Bold) for Latin; Noto Sans Devanagari UI for Hindi

## Figma Files
- **MESH Documentation (source of truth):** https://www.figma.com/design/6rNoOl7gVBz66geQEJpmeh/MESH-Documentation
- **MESH Design Sandbox (tokens + component library):** https://www.figma.com/design/u6xWbRPNRJgem7EwDrKfqr/MESH-Design-Sandbox

## Token Architecture (3-Tier)
All tokens follow the W3C DTCG naming format: `[category].[concept].[variant].[state]`

```
Tier 1 — Primitives    Raw values. Never referenced directly in components.
                       Example: color/jamun/base = #9F2089

Tier 2 — Semantic      Assigns meaning to primitives.
                       Example: color/interactive/primary → color/jamun/base

Tier 3 — Component     Scoped to one component. Maps to a semantic token.
                       Example: button/primary/background/default → color/interactive/primary
```

## Color System Summary
```
Brand:      #9F2089 (Jamun/Purple) — primary CTAs, active states, brand indicators
Gray scale: #333333 → #F9F9F9 — content, backgrounds, borders
Blue:       #5585F8 — highlight, info, links
Green:      #038D63 — success
Yellow:     #F4B619 — warning (soft)
Orange:     #EE7212 — warning (strong)
Red:        #E11900 — error, destructive actions
AI Surface: #E7EEFF border #5585F8 — RESERVED for AI-generated content ONLY
```

**AI Rule:** Never repurpose brand colors (#9F2089) for AI surface indicators.
Never use AI surface colors (blue family) for brand CTAs. These must stay visually distinct.

## Typography Scale
Font: Mier B02 (Bold/Demi/Book) + Noto Sans Devanagari UI

| Token       | Size | Weight | Line Height | Use |
|-------------|------|--------|-------------|-----|
| H1          | 35px | Bold   | 40px        | Page titles |
| H2          | 29px | Bold   | 36px        | Section headers |
| H3          | 25px | Bold   | 28px        | Card headers |
| H4          | 21px | Bold   | 24px        | Sub-section headers |
| H5          | 19px | Bold   | 24px        | Component labels |
| H6          | 17px | Bold   | 24px        | Small labels |
| Body1       | 15px | Book   | 20px        | Primary body copy |
| Body2       | 13px | Book   | 20px        | Secondary body copy |
| Body3       | 11px | Book   | 16px        | Tertiary/helper text |
| Subtitle1   | 15px | Demi   | 20px        | Emphasized body |
| Subtitle2   | 13px | Demi   | 20px        | Card subtitles |
| Caption1    | 12px | Book   | 16px        | Labels, tags |
| Caption2    | 11px | Book   | 16px        | Metadata |
| Caption3    | 10px | Book   | 12px        | Smallest visible text |
| Button/Lg   | 17px | Demi   | 24px        | Primary CTA labels |
| Button/Sm   | 13px | Demi   | 20px        | Secondary CTA labels |
| Link        | 13px | Demi   | 20px        | Text links (underlined) |
| Overline    | 11px | Demi   | 16px        | Section labels (uppercase) |

## Spacing & Shape
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 28, 32, 40, 48px (4px multiples)
- **Corner radii:** 4px (buttons, inputs), 8px (cards, images), 16px (pills, chips)
- **Touch targets:** minimum 48dp height/width for all interactive elements

## Component Index
See `components.json` for full structured metadata.

### Atoms (Foundations)
- Colors · Typography · Grid · Icons · Shadows · Corners

### Molecules
| Component | Figma Page ID | Sandbox Page | Key Variants | Notes |
|-----------|--------------|--------------|--------------|-------|
| Badge | 296:6770 | 🏷 Badge | Large, Small, Custom · 6 colors: Neutral/Positive/Negative/Highlight/Yellow/Orange | Non-interactive. Use Pill for tappable chips. |
| Button | 265:3255 | 🔘 Button | Primary, Secondary-Grey, Secondary-Jamun, Tertiary-Link, Icon · Large/Medium/Small | Max 1 Primary per screen. |
| Divider | 269:12977 | ➖ Divider | End-to-End, Inset, With Label, Dotted | Always horizontal. 1px height. |
| Dropdown | 358:6333 | ▼ Dropdown | With icon, Without icon · States: Resting/Filled/Active | Opens Bottom Sheet on tap. Same underline as Input Field. |
| Image Displays | 370:12698 | 🖼 Image Displays | Circle (8 sizes), Square (8 sizes), Text/Initials (6 sizes) | Circle = user avatars; Square = product thumbnails; Text = fallback initials. |
| Infobanners | 490:9839 | 💬 Infobanners | Big, Small, Big-Inset, Small-Inset · Neutral/Positive/Error/Warning/Highlight | Max 1 per screen. Persistent — not auto-dismissed. |
| Input Field | 350:5040 | 🔲 Input Field | No add-ons, Supporting Text, CTA, Char Counter, Dropdown, Icon CTA, Scrollbar | Underline style. Min 48dp touch target. |
| Input Stepper | 333:5275 | 🎚 Input Stepper | Default, Active, Min-disabled, Max-reached | − value + pattern. 156×48dp widget. |
| Loader | 477:11383 | ⏳ Loader | With body text, Without body text, Overlay | Full-screen dark overlay + Meesho "m" logo. Show body text if >3s. |
| NPS | 264:4912 | 😊 NPS | 5-point emoji scale · Unselected/Selected | Post-order fulfilment only. 5 emoji cells in row. |
| Pill | 271:15052 | 💊 Pill | Single Select, Multi Select · Default/Selected | Interactive filter chip. Brand fill when selected. |
| Pop-Ups | 471:8299 | 🪟 Pop-Ups | Type 1 (with header), Type 2 (without header) | Always 2 side-by-side CTAs. Dismissible by overlay tap. |
| Progress Bar | 297:8398 | 📊 Progress Bar | Absolute (% fill), Relative (playback) | Track 6px height, brand fill, radius 3. |
| Rating Pill | 269:15127 | ⭐ Rating Pill | 5-star scale, 6 color ranges | Color-coded: green (4.5–5) → red (1–1.9). Non-interactive. |
| Scrollbar | 370:10256 | 📜 Scrollbar | Infinite scroll, Pagination | 3px track, right-edge. Fades when idle. |
| Snackbar | 490:9838 | 🍞 Snackbar | Info/Error/Success/Neutral · With CTA/Without CTA | Auto-dismiss ~3s. Above Bottom Nav. |
| Switch | 297:4027 | 🔄 Switch | Primary (brand), Success (green) · On/Off | 52×28dp track. Immediate action. |
| Visual Filters | 367:6105 | 🎨 Visual Filters | Default, Selected (with checkmark + brand border) | Image tile + label. Category browsing filter. |

### Organisms
| Component | Figma Page ID | Sandbox Page | Key Variants | Notes |
|-----------|--------------|--------------|--------------|-------|
| Action Bar | 520:10935 | ↕ Action Bar | Vertical (left rail), Horizontal (top strip) | Category navigation within listing pages. |
| Bottom Nav | 699:10615 | 📍 Navigation | 4–5 destinations · Filled/Line icon states | Hides on scroll down, reappears on scroll up. |
| Bottom Sheet | 700:47609 | 📋 Bottom Sheet | Size 1 (~30%), Size 2 (~50%), Size 3 (~70%) · 3 header variants | Max 90% screen height. Drag/overlay to dismiss. |
| Tabs | 501:10857 | 📑 Tabs | Vertical (w/icon, w/o icon), Horizontal (w/icon, w/o icon) | Brand underline on active tab. |
| Top Nav | 700:27896 | 📍 Navigation | Home, Back, Back+Link CTA, Back+Primary CTA, Back+Icons | Required on every full-page screen. |
| Video Player | 891:17601 | — | WIP | Not production-ready. Do not reference. |

## AI UI Patterns (New — April 2026)
### AI Indicator Component
Any surface where AI has generated or influenced content MUST display the AI Indicator.
- Background: `color/ai/surface` (#E7EEFF)
- Border: `color/ai/border` (#5585F8)
- Icon: Spark/wand icon in `color/ai/icon`
- Do NOT use the Meesho 'm' logo as the AI indicator

### Two AI Personas
**Dukaan Saathi** (Seller AI)
- Trust model: Verify-then-publish. AI suggests, seller reviews and approves before publishing.
- Tone: Professional, task-oriented, formal Hindi register
- Explainability: High — show What the AI did, Why, with editable correction fields
- Error UI: Block + require correction before content goes live

**Shopping Guide** (Buyer AI)
- Trust model: Inform-then-decide. AI guides, buyer chooses.
- Tone: Warm, simple language, conversational Hindi register
- Explainability: Medium — plain language + single trust action
- Error UI: Caveat + offer alternative path

### Harm Mitigation Rules
1. AI generates incorrect product details → mandatory human review before PDP goes live
2. AI gives wrong refund guidance → escalation path to human support agent
3. AI price recommendations → always show confidence level + edit option for sellers

## Documentation Standard Per Component
Every component MUST be documented with these sections (in this order):
1. **Overview** — one-sentence description + platform context
2. **Anatomy** — numbered slots (1. Container, 2. Label, 3. Icon...) matching prop names
3. **Variants** — exhaustive list of valid variant×state combinations
4. **Tokens** — table of element → component token → semantic token → primitive
5. **Do / Don't** — binary rules, one sentence each, no vague suggestions
6. **Usage Context** — when to use THIS vs. a similar component
7. **States** — all interactive states with visual examples
8. **T3/T4 Constraints** — touch target compliance, low-connectivity behaviour
9. **A11y** — WCAG criteria, minimum contrast ratios, ARIA roles (future)

## Naming Conventions
All names must be identical across Figma, documentation, and (future) code:
- Figma component: `Button/Primary/Large`
- Token: `button/primary/background/default`
- Future code prop: `variant="primary" size="large"`

## What NOT to Do (AI Guardrails)
- Never use primitive tokens directly in component specs (always go through semantic)
- Never apply `color/brand/*` to AI-generated surfaces
- Never apply `color/ai/*` to non-AI surfaces
- Never create a new button variant without documenting all 3 states (default, pressed, disabled)
- Never set touch targets below 48dp for interactive elements
- Never use color alone to convey meaning (always pair with icon or text)
- Never stack two Primary buttons on the same screen
- Never use Headline1/H1 for anything below page-level titles

---
## Gap Analysis Reference
See `gap-analysis.md` for full documentation quality comparison vs Material 3, Polaris, Carbon, Ant Design, Fluent 2.

**Top documentation gaps (no design changes needed):**
1. 🔴 Add visual Do/Don't to all component pages
2. 🔴 Add accessibility row (contrast ratio + 48dp touch target) per component
3. 🔴 Document Skeleton Screen pattern
4. 🔴 Document Empty States pattern
5. 🟡 Add motion/animation token values
6. 🟡 Standardise 4-state docs (Default, Pressed, Selected, Disabled) on all interactive components
7. 🟡 Export tokens.json from Figma variables

---
*Last updated: April 2026 · Meesho Browsing Experience Team*
