// MESH Font Fixer — replaces DM Sans placeholder text with Mier B02
// DM Sans Medium  → Mier B02 Demi   (Subtitle, button labels, emphasized body)
// DM Sans Regular → Mier B02 Book   (Body copy, captions, helper text)
// DM Sans Bold    → Mier B02 Bold   (Headings)
// DM Sans SemiBold→ Mier B02 Demi   (treated same as Medium)

const REPLACEMENTS = [
  { from: { family: 'DM Sans', style: 'Medium'   }, to: { family: 'Mier B02', style: 'Demi' } },
  { from: { family: 'DM Sans', style: 'SemiBold' }, to: { family: 'Mier B02', style: 'Demi' } },
  { from: { family: 'DM Sans', style: 'Regular'  }, to: { family: 'Mier B02', style: 'Book' } },
  { from: { family: 'DM Sans', style: 'Bold'     }, to: { family: 'Mier B02', style: 'Bold' } },
];

// Collect all text nodes across the whole file
function collectTextNodes(node, results = []) {
  if (node.type === 'TEXT') results.push(node);
  if ('children' in node) {
    for (const child of node.children) collectTextNodes(child, results);
  }
  return results;
}

async function run() {
  figma.ui.postMessage({ type: 'status', text: 'Scanning file…' });

  // Pre-load all target fonts
  try {
    for (const r of REPLACEMENTS) {
      await figma.loadFontAsync(r.to);
    }
    // Also load source fonts so we can read segments
    for (const r of REPLACEMENTS) {
      try { await figma.loadFontAsync(r.from); } catch(e) { /* may already be loaded */ }
    }
  } catch(e) {
    figma.ui.postMessage({ type: 'error', text: `Font load failed: ${e.message}` });
    return;
  }

  let fixed = 0;
  let skipped = 0;

  for (const page of figma.root.children) {
    const textNodes = collectTextNodes(page);

    for (const node of textNodes) {
      const fontName = node.fontName;

      if (fontName === figma.mixed) {
        // Handle mixed fonts — go segment by segment
        const len = node.characters.length;
        let changed = false;
        for (let i = 0; i < len; i++) {
          const seg = node.getRangeFontName(i, i + 1);
          if (seg === figma.mixed) continue;
          const rule = REPLACEMENTS.find(r =>
            r.from.family === seg.family && r.from.style === seg.style
          );
          if (rule) {
            node.setRangeFontName(i, i + 1, rule.to);
            changed = true;
          }
        }
        if (changed) fixed++;
        else skipped++;
      } else {
        // Uniform font
        const rule = REPLACEMENTS.find(r =>
          r.from.family === fontName.family && r.from.style === fontName.style
        );
        if (rule) {
          node.fontName = rule.to;
          fixed++;
        } else {
          skipped++;
        }
      }
    }
  }

  figma.ui.postMessage({
    type: 'done',
    text: `Done! ✅  ${fixed} text nodes updated to Mier B02.  ${skipped} nodes unchanged.`
  });
}

figma.showUI(__html__, { width: 340, height: 160 });
figma.ui.onmessage = msg => {
  if (msg.type === 'run') run().then(() => {});
};
