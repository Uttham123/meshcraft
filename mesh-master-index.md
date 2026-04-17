# MESH Master Index
<!-- Version: 1.0 | April 2026 | Meesho Browsing Experience Team -->
<!-- AI AGENT INSTRUCTIONS: Read this file first on every task. Never use it in isolation — always cross-reference the SoT and DS Figma files via the node IDs listed here. -->

---

## How to Use This File

**When a stakeholder asks for a design change:**
1. Find the relevant screen(s) in **Section 2 (SoT Index)** using the journey/flow name
2. Open that node in the SoT file to read the current design
3. Find the relevant component(s) in **Section 3 (DS Component Index)**
4. Read the component spec in the MESH DS Documentation file
5. Make the change in the **MESH Design Sandbox** file (`u6xWbRPNRJgem7EwDrKfqr`)

**Never:**
- Invent new components or patterns not in the DS
- Use primitive tokens directly (always go Semantic → Component)
- Deviate from the existing screen layout in the SoT without explicit instruction

---

## File Keys (Quick Reference)

| File | Key | Purpose |
|------|-----|---------|
| Design SoT (Apr 24) | `fdR1rJfu0Yszfeb1Em0Hma` | Source of truth for all production screens |
| MESH DS Documentation | `6rNoOl7gVBz66geQEJpmeh` | Component specs, tokens, foundations |
| MESH Design Sandbox | `u6xWbRPNRJgem7EwDrKfqr` | Where new designs are made |

**Figma node URL format:** `https://www.figma.com/design/{fileKey}?node-id={nodeId}`

---

## Section 1 — SoT File Structure (Page Map)

| Page Name | Page Node ID | What's Inside |
|-----------|-------------|---------------|
| 📱 Production Library — 1+ Screens | `11:3598` | All mature production screens (main app journeys) |
| 📱 Production Library — 0-1 Screens | `12:3736` | Newer screens: Checkout flows, New Address, Post-order |
| 🧪 Experimentation Library — 1+ Screens | `12:3965` | Live A/B experiments on 1+ screen flows |
| 🧪 Experimentation Library — 0-1 Screens | `11:3599` | Live A/B experiments on 0-1 screen flows |
| Failed Experiments | `11:3600` | Deprecated/killed experiments — do not reference |
| ⏰ Version History | `12:3683` | Historical design snapshots |
| 👾 Animation Library | `36:4354` | Motion specs and animation frames |
| Component Library — New/Proposed | `11:3601` | Proposed new components not yet in MESH DS |
| Backlog | `12:3682` | Work in progress / parked work |

---

## Section 2 — SoT Screen Index

### 2.1 Homepage
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `152:18152`

| Screen | Node ID | Description |
|--------|---------|-------------|
| Accounts End State | `1152:42729` | Homepage when user is logged in — shows personalised feed, categories, daily deals, reels widget |

**Key UI elements:** Top Nav (search bar + icons), Category pills, Banner carousel, Reels horizontal strip, Bottom Nav

---

### 2.2 Search
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `161:18148`

| Screen | Description |
|--------|-------------|
| Empty / Default Search | Search bar active, no query typed — shows Recent Searches list + Popular Searches chip cloud + "Search using Photo" prompt |
| Active Search (Autocomplete) | Query typed ("red kurti") — shows autocomplete suggestion list with keyword highlighting |

**Key UI elements:** Top Nav (back + search input), Input Field, Pill chips (Popular Searches), Image Displays (photo search CTA), Body1/Body2 text rows

---

### 2.3 Browsing Experience (Category Listing / PLP)
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `161:22572`

| Screen | Description |
|--------|-------------|
| Category PLP | Full category listing page (e.g. Kurti) — sort/filter bar, 2-column product grid, delivery location bar |
| Product Card (grid) | Individual product tile: image, name, price, crossed-out MRP, discount %, delivery info, Rating Pill |
| Rating Pill detail | Color-coded 5-star pills (green 4.5–5, orange 3–4.4, red <3) |
| Ads / Trusted Seller badge | Product cards with "Ad" badge and "Trusted" badge overlay |

**Key UI elements:** Top Nav, Action Bar (sort/category rail), Visual Filters, Product Card (custom), Rating Pill, Bottom Nav, Pill (filter chips), Scrollbar

---

### 2.4 PDP (Product Detail Page)
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `167:21186`

