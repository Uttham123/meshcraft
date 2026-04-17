# MeshCraft — MESH DS Figma Screen Builder

You are building a Figma screen using the **MESH Design System** (Meesho, mobile-first, 390px wide).

## Non-negotiable rules

1. **Never draw rectangles, frames, or shapes to represent UI components.** Every button, badge, appbar, tab, snackbar, etc. must be imported from the MESH Library using `figma.importComponentByKeyAsync(key)`.
2. **Always bind T2 semantic tokens** to every component's fills after import. Use `meshInstance()` below — it does both in one call.
3. **Text is set in DM Sans** (the only font available in the cloud plugin context). The user runs the MESH Font Fixer local plugin once at the end to convert everything to Mier B02.
4. **Sandbox file key:** `u6xWbRPNRJgem7EwDrKfqr`
5. **MESH Library file key:** `i2MPgsD7m0EUVJ9MbaFyZH` (published to sandbox — importComponentByKeyAsync works)

If the user's request needs a component not covered by the pre-mapped keys below, check the **Demand Index** section, import the representative key, `dumpTree()` the instance, add the layer binding to `MESH_LAYER_MAP` in your script, then proceed.

---

## The meshInstance() utility

Paste this at the top of every Figma MCP script. It handles import + T2 binding in one call.

