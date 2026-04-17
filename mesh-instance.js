/**
 * meshInstance() — MESH DS Component Import + T2 Token Binding
 *
 * Usage:
 *   const { inst, log } = await meshInstance(componentKey, layerMapKey, opts);
 *
 * Arguments:
 *   componentKey  — exact key from mesh-component-keys.md (specific variant)
 *   layerMapKey   — "ComponentName/VariantType" (e.g. "Button/Solid_Jamun")
 *   opts.parent   — parent node (defaults to figma.currentPage)
 *   opts.x / opts.y — position
 *   opts.text     — string to set on the textLayer (DM Sans; run Font Fixer after)
 *
 * Returns: { inst: InstanceNode, log: { bound[], missing[], textSet } }
 *
 * Notes:
 *   - "__root__" in layers means bind fill on the instance root node itself
 *   - text: false is expected when Mier B02 isn't available (cloud context) — use
 *     the MESH Font Fixer local plugin to convert DM Sans → Mier B02 afterwards
 */

// ── LAYER MAP ──────────────────────────────────────────────────────────────
// Maps "ComponentName/VariantType" → { layers: { layerName: tokenPath }, textLayer }
// "__root__" = the instance's own fills (not a child layer).
// Source of truth: mesh-layer-map.json
const MESH_LAYER_MAP = {
  "Button/Solid_Jamun": {
    layers: { "__root__": "color/interactive/primary", "Action": "color/text/inverse" },
    textLayer: "Action"
  },
  "Button/Ghost_Jamun": {
    layers: { "Action": "color/text/brand" },
    textLayer: "Action"
  },
  "Button/Ghost_Black": {
    layers: { "Action": "color/text/primary" },
    textLayer: "Action"
  },
  "Button/Link": {
    layers: { "Action": "color/text/link" },
    textLayer: "Action"
  },
  "Badge/Neutral": {
    layers: { "__root__": "color/background/secondary", "Label": "color/text/secondary" },
    textLayer: "Label"
  },
  "Badge/Positive": {
    layers: { "__root__": "color/feedback/positive/surface", "Label": "color/feedback/positive/text" },
    textLayer: "Label"
  },
  "Badge/Negative": {
    layers: { "__root__": "color/feedback/error/surface", "Label": "color/feedback/error/text" },
    textLayer: "Label"
  },
  "Badge/Highlight": {
    layers: { "__root__": "color/ai/surface", "Label": "color/ai/text" },
    textLayer: "Label"
  },
  "Badge/Yellow": {
    layers: { "__root__": "color/feedback/warning-soft/surface", "Label": "color/text/primary" },
    textLayer: "Label"
  },
  "Badge/Orange": {
    layers: { "__root__": "color/feedback/warning-strong/surface", "Label": "color/text/primary" },
    textLayer: "Label"
  },
  "Pill/Active": {
    layers: { "All": "color/text/brand" },
    textLayer: "All"
  },
  "Pill/Normal": {
    layers: { "All": "color/text/secondary" },
    textLayer: "All"
  },
  "Appbar/default": {
    layers: { "__root__": "color/background/primary", "Title": "color/text/primary" },
    textLayer: "Title"
  },
  "Snackbar/Success": {
    layers: { "__root__": "color/feedback/positive/surface" },
    textLayer: "Label"
  },
  "Snackbar/Error": {
    layers: { "__root__": "color/feedback/error/surface" },
    textLayer: "Label"
  },
  "Snackbar/Neutral": {
    layers: { "__root__": "color/background/inverse" },
    textLayer: "Label"
  },
  "Snackbar/Info": {
    layers: { "__root__": "color/ai/surface" },
    textLayer: "Label"
  },
  "Infobanners/Positive": {
    layers: { "__root__": "color/feedback/positive/surface" },
    textLayer: "Body"
  },
  "Infobanners/Warning": {
    layers: { "__root__": "color/feedback/warning-soft/surface" },
    textLayer: "Body"
  },
  "Infobanners/Error": {
    layers: { "__root__": "color/feedback/error/surface" },
    textLayer: "Body"
  },
  "Infobanners/Neutral": {
    layers: { "__root__": "color/background/secondary" },
    textLayer: "Body"
  },
  "Infobanners/Highlight": {
    layers: { "__root__": "color/ai/surface" },
    textLayer: "Body"
  },
  // Tab — text node names are content-based; set text manually via inst.findOne(n => n.type === 'TEXT')
  "Tab/Horizontal/Selected": {
    layers: { "__root__": "color/background/primary", "Rectangle 175": "color/interactive/primary" }
  },
  "Tab/Horizontal/Default": {
    layers: { "__root__": "color/background/primary" }
  },
  "Tab/Vertical/Selected": {
    layers: { "__root__": "color/background/primary", "Div": "color/interactive/primary", "Ellipse 1": "color/interactive/primary" }
  },
  "Tab/Vertical/Default": {
    layers: { "__root__": "color/background/primary" }
  },

  // Bottomsheet Header
  "Bottomsheet/1line": {
    layers: { "__root__": "color/background/primary", "TITLE": "color/text/primary" },
    textLayer: "TITLE"
  },
  "Bottomsheet/2line": {
    layers: { "__root__": "color/background/primary", "Title": "color/text/primary", "Sub-text": "color/text/secondary" },
    textLayer: "Title"
  },
  "Bottomsheet/NoTitle": {
    layers: { "__root__": "color/background/primary" }
  },
  "Bottomsheet/1line-back": {
    layers: { "__root__": "color/background/primary", "TITLE": "color/text/primary" },
    textLayer: "TITLE"
  },

  // Visual Filters
  "VisualFilters/Normal": {
    layers: { "Title_Visual": "color/text/primary" },
    textLayer: "Title_Visual"
  },
  "VisualFilters/Active": {
    layers: { "__root__": "color/interactive/primary", "Title_Visual": "color/text/brand" },
    textLayer: "Title_Visual"
  },

  // Switch — layer names are LOWERCASE: "track", "thumb"
  "Switch/Selected":   { layers: { "track": "color/interactive/primary" } },
  "Switch/Unselected": { layers: { "track": "color/background/tertiary" } },

  // Rating Pill — all value variants share the same structure
  "Rating/default": {
    layers: { "__root__": "color/feedback/positive/surface" }
  },

  // Size Chips — text node name is content-based, set manually
  "SizeChip/Default":      { layers: { "__root__": "color/background/secondary" } },
  "SizeChip/Active":       { layers: { "__root__": "color/interactive/primary" } },
  "SizeChip/Unavailable":  { layers: { "__root__": "color/background/secondary" } },

  // Stepper
  "Stepper/Normal":   { layers: { "__root__": "color/background/secondary" } },
  "Stepper/Minimum":  { layers: { "__root__": "color/background/secondary" } },
  "Stepper/Maximum":  { layers: { "__root__": "color/background/secondary" } },

  // Line Icons — no fill binding; inherit from parent or bind Shape/Vector directly
  "Line Icons/default": { layers: {} },
};

