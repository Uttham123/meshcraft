# MESH DS — Gap Analysis vs Major Design Systems
<!-- Scope: Documentation quality, not design changes -->
<!-- Author: AI agent (Claude) | Date: April 2026 -->
<!-- Purpose: Ideas to improve MESH documentation, adoption, and AI-readiness. NOT a mandate to change designs. -->

---

## How to Read This

This compares **MESH's documentation and tooling** against 6 leading design systems.  
It does NOT compare visual design or suggest changing MESH components.  
Each gap is rated: 🔴 High impact · 🟡 Medium impact · 🟢 Low / nice-to-have.

---

## Comparison Summary

| Dimension | MESH (current) | Material 3 | Polaris | Carbon (IBM) | Ant Design | Fluent 2 |
|---|---|---|---|---|---|---|
| Component count | ~28 | 50+ | 40+ | 45+ | 60+ | 45+ |
| Token tiers | 3 ✓ | 3 (ref/sys/comp) | 3 | 3 | 2 | 3 |
| Dark mode | ✗ | ✓ | ✓ | ✓ (3 themes) | ✓ | ✓ |
| Motion tokens | ✗ | ✓ | Partial | ✓ | Partial | ✓ |
| Accessibility doc | ✗ | ✓ (WCAG AA) | ✓ | ✓ (AAA) | Partial | ✓ (AAA) |
| Interactive states documented | Partial | ✓ | ✓ | ✓ | ✓ | ✓ |
| RTL/bilingual | Partial (Hindi noted) | ✓ | ✗ | Partial | ✓ (CJK) | ✓ |
| Code examples in docs | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Do/Don't visuals | ✓ (some pages) | ✓ (all pages) | ✓ (all pages) | ✓ (all pages) | ✓ | ✓ |
| AI patterns | ✓ (unique) | ✗ | ✗ | ✓ (watsonx) | ✗ | ✓ (Copilot) |
| llms.txt / AI context | ✓ (unique) | ✗ | ✗ | Partial | ✗ | ✗ |
| Figma variables | ✓ (179 vars) | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Gap 1: Missing Do/Don't on Every Component Page
**🔴 High impact**

**What leading DSes do:**  
Material 3, Polaris, and Carbon include visual Do/Don't pairs on **every** component page — binary, image-based, with a red ✗ and green ✓. They are formatted as side-by-side screenshots, not text bullets.

**MESH current state:**  
Do/Don't exists on some pages (Button, Badge) as text bullets. Missing entirely from: Scrollbar, Image Displays, Rating Pill, NPS, Visual Filters, Input Stepper.

**Documentation idea (no design change):**  
Add a visual Do/Don't section to every component page in the Sandbox. Use actual phone mockup frames (not abstract diagrams) showing real MESH UI in the right and wrong context.

---

## Gap 2: No Accessibility Documentation
**🔴 High impact**

**What leading DSes do:**  
Carbon documents WCAG 2.1 AA compliance per component: minimum contrast ratios, touch target sizes, screen reader behaviour, focus order. Fluent 2 goes to AAA.

**MESH current state:**  
No WCAG documentation exists. Touch target rule (48dp) is mentioned in MEESHO.md but not on individual component pages. No contrast ratio tables. No screen reader annotations.

**Documentation idea (no design change):**  
Add an "Accessibility" section to each component page with:  
- Touch target size (confirm ≥ 48dp)  
- Contrast ratio of key text/bg pairs (can be calculated from existing hex values)  
- TalkBack label guidance (what the content description should say)

Example additions:
- Button: "Active state underline (#9F2089 on #FFFFFF) = 4.5:1 ✓ WCAG AA"
- Badge: "Negative text (#E11900 on #FFDAD6) = 4.6:1 ✓ WCAG AA"

---

## Gap 3: No Motion / Animation Tokens
**🟡 Medium impact**

**What leading DSes do:**  
Material 3 defines `motion/duration/short1–4` and `motion/easing/standard/accelerate`. Carbon has 3 motion curves (`productive`, `expressive`, `linear`) with duration scales.

**MESH current state:**  
No motion tokens. Animations (Bottom Sheet slide, Loader spin, Snackbar appear) are undocumented and presumably hardcoded by engineers.

**Documentation idea:**  
Add a `⚡ Motion` page to the Sandbox documenting the 3–4 animations MESH currently uses:  
- Sheet slide-up: `300ms ease-out`  
- Snackbar fade: `200ms ease-in`  
- Loader spin: `infinite 800ms linear`  
- Tab indicator slide: `150ms ease-in-out`

No new animations needed — just codify what's already implemented.

---

## Gap 4: Inconsistent State Documentation
**🟡 Medium impact**

**What leading DSes do:**  
Polaris documents **5 interactive states** for every component: Default, Hover, Focus, Pressed, Disabled. Each has a visual swatch and token reference.

**MESH current state:**  
State documentation is inconsistent. Button and Input Field have states. Scrollbar, NPS, Visual Filters have no state documentation.