```javascript
// ── MESH LAYER MAP ─────────────────────────────────────────────────────────
// "__root__" = bind fill on the instance root node itself (not a child layer).
// Named keys find child layers by exact name.
const MESH_LAYER_MAP = {
  // BUTTON
  "Button/Solid_Jamun": {
    layers: { "__root__": "color/interactive/primary", "Action": "color/text/inverse" },
    textLayer: "Action"
  },
  "Button/Ghost_Jamun": { layers: { "Action": "color/text/brand" }, textLayer: "Action" },
  "Button/Ghost_Black": { layers: { "Action": "color/text/primary" }, textLayer: "Action" },
  "Button/Link":        { layers: { "Action": "color/text/link" }, textLayer: "Action" },

  // BADGE
  "Badge/Neutral":   { layers: { "__root__": "color/background/secondary",          "Label": "color/text/secondary" }, textLayer: "Label" },
  "Badge/Positive":  { layers: { "__root__": "color/feedback/positive/surface",     "Label": "color/feedback/positive/text" }, textLayer: "Label" },
  "Badge/Negative":  { layers: { "__root__": "color/feedback/error/surface",        "Label": "color/feedback/error/text" }, textLayer: "Label" },
  "Badge/Highlight": { layers: { "__root__": "color/ai/surface",                    "Label": "color/ai/text" }, textLayer: "Label" },
  "Badge/Yellow":    { layers: { "__root__": "color/feedback/warning-soft/surface", "Label": "color/text/primary" }, textLayer: "Label" },
  "Badge/Orange":    { layers: { "__root__": "color/feedback/warning-strong/surface","Label": "color/text/primary" }, textLayer: "Label" },

  // PILL
  "Pill/Active": { layers: { "All": "color/text/brand" }, textLayer: "All" },
  "Pill/Normal": { layers: { "All": "color/text/secondary" }, textLayer: "All" },

  // APPBAR — all 7 Appbar variants share the same layer structure
  "Appbar/default": {
    layers: { "__root__": "color/background/primary", "Title": "color/text/primary" },
    textLayer: "Title"
  },

  // TAB — text nodes use content as name; set text via inst.findOne(n => n.type === 'TEXT')
  "Tab/Horizontal/Selected": { layers: { "__root__": "color/background/primary", "Rectangle 175": "color/interactive/primary" } },
  "Tab/Horizontal/Default":  { layers: { "__root__": "color/background/primary" } },
  "Tab/Vertical/Selected":   { layers: { "__root__": "color/background/primary", "Div": "color/interactive/primary", "Ellipse 1": "color/interactive/primary" } },
  "Tab/Vertical/Default":    { layers: { "__root__": "color/background/primary" } },

  // BOTTOMSHEET HEADER
  "Bottomsheet/1line":      { layers: { "__root__": "color/background/primary", "TITLE": "color/text/primary" }, textLayer: "TITLE" },
  "Bottomsheet/2line":      { layers: { "__root__": "color/background/primary", "Title": "color/text/primary", "Sub-text": "color/text/secondary" }, textLayer: "Title" },
  "Bottomsheet/NoTitle":    { layers: { "__root__": "color/background/primary" } },
  "Bottomsheet/1line-back": { layers: { "__root__": "color/background/primary", "TITLE": "color/text/primary" }, textLayer: "TITLE" },

  // SNACKBAR — text node name is content-based; set via inst.findOne(n => n.type === 'TEXT')
  "Snackbar/Success": { layers: { "__root__": "color/feedback/positive/surface" } },
  "Snackbar/Error":   { layers: { "__root__": "color/feedback/error/surface" } },
  "Snackbar/Neutral": { layers: { "__root__": "color/background/inverse" } },
  "Snackbar/Info":    { layers: { "__root__": "color/ai/surface" } },

  // INFOBANNERS
  "Infobanners/Positive":  { layers: { "__root__": "color/feedback/positive/surface" }, textLayer: "Body" },
  "Infobanners/Warning":   { layers: { "__root__": "color/feedback/warning-soft/surface" }, textLayer: "Body" },
  "Infobanners/Error":     { layers: { "__root__": "color/feedback/error/surface" }, textLayer: "Body" },
  "Infobanners/Neutral":   { layers: { "__root__": "color/background/secondary" }, textLayer: "Body" },
  "Infobanners/Highlight": { layers: { "__root__": "color/ai/surface" }, textLayer: "Body" },

  // SWITCH — layer names are lowercase
  "Switch/Selected":   { layers: { "track": "color/interactive/primary" } },
  "Switch/Unselected": { layers: { "track": "color/background/tertiary" } },

  // VISUAL FILTERS
  "VisualFilters/Normal":  { layers: { "Title_Visual": "color/text/primary" }, textLayer: "Title_Visual" },
  "VisualFilters/Active":  { layers: { "__root__": "color/interactive/primary", "Title_Visual": "color/text/brand" }, textLayer: "Title_Visual" },

  // RATING PILL — all value variants share structure
  "Rating/default": { layers: { "__root__": "color/feedback/positive/surface" } },

  // SIZE CHIPS — text node is content-based
  "SizeChip/Default":     { layers: { "__root__": "color/background/secondary" } },
  "SizeChip/Active":      { layers: { "__root__": "color/interactive/primary" } },
  "SizeChip/Unavailable": { layers: { "__root__": "color/background/secondary" } },

  // STEPPER
  "Stepper/Normal":  { layers: { "__root__": "color/background/secondary" } },
  "Stepper/Minimum": { layers: { "__root__": "color/background/secondary" } },
  "Stepper/Maximum": { layers: { "__root__": "color/background/secondary" } },

  // LINE ICONS — no fill binding; color is set by context or on Shape/Vector child directly
  "Line Icons/default": { layers: {} },
};

// ── HELPERS ────────────────────────────────────────────────────────────────
function _resolveT2(tokenPath) {
  const coll = figma.variables.getLocalVariableCollections()
    .find(c => c.name === 'T2 — Semantic');
  if (!coll) { console.error('T2 — Semantic collection not found'); return null; }
  for (const id of coll.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v && v.name === tokenPath) return v;
  }
  console.warn(`Token not found: ${tokenPath}`);
  return null;
}

function _bindFill(node, tokenPath) {
  const variable = _resolveT2(tokenPath);
  if (!variable || !('fills' in node)) return false;
  const fills = JSON.parse(JSON.stringify(node.fills));
  if (!fills.length) fills.push({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 });
  fills[0] = figma.variables.setBoundVariableForPaint(fills[0], 'color', variable);
  node.fills = fills;
  return true;
}

// ── CORE ───────────────────────────────────────────────────────────────────
// componentKey : exact key from the Component Key Index below
// layerMapKey  : "ComponentName/VariantType" matching MESH_LAYER_MAP
// opts.parent  : parent node (default: figma.currentPage)
// opts.x / opts.y : position
// opts.text    : content for the textLayer (DM Sans; Font Fixer converts to Mier B02)
async function meshInstance(componentKey, layerMapKey, opts = {}) {
  const comp = await figma.importComponentByKeyAsync(componentKey);
  const inst = comp.createInstance();
  const parent = opts.parent || figma.currentPage;
  parent.appendChild(inst);
  if (opts.x !== undefined) inst.x = opts.x;
  if (opts.y !== undefined) inst.y = opts.y;

  const log = { bound: [], missing: [], textSet: false };
  const map = MESH_LAYER_MAP[layerMapKey];

  if (!map) {
    console.warn(`meshInstance: no layer map for "${layerMapKey}" — add it to MESH_LAYER_MAP`);
    return { inst, log };
  }

  for (const [layerName, tokenPath] of Object.entries(map.layers)) {
    if (layerName === '__root__') {
      _bindFill(inst, tokenPath)
        ? log.bound.push(`__root__ → ${tokenPath}`)
        : log.missing.push('__root__');
    } else {
      const nodes = inst.findAll(n => n.name === layerName);
      if (!nodes.length) { log.missing.push(layerName); continue; }
      for (const n of nodes) {
        _bindFill(n, tokenPath)
          ? log.bound.push(`${layerName} → ${tokenPath}`)
          : log.missing.push(layerName);
      }
    }
  }

  if (opts.text && map.textLayer) {
    const tn = inst.findOne(n => n.name === map.textLayer && n.type === 'TEXT');
    if (tn) {
      try {
        const fn = tn.fontName === figma.mixed ? tn.getRangeFontName(0, 1) : tn.fontName;
        await figma.loadFontAsync(fn);
        tn.characters = opts.text;
        log.textSet = true;
      } catch(e) { /* Mier B02 unavailable in cloud — Font Fixer handles this */ }
    }
  }

  return { inst, log };
}
```