// ── HELPERS ────────────────────────────────────────────────────────────────

/** Find a variable in the T2 — Semantic collection by token path. */
function _resolveT2(tokenPath) {
  const collections = figma.variables.getLocalVariableCollections();
  const coll = collections.find(c => c.name === 'T2 — Semantic');
  if (!coll) { console.error('T2 — Semantic collection not found'); return null; }
  for (const id of coll.variableIds) {
    const v = figma.variables.getVariableById(id);
    if (v && v.name === tokenPath) return v;
  }
  console.warn(`Token not found in T2: ${tokenPath}`);
  return null;
}

/** Bind a T2 variable to a node's first fill. Returns true on success. */
function _bindFill(node, tokenPath) {
  const variable = _resolveT2(tokenPath);
  if (!variable || !('fills' in node)) return false;
  const fills = JSON.parse(JSON.stringify(node.fills));
  if (!fills || fills.length === 0) {
    fills.push({ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 1 });
  }
  fills[0] = figma.variables.setBoundVariableForPaint(fills[0], 'color', variable);
  node.fills = fills;
  return true;
}

// ── CORE ───────────────────────────────────────────────────────────────────

async function meshInstance(componentKey, layerMapKey, opts = {}) {
  // 1. Import component from MESH Library
  const comp = await figma.importComponentByKeyAsync(componentKey);
  const inst = comp.createInstance();

  // 2. Place in parent
  const parent = opts.parent || figma.currentPage;
  parent.appendChild(inst);
  if (opts.x !== undefined) inst.x = opts.x;
  if (opts.y !== undefined) inst.y = opts.y;

  const log = { bound: [], missing: [], textSet: false };
  const map = MESH_LAYER_MAP[layerMapKey];

  if (!map) {
    console.warn(`meshInstance: no layer map for "${layerMapKey}" — imported without token binding`);
    return { inst, log };
  }

  // 3. Bind T2 tokens to layers
  for (const [layerName, tokenPath] of Object.entries(map.layers)) {
    if (layerName === '__root__') {
      const ok = _bindFill(inst, tokenPath);
      if (ok) log.bound.push(`__root__ → ${tokenPath}`);
      else log.missing.push('__root__');
    } else {
      const nodes = inst.findAll(n => n.name === layerName);
      if (nodes.length === 0) {
        log.missing.push(layerName);
      } else {
        for (const n of nodes) {
          const ok = _bindFill(n, tokenPath);
          if (ok) log.bound.push(`${layerName} → ${tokenPath}`);
        }
      }
    }
  }

  // 4. Text override
  // Note: text set in DM Sans; run MESH Font Fixer plugin afterwards for Mier B02.
  if (opts.text && map.textLayer) {
    const textNode = inst.findOne(n => n.name === map.textLayer && n.type === 'TEXT');
    if (textNode) {
      try {
        const fn = textNode.fontName === figma.mixed
          ? textNode.getRangeFontName(0, 1)
          : textNode.fontName;
        await figma.loadFontAsync(fn);
        textNode.characters = opts.text;
        log.textSet = true;
      } catch (e) {
        // Expected in cloud context when Mier B02 isn't available.
        // Run MESH Font Fixer local plugin to convert DM Sans → Mier B02.
        console.warn(`meshInstance: font load failed for "${map.textLayer}": ${e.message}`);
      }
    }
  }

  return { inst, log };
}