| Screen / State | Description |
|----------------|-------------|
| PDP (main) | Full product detail: image carousel, product name, price, rating, delivery info, size selector, Add to Cart + Buy Now CTAs |
| PDP — Wishlisted | PDP with wishlist heart filled (active) |
| BTM (Buy This More) | Related product recommendations inline in PDP |
| Price Details | Bottom sheet showing price breakdown (MRP, discount, delivery charges, total) |
| Special Offers | Bottom sheet listing available coupon/offer codes |
| Size Chart | Bottom sheet with size measurement table |
| View All Reviews | Full-page reviews list with ratings breakdown, filter chips, review cards |
| Real Media | Full-page user-submitted photos/videos for the product |
| Expanded View | Full-screen image zoom view |
| KU Selection | Size/variant selector overlay (colour + size grid) |
| Share | Native share sheet overlay |
| OCS State | Out of stock state — greyed CTAs, "Notify Me" option |
| BMU State | Buy More Update — quantity/variant update overlay |
| Go to Cart state | PDP after "Add to Cart" — CTA changes to "Go to Cart" |

**Key UI elements:** Top Nav (back + wishlist + share + cart), Image Displays, Button (Primary/Secondary), Rating Pill, Badge, Bottom Sheet (Price Details/Offers/Size Chart/KU), Tabs (Reviews), Input Stepper (quantity), Snackbar ("Added to cart")

---

### 2.5 Transact (Checkout)
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `167:22276`

#### Buy Now Flow
PDP → Address Selection → Payment → Bundling/Upsell → **Order Confirmed**

| Step | Screen | Description |
|------|--------|-------------|
| 1 | Cart Summary | Single item summary before checkout |
| 2 | Address Selection | Saved addresses list + Add New Address CTA |
| 3 | Delivery Confirmation | Confirm delivery address + estimated date |
| 4 | Payment | Payment method selection (UPI/Card/COD) |
| 5 | Bundling/Upsell | "Add more items" cross-sell before placing order |
| 6 | Order Confirmed | ✅ Green full-screen success state — "Order Confirmed!" |
| 7 | Post-order summary | Order details, estimated delivery date, "Continue Shopping" |

#### Add to Cart Flow
Cart → Address → Payment → Bundling → **Order Confirmed** → Empty Cart

| Step | Screen | Description |
|------|--------|-------------|
| 1 | Cart | Multi-item cart page with item list, price total, proceed CTA |
| 2 | Address | Address selection (same as Buy Now) |
| 3 | Payment | Payment selection (same as Buy Now) |
| 4 | Bundling | Cross-sell (same as Buy Now) |
| 5 | Order Confirmed | ✅ Same green success screen |
| 6 | Empty Cart | Cart empty state — illustration + "Shop Now" CTA |

**Key UI elements:** Top Nav, Button (Primary/Secondary), Input Field, Switch, Snackbar, Pop-Ups (payment confirmation), Progress Bar (checkout steps), Infobanner (offers/errors), Loader

---

### 2.6 Reels
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `172:62103`

| Screen | Description |
|--------|-------------|
| Homepage Reels widget | Horizontal strip of reel thumbnails within homepage feed |
| Reels Gallery | Full-screen grid of reel thumbnails |
| Reel Player | Fullscreen vertical video player — swipe-up gesture indicator, mute/close controls |
| Reel with Product Overlay | Playing reel + product card pinned at bottom (price, "Add to Cart", "Buy Now") |
| Reel → PDP | Tap product on reel → PDP modal slides up |
| Reel → Order Confirmed | Reel → PDP → Checkout → Order Confirmed |

**Key UI elements:** Button (Primary/Secondary), Image Displays, Rating Pill, Badge, Top Nav (close + icons)

---

### 2.7 Recommendation
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `172:79615`

| Screen | Description |
|--------|-------------|
| Homepage (logged-in, no recent views) | Homepage with empty "Recently Viewed" section — category horizontal scroll tabs |
| Recently Viewed | Horizontal product card scroll strip |
| Similar Products | Full-page vertical grid of similar product recommendations |

**Key UI elements:** Top Nav, Product Card, Image Displays, Scrollbar, Bottom Nav

---

### 2.8 Gold (Premium Category)
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `167:184386`

| Screen | Description |
|--------|-------------|
| Search Results Page | Gold-branded search results with product images |
| PLP (Product List Page) | Gold category listing — vertical product card list |
| PDP | Gold product detail page — similar to standard PDP with gold-tier badge |
| Checkout & Order | Full checkout flow for Gold products → Order Success screen |