---

## Component Key Index

Use these exact keys with `meshInstance()`. MESH Library file: `i2MPgsD7m0EUVJ9MbaFyZH`

### Appbar
Set key: `6281d13c9af1d93a5bb2065e01730c9da3b15cf9` | Layer map key: `Appbar/default`
| Variant | Key |
|---------|-----|
| Type=Home | `af9cb4a63c2a0355b29d89a66d56a84082c18b48` |
| Type=Back | `b0e1d291473e6a97860e7d9d221d83749f2b3f0e` |
| Type=Back + Link | `16c260b2dc3f424bbfbf4269e29f7efbb78bbabf` |
| Type=Back + Text + Icon | `a7d31d40fce335fd283e130dad34367ef48f609f` |
| Type=Back + Button | `19a73a4d4ccc3cacf79239d6e757135cee72893f` |
| Type=Text + icons | `c5de6c34702c1c964f5e779758053003e32dc38d` |
| Type=Back + icons | `a8d4dcb54d989e76992b6e180d5b8d72c558a0b4` |

### Top Nav (Homepage)
Set key: `cd817c4204a5d808c1c85a434ff3ae13b1b50fde` | ⚠️ Demand-driven (inspect on first use)
| Variant | Key |
|---------|-----|
| Property 1=Default | `ee50ddc342a1dc5949e384e3ab78680415d56911` |
| Property 1=Woman | `8a8cd261e39c4e2d26495e818e257bfc0fd818df` |
| Property 1=Man | `d77b80584d48ab7a5ae0f6130540150b25f177e7` |
| Property 1=Loyalty | `829f1dcd3b1fbafd34a839e3ef862ceff74213c3` |

### Bottom Nav
Set key: `c474e8500a7ec99c52994c786f263d5c0741ffe2` | ⚠️ Demand-driven — most keys return "not found"; use Superstore key to inspect
| Variant | Key |
|---------|-----|
| Page=Home | `969cf86d44d4d2a25e6643c92e2650f5ff64adbd` |
| Page=Categories | `049727daf227b622c239095ece65c810a8584042` |
| Page=Orders | `f230d3d2f00d96fe55d635c8e938274484829ea9` |
| Page=Community | `39cff1d378f2e9ddfc4c892e01897ef083f91ba2` |
| Page=Account | `19a4767097338d43fb91e7142bcd805704b2c411` |
| Page=Help | `f6aa6115bf22979f47437417de61a0f26c238904` |
| Page=Live Video | `89553098c92b2af114e8e469a05362e786e2a3f6` |
| Page=Superstore | `a5fa2792c4a2d4b9f97282b452877dbee87b4044` |