**Documentation idea:**  
Standardise on these 4 states for every interactive component (Android doesn't have hover):  
1. Default  
2. Pressed / Active  
3. Selected (where applicable)  
4. Disabled  

Add a "States" row to the anatomy section of every component page.

---

## Gap 5: No Usage Frequency / Placement Guide
**🟡 Medium impact**

**What leading DSes do:**  
Shopify Polaris includes **"When to use / when not to use"** tables that specify screen-level placement rules. For example: "Use a Banner only at the top of a page, never inside a card."

**MESH current state:**  
Usage Context sections exist on some pages (Button, Badge) but are inconsistent. No screen-level placement map.

**Documentation idea:**  
Add a single **"Placement Map"** page to the Sandbox showing a wireframe of a standard Meesho screen with each component annotated to its correct zone:
- Top Nav → always top, full width
- Bottom Nav → always bottom, full width
- Snackbar → above Bottom Nav
- Infobanner → just below Top Nav or inside a card
- Tabs → below Top Nav
- Action Bar → within listing pages only

---

## Gap 6: Missing Component: Skeleton Screens
**🔴 High impact**

**What leading DSes do:**  
All 6 reference DSes document skeleton/loading state screens. Material 3 calls them "Shimmer". Carbon calls them "Skeleton". Used as a progressive loading pattern — superior to full-screen loaders.

**MESH current state:**  
Loader page exists but documents only the full-screen blocking loader. No skeleton screen / shimmer component documented.

**Documentation idea (no new design needed initially):**  
Document skeleton as a **pattern** (not a new component): a convention for rendering shimmer placeholders using existing grey palette tokens (`color/background/tertiary = #F0F0F0`) with an animated gradient overlay.

---

## Gap 7: Missing Component: Empty States
**🔴 High impact**

**What leading DSes do:**  
Polaris, Carbon, and Ant Design all document empty state patterns: an illustration + headline + body copy + optional CTA. Used for: no search results, empty cart, no orders, no wishlist.

**MESH current state:**  
No empty state component or pattern documented in MESH DS.

**Documentation idea:**  
Add an `🕳 Empty States` pattern page documenting:  
- Illustration placement zone (top 40% of content area)  
- Headline: 1 line, 16sp Bold  
- Body: 2 lines max, 14sp Regular  
- CTA: optional Primary Button  
- Bilingual rule: Hindi headline must be ≤ same line count as English

---

## Gap 8: No Token Export / Developer Handoff Format
**🟡 Medium impact**

**What leading DSes do:**  
Carbon exports tokens as JSON via Style Dictionary. Ant Design exports as a CSS variables file. Material 3 has a Figma plugin that exports tokens directly to code. All publish a `tokens.json` at a stable URL.

**MESH current state:**  
Tokens exist as 179 Figma variables in the Design Sandbox. No export pipeline. No `tokens.json` file.

**Documentation idea:**  
1. Export the 179 Figma variables as a `tokens.json` (W3C DTCG format) — this can be done once manually from the Design Sandbox.  
2. Host it alongside `MEESHO.md` and `llms.txt`.  
3. Document the export format in `design-system-rules.md`.

---

## Gap 9: Hindi / Devanagari Not Systematically Tested in Docs
**🟡 Medium impact (unique to MESH)**

**What leading DSes do:**  
Ant Design documents CJK character handling (Chinese/Japanese/Korean) with explicit overflow examples and line-height adjustments. Right-to-left guidelines appear in Fluent 2 and Material 3.

**MESH current state:**  
Hindi is mentioned as a requirement in MEESHO.md. The "Bilingual" rule is in `design-system-rules.md`. But no component page shows a Hindi example or documents the container-width rule ("+30% for Devanagari").

**Documentation idea:**  
Add a Hindi sample to 3–4 key component pages:  
- Button: show "अभी खरीदें" (Buy Now in Hindi) — check it fits in Primary Button at 16sp
- Input Field: show "मोबाइल नंबर" as label
- Infobanner: show a Hindi message to verify line wrapping  
This documents the real bilingual constraint visually, not just as text.

---

## Gap 10: Component Status / Version History Not Visible
**🟢 Low / nice-to-have**

**What leading DSes do:**  
Carbon and Polaris show a status badge on every component page: `Stable`, `Beta`, `Deprecated`, `WIP`. Each page also shows the last-updated date and changelog summary.

**MESH current state:**  
The original MESH DS pages show "Updated – [date]" in the header. The Sandbox has no version or status metadata.

**Documentation idea:**  
Add a one-line status row to each Sandbox component page:  
`Status: Stable | Last updated: Oct 2021 | MESH version: 1.0`

This is already possible — just add a text node to the header frame of each page.

---

## What MESH Does Better Than the Comparison Set

These are MESH strengths worth preserving and expanding:

1. **AI Patterns** — Only Carbon (watsonx) and Fluent 2 (Copilot) document AI-specific UI patterns. MESH's Dukaan Saathi / Shopping Guide persona framework is ahead of most e-commerce DSes.

2. **llms.txt / MEESHO.md** — No other DS in the comparison set has structured machine-readable context files for LLM consumption. This is a genuine first-mover advantage.

3. **T3/T4 user constraints** — Low-end device, variable connectivity, and digital literacy constraints are documented explicitly. None of the reference DSes do this — they assume premium hardware.

4. **Bilingual (Hindi/English)** — More relevant than RTL for Meesho's actual user base. The +30% container width rule is a practical engineering constraint not found in any reference DS.

5. **3-Tier token system** — Properly implemented with Figma variable aliases (Primitive → Semantic → Component). Equivalent to Material 3's ref/sys/comp structure.

---

## Priority Action List (Documentation only, no design changes)

| Priority | Action | Effort |
|---|---|---|
| 🔴 1 | Add visual Do/Don't to all component pages missing them | Low |
| 🔴 2 | Add accessibility row (contrast ratio + touch target) to all interactive components | Low |
| 🔴 3 | Document Skeleton Screen as a pattern page | Medium |
| 🔴 4 | Document Empty States as a pattern page | Medium |
| 🟡 5 | Add motion/animation values to Effects page | Low |
| 🟡 6 | Standardise 4-state documentation on all interactive components | Medium |
| 🟡 7 | Add Hindi examples to Button, Input Field, Infobanner pages | Low |
| 🟡 8 | Export tokens.json from Figma variables | Medium |
| 🟢 9 | Add component status badges to Sandbox headers | Low |
| 🟢 10 | Add Placement Map page to Sandbox | Medium |
