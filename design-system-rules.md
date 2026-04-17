# MESH Design System — Rules for AI Tools
# Read this file when generating, auditing, or modifying MESH UI designs in Figma.
# Version 2.0 | April 2026

## How to Work With This Design System

### Step 1 — Always read context first
Before generating any component or layout, read `llms.txt` for the token quick reference.
Before working on a specific component, check `components.json` for its variant matrix and anatomy.
Before making any Figma changes, verify the token exists in the Design Sandbox Variables.

### Step 2 — Token usage rules
- ALWAYS reference Tier 3 (component tokens) when specifying component properties.
- ALWAYS reference Tier 2 (semantic tokens) when specifying layout-level colors (backgrounds, content, borders).
- NEVER use Tier 1 (primitive tokens) directly in any component or layout spec.
- NEVER hardcode a hex color value — every color must trace back to a named token.

### Step 3 — Component generation rules
When asked to create a new screen or component:
1. Check `components.json` to find the correct component(s) to use.
2. Verify the variant combination is valid (e.g. `Button/primary/large` is valid; `Button/primary/xlarge` is not).
3. Apply the correct component tokens from the token table.
4. Enforce the touch target minimum of 48dp on all interactive elements.
5. Do not invent new component variants — flag the gap to the designer instead.

### Step 4 — Documentation rules
When asked to document a component, follow this exact section order:
1. Overview (1 sentence)
2. Anatomy (numbered slots matching prop names)
3. Variants (exhaustive valid combinations table)
4. Token Specs (element → component token → semantic token → value)
5. Do / Don't (binary rules, one sentence each)
6. Usage Context (this vs. similar component)
7. States (visual examples)
8. T3/T4 Constraints (touch target, bilingual, contrast)

---

## Design Audit Rules (for linting)
Run these checks on any Figma frame before flagging it as production-ready:

### Color Audit
- [ ] No hardcoded hex values — all fills reference a named variable
- [ ] Background colors use `color/background/*` tokens only
- [ ] Text colors use `color/content/*` tokens only
- [ ] Brand purple (#9F2089) only on interactive elements (buttons, active states, links)
- [ ] AI surfaces use `color/ai/*` tokens exclusively — never brand purple

### Typography Audit
- [ ] All text nodes use a named text style from the type scale
- [ ] No text below Caption3 (10px) except legal disclaimers
- [ ] H1 only used for page-level titles (max 1 per screen)
- [ ] No font other than Mier B02 or Noto Sans Devanagari UI

### Spacing Audit
- [ ] All spacing values are multiples of 4px
- [ ] All interactive elements have minimum 48dp touch target
- [ ] Padding inside components follows component token values

### Component Audit
- [ ] No invented variants — all variants exist in components.json
- [ ] No two Primary buttons on the same screen
- [ ] Disabled states use disabled token colors, not opacity reduction
- [ ] AI-generated content surfaces display the AI Indicator component

### Bilingual Audit
- [ ] All text containers have sufficient horizontal space for Hindi (30% wider than English)
- [ ] No fixed-width text containers for user-generated content

---

## AI Feature Rules (new — April 2026)

### When adding an AI feature to any screen:
1. Declare which AI persona serves this surface: **Dukaan Saathi** (seller) or **Shopping Guide** (buyer).
2. Add the AI Indicator component to every AI-influenced content area.
3. Add an Explainability Card with: What the AI did + Why + How to give feedback.
4. For seller surfaces: implement Verify-then-Publish flow (AI suggests, human approves).
5. For buyer surfaces: implement Inform-then-Decide flow (AI informs, human chooses).
6. Map the harm scenario: what happens if the AI is wrong? Implement the corresponding UI mitigation.

### AI color rules (non-negotiable):
- AI surface background: `color/ai/surface` = #E7EEFF
- AI surface border: `color/ai/border` = #5585F8
- AI icon/text: `color/ai/icon` = #5585F8
- NEVER use brand purple (#9F2089) on AI surfaces
- NEVER use AI blue (#5585F8) for brand CTAs or interactive elements

---

## Naming Convention Reference
All names must be identical across Figma layers, tokens, and (future) code:

| Level | Format | Example |
|-------|--------|---------|
| Figma component | `ComponentName/Variant/Size` | `Button/Primary/Large` |
| Figma layer | `component-name--variant` | `button--primary` |
| Tier 3 token | `component/element/state` | `button/primary/background/default` |
| Tier 2 token | `category/concept/variant` | `color/interactive/primary` |
| Tier 1 token | `category/scale/step` | `color/jamun/base` |

---

## What to Do When Something Is Missing
- Missing component variant → Flag to designer. Do not create unofficial variants.
- Missing token → Flag to token maintainer. Do not hardcode values.
- Missing component entirely → Check if it exists in the MESH Documentation Figma file first. If not, propose it as a new component with full documentation structure.
- Ambiguous naming → Refer to `components.json` for canonical names.

---
*MESH Design System · Meesho · April 2026*