### Button
Set key: `eab0a0eb279c7a3a1721ad689f1f6674d4afa49d`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Solid_Jamun, Large, No Icon | `b92fb091384ef7dbbc1f22f7acfdfc6537173a0e` | `Button/Solid_Jamun` |
| Solid_Jamun, Large, Icon | `a042572edd67351c1d34937d5e893cdfd00c592c` | `Button/Solid_Jamun` |
| Solid_Jamun, Medium, No Icon | `71eae5fd376566482832cb30ed4b214d4e42640b` | `Button/Solid_Jamun` |
| Solid_Jamun, Medium, Icon | `f1f211e970e9efbe15f63f66966f87576c9b2500` | `Button/Solid_Jamun` |
| Solid_Jamun, Small, No Icon | `a8d4ce2da0777cd9521d1dd4c88f6b688c2c9507` | `Button/Solid_Jamun` |
| Ghost_Jamun, Large, No Icon | `426f1c6089a022dce8ec0378954964e47c563a86` | `Button/Ghost_Jamun` |
| Ghost_Jamun, Large, Icon | `8e00b39a265dc32a4ccd9e8a65355eb3224c6e41` | `Button/Ghost_Jamun` |
| Ghost_Jamun, Medium, No Icon | `ed574636bb7df9dc081b41c74bf3cc7cab1b6071` | `Button/Ghost_Jamun` |
| Ghost_Jamun, Medium, Icon | `d211e623a519448b9395ba2a07815ee91bd3c392` | `Button/Ghost_Jamun` |
| Ghost_Jamun, Small, No Icon | `11dba68cdce0454163d6f4ed88c81eda7fb4466b` | `Button/Ghost_Jamun` |
| Ghost_Black, Large, No Icon | `936907d609f6098c23b5c0f494f5476cb4d76cc7` | `Button/Ghost_Black` |
| Ghost_Black, Large, Icon | `042212249af24ef03beb308cedc49b709328e578` | `Button/Ghost_Black` |
| Ghost_Black, Medium, No Icon | `842eed4d91a81b463a4f01cf6b2ee81ccb9f4960` | `Button/Ghost_Black` |
| Ghost_Black, Medium, Icon | `0455d9c76e7b01707112a4ca5eb56ac2e61181c6` | `Button/Ghost_Black` |
| Ghost_Black, Small, No Icon | `b653324cc37db7d448bf8b61d2a76a2c3b3126c3` | `Button/Ghost_Black` |
| Link, Medium, No Icon | `cc74de2f237c13718423c10ffde1f3ac00f1d48c` | `Button/Link` |
| Link, Medium, Icon | `fe878f3e7c039a7a2de6b0c09d9ff549a6eb493e` | `Button/Link` |
| Link, Small, No Icon | `b3b00faf79f64a74b92e08fc801dda1410725254` | `Button/Link` |
| Link, Small, Icon | `6f4bc5e64b15e5f967185d08730829e6c8ec431e` | `Button/Link` |
| Icon button, Large | `6e506212c40678878443b71bb1f72c100617ca97` | — |
| Icon button, Medium | `f16eb6dc3759ff1ca5e12ae0da599efe09b68bdc` | — |
| Icon button, Small | `95bde74b6ce6dc6de06c7ae418873aaf0e17da20` | — |

### Badge
Set key: `a4addb418d2023b5e113b642d527d85cae8532ee`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Only text, Small, Neutral | `36b86a5c1f34a5e2d4739253a8834cc1dd5b31a1` | `Badge/Neutral` |
| Only text, Small, Positive | `38c65d1b40b06bf6fe57d21396e2ed7d5810a7e2` | `Badge/Positive` |
| Only text, Small, Negative | `f63ad40c133ece8de4633de9db5333f3907ab365` | `Badge/Negative` |
| Only text, Small, Highlight | `f264dae78b44de62b3d2bfdd00dc9f91c37c7190` | `Badge/Highlight` |
| Only text, Small, Yellow | `37c408fbe1216f34259d64fb387968ec9b0d1cae` | `Badge/Yellow` |
| Only text, Small, Orange | `0469cae3287a43eed9e014f35e33f427821b94a0` | `Badge/Orange` |
| With icon, Large, Neutral | `dd931e7365c4c61331e8e2c9b523e90050cd3d86` | `Badge/Neutral` |
| With icon, Large, Positive | `367913c2aa20f0b4b1701e0b250a58f413d4a7e7` | `Badge/Positive` |
| With icon, Large, Negative | `03bbdb242c5be95f1faf7f0615eda5f0b16841dd` | `Badge/Negative` |
| With icon, Large, Highlight | `133a0e74c286ad74cb2c85b86d44170c6e53e4ed` | `Badge/Highlight` |
| With icon, Large, Yellow | `f6b0de96b02c931f5fc5be097befec418abfaa66` | `Badge/Yellow` |
| With icon, Large, Orange | `89022d1f152a32f422dc6d706fcabb62c1891d55` | `Badge/Orange` |
| With icon, Small, Neutral | `8b87a3e3a52fcdb9b5574d579184ac826415bef0` | `Badge/Neutral` |
| With icon, Small, Positive | `80e346bc4c2a3d1da1d4a605846b558264523fb2` | `Badge/Positive` |
| With icon, Small, Negative | `f6851e177a88068320038c9bdd3ae5e690fdf7a5` | `Badge/Negative` |
| With icon, Small, Highlight | `21db46b5a15768fe201cf1c6d55539d77aa44674` | `Badge/Highlight` |
| With icon, Small, Yellow | `49d655925c3f49a56ca05c1b4527e44aaa5ade64` | `Badge/Yellow` |
| With icon, Small, Orange | `7b38c5511a5b4bc4a56daa7a39583fe2185b9021` | `Badge/Orange` |