**Key UI elements:** Top Nav, Product Card, Button (Primary), Badge (gold tier), Order Confirmed screen

---

### 2.9 Pre-Delivery (Order Tracking)
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `4437:96825`

| Sub-section | Node ID | Screens |
|-------------|---------|---------|
| Happy Flow | `4437:82427` | Order Placed → Dispatched → Out for Delivery → Delivered — progressive status bar (blue → green) |
| Cancellations | `4437:81926` | Customer-initiated cancel flow, refund confirmation |
| Edge Cases | `4437:82239` | Failed delivery attempt, rescheduled delivery |
| Breach | `4437:83305` | SLA breach — delayed delivery warning state |
| OT 2 States | `4437:83387` | OT2 order tracking variant states |
| Animation Notes | `4437:83023`, `4437:83150` | Animation references for status transitions |

**Key UI elements:** Top Nav, Progress Bar (order stages), Infobanner (delivery updates), Button (Primary/Secondary), Snackbar, Bottom Sheet (cancel confirmation)

---

### 2.10 Post-Delivery / Return
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `4441:77365`

| Sub-section | Node ID | Screens |
|-------------|---------|---------|
| Return Happy States | `4441:60731` | Return initiated → Pickup scheduled → Picked up → Refund initiated → Refund credited |
| Pickup Attempt Failed | `4441:60164` | Pickup agent couldn't collect — reschedule options |
| Cancellations/Failures | `4441:60369` | Return cancelled / failed states |
| Missing Quantity | `4441:62784` | Partial return (missing item in return package) |
| OT2 | `4441:63259` | OT2 variant for return flow |
| Exchange to Return | `4441:63332` | User switches exchange request to return mid-flow |
| Invalid Bank Details | `4441:63473` | Refund blocked — bank details incorrect, update prompt |
| Breach | `4441:63799` | Return SLA breach — escalation state |

**Key UI elements:** Top Nav, Progress Bar (return stages), Infobanner (status/error), Button, Pop-Ups (confirm cancellation), Input Field (bank details), Snackbar

---

### 2.11 Post-Delivery / Exchange
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `7638:98644`

| Sub-section | Node ID | Screens |
|-------------|---------|---------|
| H2H Happy States | `7638:98645` | Hand-to-Hand exchange — agent arrives, simultaneous swap flow |
| Normal Exchange Happy States | `7638:98927` | Standard exchange flow — pickup old, deliver new |
| Pickup Attempt Failed (H2H) | `7638:99347` | H2H exchange pickup failed |
| Pickup Attempt Failed (Normal) | `7638:99476` | Normal exchange pickup failed |
| Cancellations/Failures (H2H) | `7638:99605` | H2H exchange cancelled/failed |
| Cancellations/Failures (Normal) | `7638:99887` | Normal exchange cancelled/failed |
| Return to Exchange | `7638:100172` | User switches return to exchange mid-flow |
| Breach | `7638:100304` | Exchange SLA breach state |

**Key UI elements:** Top Nav, Progress Bar, Infobanner, Button, Pop-Ups, Snackbar

---

### 2.12 Loyalty
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `172:82748`

| Screen | Node ID | Description |
|--------|---------|-------------|
| PDP + Loyalty Widget (Default) | `198:27561` | PDP with Meesho coins offer widget |
| PDP + Loyalty Widget (Variant 2–7) | `198:42928` … `198:62049` | Progressive states of the coins offer (coin flip animation states) |
| Loyalty coin component | `198:65018` | Component set with 4 variants (Default, Variant2, Variant3, Final) |

---

### 2.13 Sale
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `8112:92786`

| Screen | Node ID | Description |
|--------|---------|-------------|
| Sale PLP — Kurti | `12170:121825` | Sale category listing page with promotional banners and discounted product grid |

---

### 2.14 Support
**Page:** Production Library — 1+ Screens (`11:3598`)
**Section Node:** `4443:80814`
*(Content referenced via section — access section node directly in Figma)*

---

### 2.15 Post Order (0-1 Screens Page)
**Page:** Production Library — 0-1 Screens (`12:3736`)
**Section Node:** `4430:64179`

