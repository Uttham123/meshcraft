# MESH DS — Demand-Driven Component Index

Components not pre-mapped in `mesh-layer-map.json`. When one is needed:
1. Import the "inspect key" below
2. Run `dumpTree(inst, 0, 4)` to see layer names
3. Add the binding to `mesh-layer-map.json` under the correct component name

---

## How to inspect on demand

```javascript
const comp = await figma.importComponentByKeyAsync('INSPECT_KEY');
const inst = comp.createInstance();
figma.currentPage.appendChild(inst);
// read the tree, then:
inst.remove();
```

---

## Demand Index

| Component | Set Key | Inspect Key (representative) | Notes |
|-----------|---------|-------------------------------|-------|
| **Bottom Nav** | `c474e8500a7ec99c52994c786f263d5c0741ffe2` | `a5fa2792c4a2d4b9f97282b452877dbee87b4044` (Superstore) | Most keys return "not found" — try Superstore key. Has active/inactive icon states. |
| **Top Nav (Homepage)** | `cd817c4204a5d808c1c85a434ff3ae13b1b50fde` | `ee50ddc342a1dc5949e384e3ab78680415d56911` (Default) | Search bar + cart icon layout |
| **Checkbox** | `8d18f4ae5c044e394b5b7aba2f5b8fa557f6c67c` | `669844676431139861cac46e6412b93cc1d74d0f` (Selected) | Text node name is content-based; checked fill is in `Filled Icons > Subtract` |
| **Radio** | `8d18f4ae5c044e394b5b7aba2f5b8fa557f6c67c` | `9b7ea91188b85999058285d146c47b27f7a2d5ca` (Selected) | Shares set key with Checkbox; text node inconsistently named |
| **Search Box** | `f4fc721a235ce4b961161d158579b0c3995ab9c7` | Re-scan needed — key `512ec1a1f995646a777ece1abf0200e523f21f28` returned "not found" | |
| **Inputbox** | — | `841a067baf5f87f0d118378dfba8e338bd4c900a` (standalone) | Single key, no variants |
| **Dropdown** | `bd06530b49af7bfe8908b2eb16783209a55ee016` | `d2a5916f0a714da69465ccfc6c326fc6029a85ff` (Open) | |
| **Loader** | `b3308b0db2f62e9ebe84a8e922b72a43400ed011` | `96142e69562a2dd9eff3361b38592374c7fb4aca` (With text) | |
| **Custom Toast** | `b3ec067f46533dad171a2de7b96d3a3a22808682` | `84589c04ab3dd8f094aa0f1b573f4f418ef49fec` (Big + Icon) | |
| **Pop-up** | `5a3719395d418faa38baf476a32411de37dca3a3` | `9f2ac90da4bdde049f0c9400ebad7f099c226025` (Action + Headline) | |
| **NPS Chip** | `3199cdc21b1642cdee8de15b88830511ae867a21` | `d559bd947534c5daf031cacc7748b243401c5e36` (5 Default) | 10 variants: 5 numbers × 2 states |
| **Image Display** | `07f49e1169b27fc1d25cf243e633476fd2f0a2db` | `7d552e0ce2044636c71b3c944050c66df57c893f` (Circle 40px) | No fill binding — image fill only; use for avatars/thumbnails |
| **List-Action** | *(from SoT)* | Scan SoT for instances of list rows with action button | |
| **List-Chevron** | *(from SoT)* | Scan SoT for instances of list rows with chevron | |
| **Filled Icons** | *(from SoT scan)* | Context-dependent — always child of another component | Use `color/text/primary` or `color/interactive/primary` on root |

---

## Layer binding patterns (reference for new inspections)

When you inspect a new component, use these patterns:

| What you see | Binding rule |
|---|---|
| Root instance `[f:1]` | → `"__root__"` in layers map |
| `[TEXT]` with semantic name (Title, Label, Body) | → named layer with `color/text/*` |
| `[TEXT]` with content name ("Sarees", "Tab 1") | → skip map, set via `inst.findOne(n => n.type === 'TEXT')` |
| `[RECTANGLE]` named "Div" | → `color/border/default` |
| `[VECTOR] "track"` inside Switch | → already mapped (lowercase!) |
| `[INSTANCE] "Filled Icons"` root `[f:1]` | → bind on the instance, `color/interactive/primary` |
| `[BOOLEAN_OPERATION] "Subtract"` `[f:1]` | → bind on the boolean op, `color/interactive/primary` |