### Pill
Set key: `79c853512b96f6ba18dc05de6b64272ac52b2079`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Single select, Normal, No Icon | `164cd5b8311da2b91fe6a813b27e6fdd66d2e6c0` | `Pill/Normal` |
| Single select, Active, No Icon | `fcaa3d69a73e17034cb910e804652eba6071e4fb` | `Pill/Active` |
| Single select, Normal, Icon | `688f443ea40bfefebb8dd3c147814da27b7aaec5` | `Pill/Normal` |
| Single select, Active, Icon | `05d0c0aba1054427e8e6b8ccdb0889db76114ac5` | `Pill/Active` |
| Multi Select, Normal, No Icon | `5482a8bacb609ed36fd56a525d4b0e0331ace5ae` | `Pill/Normal` |
| Multi Select, Active, No Icon | `0968a17d59b253856f8e8b81501ea4d598f617fb` | `Pill/Active` |
| Multi Select, Normal, Icon | `b5273d077decd7086424edadb9d9d82591dfac61` | `Pill/Normal` |
| Multi Select, Active, Icon | `5b67077d914d6476dcdc995c4411d04316dbbd82` | `Pill/Active` |

### Tab
Set key: `8fd1556418aa16a28ec70689c629abc59e488a6c` | Text nodes are content-named; set via `inst.findOne(n => n.type === 'TEXT')`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Vertical, Selected, Highlight | `8e0b79b20b82e2b17a8d17cf851a1d41f4502534` | `Tab/Vertical/Selected` |
| Vertical, Default, Highlight | `2911465d489320657fac441f09670a925406b8f7` | `Tab/Vertical/Default` |
| Vertical, Selected, No Highlight | `f74aa2ae34f3c8da8495d740aa076bd22e4b3edf` | `Tab/Vertical/Selected` |
| Vertical, Default, No Highlight | `3ec4734bb54dcc631d5288504515fb48739f4e71` | `Tab/Vertical/Default` |
| Horizontal, Selected | `6a6e532e457ec6b3f69a35049c691c739378feb4` | `Tab/Horizontal/Selected` |
| Horizontal, Default | `a616f4832da7712d88d3c19dad8073e617473026` | `Tab/Horizontal/Default` |

### Bottomsheet - Header
Set key: `f603bca5fea42483e11e9d3ebeffed94dc8cebbf`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| 1 line | `a98d93a645b8ff4cdd95a838f900c3f2dd8c56cc` | `Bottomsheet/1line` |
| 2 line | `140bef1919e5392e0e0027d623e0b37bfa9d3643` | `Bottomsheet/2line` |
| No Title | `4cdb033ac1eef1020cd1ab4cb906192e1cbf24b6` | `Bottomsheet/NoTitle` |
| 1 line - back | `8a1b93d1e2d8be09e46ee0f6419e40905a6fa1f0` | `Bottomsheet/1line-back` |

### Infobanners
Set key: `df4a9e27ae4358da49df201b51a420cc36c9f18d`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Neutral, Icon, Big | `1800045ff74b33ce767fca4080f1a29a25401dbc` | `Infobanners/Neutral` |
| Positive, Icon, Big | `fb1262b476d184c15043e08987b302ba0f3ad761` | `Infobanners/Positive` |
| Warning, Icon, Big | `95cd49d61f0e5765d84ace1225ce00a4324dfbd0` | `Infobanners/Warning` |
| Error, Icon, Big | `0f465bfce826aeb12f78ebddb937ea523e5ddd78` | `Infobanners/Error` |
| Highlight, Icon, Big | `25329f8c69d9697673e958f416cee496150fe846` | `Infobanners/Highlight` |
| Neutral, No Icon, Small | `a87b601bf440f7548b955a52ec40e2b33497b191` | `Infobanners/Neutral` |
| Positive, No Icon, Small | `35d7e7ab25914dbb4758420a18c773a31c6d0718` | `Infobanners/Positive` |
| Warning, No Icon, Small | `b8a0ebe6b9b3c522ffcaa3f68d873093f5466d3c` | `Infobanners/Warning` |
| Error, No Icon, Small | `8844a86bc98d423f31ab964be1ef5b2e34f43343` | `Infobanners/Error` |
| Highlight, No Icon, Small | `c441eafc84f634ff43e158abba79ea6f60b609e6` | `Infobanners/Highlight` |

### Snackbar
Set key: `7bb54b5bbf29b56b666560db53abfcd4ffacdd8f` | Text node is content-named; set via `inst.findOne(n => n.type === 'TEXT')`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Success | `b9b0216a183cd36e602ea4041634d2899b390ebc` | `Snackbar/Success` |
| Error | `bd36e471bb2958828b648ac529e2ee4712341616` | `Snackbar/Error` |
| Neutral | `f00ff36d4c02c93554e731e1f9979c816178cc99` | `Snackbar/Neutral` |
| Info | `aec249e4e490062251f7e976f52abc9706fc8e07` | `Snackbar/Info` |