| Screen Group | Description |
|--------------|-------------|
| OLP (Order List Page) | List of all past/active orders — order card with product thumbnail, status badge, action CTAs |
| ODP (Order Detail Page) | Single order detail — item info, delivery address, timeline, return/exchange CTA |
| Return Flow | Initiate return → select reason → confirm pickup → success |
| Exchange Flow | Initiate exchange → select new size/colour → confirm → success |

---

### 2.16 New Address (0-1 Screens Page)
**Page:** Production Library — 0-1 Screens (`12:3736`)
**Frame Node:** `8137:206665`

| Screen | Description |
|--------|-------------|
| New Address Form | Full address entry form — Name, Phone, Pincode, Address Line 1/2, City, State, Address type (Home/Work/Other) |

**Key UI elements:** Top Nav, Input Field (multiple), Dropdown (State), Button (Primary — Save Address)

---

## Section 3 — MESH DS Component Index

### Atoms / Foundations
| Foundation | Figma Page ID (DS Doc) | Notes |
|------------|----------------------|-------|
| Colors | — | Jamun #9F2089, Greys, Blue #5585F8, Green #038D63, Red #E11900, AI surface #E7EEFF |
| Typography | — | Mier B02 (Bold/Demi/Book) + Noto Sans Devanagari UI. 17 tokens (H1–Caption3, Button, Link, Overline) |
| Grid | — | 4px baseline, mobile-first, margin only |
| Icons | — | Custom icon set |
| Shadows | — | Elevation tokens |
| Corners | — | 4px (buttons/inputs), 8px (cards), 16px (pills/chips) |

### Molecules
| Component | DS Doc Page ID | Key Variants | When to Use |
|-----------|---------------|--------------|-------------|
| Badge | `296:6770` | Large/Small · Neutral/Positive/Negative/Highlight/Yellow/Orange | Non-interactive labels (status, count, category tag) |
| Button | `265:3255` | Primary / Secondary-Grey / Secondary-Jamun / Tertiary-Link / Icon · Large/Medium/Small | All CTAs. Max 1 Primary per screen. |
| Divider | `269:12977` | End-to-End / Inset / With Label / Dotted | Section separators. Always horizontal. 1px. |
| Dropdown | `358:6333` | With icon / Without icon · Resting/Filled/Active | Opens Bottom Sheet on tap. Form selectors. |
| Image Displays | `370:12698` | Circle (avatars, 8 sizes) / Square (product thumbnails, 8 sizes) / Text-Initials (fallback, 6 sizes) | All product/user image rendering |
| Infobanners | `490:9839` | Big/Small/Big-Inset/Small-Inset · Neutral/Positive/Error/Warning/Highlight | Persistent contextual messages. Max 1 per screen. |
| Input Field | `350:5040` | No add-ons / Supporting Text / CTA / Char Counter / Dropdown / Icon CTA / Scrollbar | All text input. Underline style. Min 48dp touch target. |
| Input Stepper | `333:5275` | Default / Active / Min-disabled / Max-reached | Quantity selectors only. `−  value  +` pattern. |
| Loader | `477:11383` | With body text / Without body text / Overlay | Full-screen blocking loader. Show body text if >3s. |
| Pill | `271:15052` | Single Select / Multi Select · Default/Selected | Interactive filter chips. Brand fill when selected. |
| Pop-Ups | `471:8299` | Type 1 (with header) / Type 2 (without header) | Confirmation dialogs. Always 2 side-by-side CTAs. |
| Progress Bar | `297:8398` | Absolute (% fill) / Relative (playback) | Order status stages, loading progress. |
| Rating Pill | `269:15127` | 5-star scale, 6 color ranges | Product ratings display. Non-interactive. |
| Scrollbar | `370:10256` | Infinite scroll / Pagination | 3px track, right-edge. Auto-fades when idle. |
| Snackbar | `490:9838` | Info/Error/Success/Neutral · With CTA/Without CTA | Transient feedback. Auto-dismiss ~3s. Above Bottom Nav. |
| Switch | `297:4027` | Primary (brand) / Success (green) · On/Off | Toggle settings. Immediate action. |

### Organisms
| Component | DS Doc Page ID | Key Variants | When to Use |
|-----------|---------------|--------------|-------------|
| Bottom Nav | `699:10615` | 4–5 destinations · Filled/Line icon states | Persistent app navigation. Hides on scroll down. |
| Bottom Sheet | `700:47609` | Size 1 (~30%) / Size 2 (~50%) / Size 3 (~70%) · 3 header variants | Contextual overlays from screen bottom. |
| Tabs | `501:10857` | Vertical (w/icon, w/o icon) / Horizontal (w/icon, w/o icon) | Section switching within a page. Brand underline active. |
| Top Nav | `700:27896` | Home / Back / Back+Link CTA / Back+Primary CTA / Back+Icons | Required on every full-page screen. |