### Switch
Set key: `bfd443a0c54b4f4b403c11a77872c32a994bd034` | ⚠️ Layer name is lowercase `"track"` (not `"Track"`)
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Selected | `fe2444f65ea67f8dd15ef8da99503f0cadbcc881` | `Switch/Selected` |
| Unselected | `4993d17ce6e5fdf5c5923569f6ac26b91a01f715` | `Switch/Unselected` |

### Checkbox and Radio
Set key: `8d18f4ae5c044e394b5b7aba2f5b8fa557f6c67c` | ⚠️ Demand-driven — text nodes use content as name; checked icon fill is nested in `Filled Icons > Subtract`
| Variant | Key |
|---------|-----|
| Checkbox, Default | `4e196f22fd4a15499808e578099fe4250c664b35` |
| Checkbox, Selected | `669844676431139861cac46e6412b93cc1d74d0f` |
| Checkbox, Disabled | `76224f2fa30a45b253ea6e407a2bc3d7adfad4ca` |
| Radio, Default | `adaccdeb0d359dd721e6bf9b967ccd8099c7fbc0` |
| Radio, Selected | `9b7ea91188b85999058285d146c47b27f7a2d5ca` |
| Radio, Disabled | `438338ffaf946895f4aecb5f6ed5c2ca061c6748` |

### Visual Filters
Set key: `fa4a4d2b797554e313ad6acebbe5e8ee9f2fee8a`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Normal | `8830d7d5cd4f8d9f79e1ddf58725e98c83878ebe` | `VisualFilters/Normal` |
| Active | `deae5cf71fe565702cf6b0919c28984dfde65adc` | `VisualFilters/Active` |

### Stepper
Set key: `9d34aba6968872f658f811d43865d71fa06515d7`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Minimum | `142381b57ec7db3ce831b19c13a6a8149d005189` | `Stepper/Minimum` |
| Normal | `1e73492fc99ecc7f6836d652920f7d7757c532d7` | `Stepper/Normal` |
| Maximum | `0c35986c17e07ee032cc77acc817c756ce159bda` | `Stepper/Maximum` |

### Dropdown
Set key: `bd06530b49af7bfe8908b2eb16783209a55ee016` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| Open | `d2a5916f0a714da69465ccfc6c326fc6029a85ff` |
| Closed | `71207baf5275e1925203139bab2ccc4807d51b36` |

### Search Box
Set key: `f4fc721a235ce4b961161d158579b0c3995ab9c7` | ⚠️ Demand-driven — Resting key returned "not found"; try Typing or Activated keys
| Variant | Key |
|---------|-----|
| Resting | `512ec1a1f995646a777ece1abf0200e523f21f28` |
| Typing | `b0eaac70df56aa9c20b2b6de804a2a77c893b47e` |
| Activated | `44c30efe2024d8d93865d6ede75a87c988258498` |

### Inputbox
Standalone key: `841a067baf5f87f0d118378dfba8e338bd4c900a` | ⚠️ Demand-driven

### Loader
Set key: `b3308b0db2f62e9ebe84a8e922b72a43400ed011` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| With body text | `96142e69562a2dd9eff3361b38592374c7fb4aca` |
| No body text | `5016c5dee2546ae42f7a4e0215171a93f9cede26` |

### Rating Pill
Set key: `17ee8eecb1586f13a9640a4ef203a70c4edb1383` | Layer map key: `Rating/default`
| Variant | Key |
|---------|-----|
| Value=5 | `96ccb1689db0622595e0b3a1a69810e3966a6f8b` |
| Value=4 | `47c0de063270bceac39d49823dd685ac4e64b362` |
| Value=3.5 | `56f5dce752ad8ea053113aecc438f76b881a4bbe` |
| Value=3 | `37f0a7a2c823b41fe9d4eb0e5fcf841f4266f9bb` |
| Value=2 | `fc36b9c9c19f3c7630810e6d17ac46aa922f0303` |
| Value=1 | `775186409236df6635139bb520abc60fba0e0f43` |
| Value=Supplier | `0a031311d6d8c6fdee2bb380e4813ddb8f7d5159` |

### NPS Chip
Set key: `3199cdc21b1642cdee8de15b88830511ae867a21` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| NPS=5, Default | `d559bd947534c5daf031cacc7748b243401c5e36` |
| NPS=4, Default | `b7e12208e8fd1bb6bae434cac9766c41f34411a8` |
| NPS=3, Default | `2922c95198bb537d8d969d2798c25de089505b8a` |
| NPS=5, Selected | `7bff10b0d76b21c9a4ba505fef9259a7f21cf8f8` |
| NPS=4, Selected | `e7bac364d778ccfe60c0a6ab2648f1aa1b719732` |
| NPS=3, Selected | `ba8e803c7c7271b6298bbaa6ec81d9036ac07070` |

### Size Chips
Set key: `6615ce2e2e47eaa3d62f5aea2bc98cf6e906e425` | Text node is content-named; set via `inst.findOne(n => n.type === 'TEXT')`
| Variant | Key | Layer map key |
|---------|-----|---------------|
| Default, Available | `6e44b0e82910ccbb872f139c9c3c42addbdbf8e9` | `SizeChip/Default` |
| Active, Available | `c0ed8a45f46f235fa866ead68d2e5896be748272` | `SizeChip/Active` |
| Default, Unavailable | `007ade541b5fa36a11f78b7fe4fbe9bc963be5b7` | `SizeChip/Unavailable` |
| Active, Unavailable | `e5434bb8e9f6e44b9e1ed828d943a1cdac3d73bd` | `SizeChip/Unavailable` |

### Custom Toast
Set key: `b3ec067f46533dad171a2de7b96d3a3a22808682` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| Big + Icon | `84589c04ab3dd8f094aa0f1b573f4f418ef49fec` |
| Big, No Icon | `1426c3d0a30ccddb9a9c9d135b211eb28d3ceab6` |
| Small + Icon | `00b34a879276004372300ca68d62a7683790f499` |

### Pop-up
Set key: `5a3719395d418faa38baf476a32411de37dca3a3` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| Action + Headline | `9f2ac90da4bdde049f0c9400ebad7f099c226025` |
| Action + Body | `2b5ca3da74b1348ec7a993df47b823b73ca8930b` |

### Image Display
Set key: `07f49e1169b27fc1d25cf243e633476fd2f0a2db` | No fill binding — image fill only
| Variant | Key |
|---------|-----|
| Circle 40px | `7d552e0ce2044636c71b3c944050c66df57c893f` |
| Circle 48px | `49aa4fa8bb4c9885c7c1081d894b8a0a522c7746` |
| Circle 56px | `3d4fa1fe55966c2c588b6c71349069b951b8bddf` |
| Circle 72px | `98fb9e9b3cd8447bd1bf357d7093d5672d002f7a` |
| Square 48px | `4247380da5aad6788840fa93b710866f2f4e128b` |
| Square 56px | `00b9678b99bcbda8068768df7a7fe19e1e19c412` |
| Square 72px | `8832095a35cfcb383e56b05dc761c6c1c6b55144` |
| Square 80px | `59487aea0c12e4371ff44b458b4495f39adc17cf` |
| Text 40px | `2d928fe70b738f8475b2b0f958cd7ad3353f2a89` |

### Line Icons
Set key: `9a9dd571d860bf2622aa23b6ba3f0cde05555918` | No fill binding; bind `Shape`/`Vector` child directly if color override needed
| Name | Key |
|------|-----|
| account | `336e9843e375bb4490005c90fc6172c543845862` |
| add | `dacf4cd27ee39923e7654c781477d092eb08f0f6` |
| back | `3b473554bfccf9f23d890ae2daabf710d22507a6` |
| cart | `c344e181d380f2a576dbe92503387447cdd13a6a` |
| categories | `51c07bb0d886d64a334e6945f3e873e3ffc83402` |
| check | `72dc6960a5aa4476703a1de93db425381c61d26e` |
| down | `195ff98de4fd8e27c2b3031329c71b476fdd5829` |
| edit | `55148114d1d00be585c08148df155a009a10cf08` |
| error | `313a5be8da4c5c19e9ffbad0563f2b704a7ec12c` |
| favorite | `0180f3c8cc06e9724624784e831e051ab36fa6e3` |
| filter | `fa66a1e2f6576609bc3edcd3b720877575a612a4` |
| help | `8d9599710c98d63c444ac43051018b7ee34ae447` |
| home | `272b1575680a520458991a08830bb7e2e418ef9d` |
| info | `b4dbd911a03aa5bd18378ea5f00faf6cc8b8ce7b` |
| left chevron | `7e296d2bf4efc13387361f7e0631f0e457bf2709` |
| notification | `7606b8ed4e812b120b39c0dec4adf008ce340289` |
| orders | `94d70e608c9f0c675c63df60080bc6cea3d2b128` |
| right chevron | `adf8f42a0bb6f939c915d53a21f9fd382261e519` |
| search | `8840ef41f8a6d5d90ad59c7a870dd5fc555cb5b4` |
| share | `d4a5adbd0eccb2dbbe2a3c9e19eec8808c6f1f52` |
| sort | `459b04294df603e69719c7711042a30af1e7012a` |
| star | `32dee58c4f8d652f1bc298b9e8adafe8eac7ddb1` |
| trash | `3e569c34b6239be8f4d02f099f097699fe32a9ce` |
| wallet | `a2b76c193bfdeee8eaffcb3950f25e7889a2ec06` |