---

## Section 4 — Journey → Component Quick Reference

| Stakeholder asks for... | Look up SoT Section | Key DS Components Needed |
|------------------------|---------------------|--------------------------|
| Homepage change | §2.1 Homepage | Top Nav, Bottom Nav, Badge, Image Displays, Button, Pill |
| Search screen change | §2.2 Search | Top Nav, Input Field, Pill, Image Displays, Body text tokens |
| Listing / PLP change | §2.3 Browsing Experience | Top Nav, Action Bar, Pill, Image Displays, Rating Pill, Badge, Scrollbar, Bottom Nav |
| PDP change | §2.4 PDP | Top Nav, Button, Rating Pill, Badge, Input Stepper, Bottom Sheet, Snackbar, Image Displays, Tabs |
| Checkout / Order flow | §2.5 Transact | Top Nav, Button, Input Field, Dropdown, Switch, Infobanner, Pop-Ups, Loader, Progress Bar, Snackbar |
| Order success / failure state | §2.5 Transact (Buy Now step 6) | Top Nav, Button, Snackbar, Infobanner |
| Reels change | §2.6 Reels | Top Nav, Button, Image Displays, Rating Pill, Badge |
| Recommendations change | §2.7 Recommendation | Top Nav, Image Displays, Product Card, Scrollbar, Bottom Nav |
| Order tracking change | §2.9 Pre-Delivery | Top Nav, Progress Bar, Infobanner, Button, Snackbar, Bottom Sheet |
| Return flow change | §2.10 Post-Delivery/Return | Top Nav, Progress Bar, Infobanner, Button, Pop-Ups, Input Field, Snackbar |
| Exchange flow change | §2.11 Post-Delivery/Exchange | Top Nav, Progress Bar, Infobanner, Button, Pop-Ups, Snackbar |
| Order list / detail | §2.15 Post Order | Top Nav, Badge, Image Displays, Button, Progress Bar, Bottom Nav |
| Address form | §2.16 New Address | Top Nav, Input Field, Dropdown, Button |
| Any AI-generated content | MEESHO.md §AI UI Patterns | AI Indicator component (blue surface #E7EEFF, border #5585F8) |

---

## Section 5 — Token Quick Reference

### Color Tokens (Semantic → Primitive)
| Token | Value | Use |
|-------|-------|-----|
| `color/interactive/primary` | #9F2089 (Jamun) | Primary CTAs, active states, brand indicators |
| `color/text/primary` | #333333 | Body copy, headings |
| `color/text/secondary` | #666666 | Supporting copy |
| `color/text/disabled` | #999999 | Disabled states |
| `color/background/primary` | #FFFFFF | Main screen backgrounds |
| `color/background/secondary` | #F9F9F9 | Card/surface backgrounds |
| `color/background/tertiary` | #F0F0F0 | Skeleton screens, image placeholders |
| `color/feedback/success` | #038D63 | Success states, positive badges |
| `color/feedback/error` | #E11900 | Error states, destructive actions |
| `color/feedback/warning/soft` | #F4B619 | Soft warnings |
| `color/feedback/warning/strong` | #EE7212 | Strong warnings |
| `color/ai/surface` | #E7EEFF | AI content backgrounds ONLY |
| `color/ai/border` | #5585F8 | AI content borders ONLY |

### Spacing Scale
`4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48px`

### Touch Target Minimum
`48dp × 48dp` for ALL interactive elements

---

## Section 6 — Sandbox Workflow

**Sandbox file:** `u6xWbRPNRJgem7EwDrKfqr`

When generating a design in the Sandbox:
1. Create a new page named `[Date] — [Task description]` (e.g. `Apr-2026 — Order failure state`)
2. Import screens from the SoT file as reference frames
3. Build the design using MESH DS components (import via `importComponentByKeyAsync`)
4. Use the 3-tier token system — never hardcode hex values
5. Apply bilingual check: Hindi version of all text-bearing components must be tested

---

*Last updated: April 2026 · Built from MESH DS Documentation + Design SoT Apr-24*