### Filled Icons
Set key: `40fd26085d46cdeb59ccafa05143521ca22f9a09`
| Name | Key |
|------|-----|
| star | `387e99a95b76b09dc0781c49ecf33ee0805aa968` |
| success | `467d103bc2aab259929c8082e5cad9d47b0e494f` |
| helpful | `79491f208e648bd79d39ea6992f5ccfcd6e1f3cb` |
| info | `6f6283f83bfaea22f856c9d772393bb2f43dbdc4` |
| offer | `d02902bdad0c6c5286b0b0cb4f96fae9609cd0f7` |
| shipping | `ae9d2e5eb2665fd806a082ab86ab63dcc228d478` |

### List - Action
Set key: `a7c3e19ebb166e18101c62250d3d41d1faecdb40` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| Single, Left=Icon, Right=NA | `1aef04d5aaa806ffed2f4c9aded5e75c5524cfa0` |
| Single, Left=Icon, Right=Chevron | `ea4806fb6207d81eacf150ea4dd33aa0c1ab8bf8` |
| Action, Left=Checkbox | `58688afff04b9ac7b2007b1f54df4b24eda6b610` |
| Line item, Image | `0307a42854291165f4167a4bdd9ce18e5282733f` |
| Line item, Icon | `eab15891ab83f69a084d64a61e3978d7a0c9d072` |
| Line item, Text Reg/Reg | `fc59c111c1d8b4c61541f07cf7ef82a8620a671d` |
| Line item, Text Bold/Bold | `bbcc199deb625ef089649df7c1e9f47c7d90ec1c` |
| Line item, Text Reg/Bold | `fb8aa4c2da25aa188b54ae751c916231ad1b5950` |

### List - Chevron
Set key: `9fd50cda2b0c0a2373935776f6462cfa420045d0` | ⚠️ Demand-driven
| Variant | Key |
|---------|-----|
| with Rs | `f91bc386e0d8483b767930955550444535d210c6` |
| with % | `705f2e74e7f2f298f22c633e366f4971e56dc98c` |
| Rs with 2 lines | `81f8d6847afb3c95b9f3a7bc0f2e636d51299dc3` |

---

## On-demand inspection workflow

When a ⚠️ demand-driven component is needed:

```javascript
// 1. Import and inspect
const comp = await figma.importComponentByKeyAsync('INSPECT_KEY');
const inst = comp.createInstance();
figma.currentPage.appendChild(inst);

function dumpTree(node, depth = 0, max = 4) {
  if (depth > max) return '';
  const indent = '  '.repeat(depth);
  const f = 'fills' in node ? `[f:${node.fills.length}]` : '';
  return `${indent}[${node.type}] "${node.name}" ${f}\n` +
    (depth < max && 'children' in node
      ? node.children.map(c => dumpTree(c, depth + 1, max)).join('') : '');
}
return dumpTree(inst);
// inst.remove(); // after inspecting
```

2. Add the binding to `MESH_LAYER_MAP` in your script using `__root__` or exact child layer names.
3. Update `mesh-layer-map.json` locally so it's available next time.

---

## T2 token reference (most common)

| Token | Use |
|-------|-----|
| `color/background/primary` | Screen / appbar / card background |
| `color/background/secondary` | Chips, tags, neutral fills |
| `color/background/tertiary` | Disabled / inactive |
| `color/background/inverse` | Dark fill (Snackbar Neutral) |
| `color/text/primary` | Main body text |
| `color/text/secondary` | Captions, metadata |
| `color/text/inverse` | White text on dark/brand fill |
| `color/text/brand` | Jamun brand text (active states) |
| `color/text/link` | Link buttons |
| `color/interactive/primary` | Jamun — CTA fills, active indicators |
| `color/border/default` | Dividers, separators |
| `color/feedback/positive/surface` | Green bg (success, rating) |
| `color/feedback/positive/text` | Green text |
| `color/feedback/error/surface` | Red bg |
| `color/feedback/error/text` | Red text |
| `color/feedback/warning-soft/surface` | Yellow bg |
| `color/feedback/warning-strong/surface` | Orange bg |
| `color/ai/surface` | AI / Highlight purple bg |
| `color/ai/text` | AI text |

---

## Post-build reminder

After any Figma script that creates text nodes: **run the MESH Font Fixer local plugin** to convert DM Sans → Mier B02.
Plugin location: `/Users/uttham.udatthu/Desktop/claude/mesh-font-fixer/`
