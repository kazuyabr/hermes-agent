const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// 1. Remove vibeHeartsReset - not in the type
c = c.replace("    vibeHeartsReset: 'Reiniciar reações',\n", "");

// 2. Fix openInExternal in preview section - need to find the preview section's openInBrowser
// Find "openInBrowser" that's followed by "linkHint" (preview section)
const previewSection = c.indexOf("openPreview: 'Open preview',");
if (previewSection >= 0 && !c.includes("openInExternal:")) {
  // Look for openInBrowser after preview section
  const afterPreview = c.indexOf("openInBrowser:", previewSection);
  if (afterPreview >= 0) {
    const nextComma = c.indexOf(",", afterPreview) + 1;
    c = c.slice(0, nextComma) + "\n    openInExternal: 'Abrir no navegador externo',\n    popIn: 'Incorporar no painel',\n    popOut: 'Separar em janela'," + c.slice(nextComma);
    console.log('Added openInExternal in preview');
  }
}

// 3. Fix gatewayUnavailable - check where statusbar actually is
if (!c.includes("gatewayUnavailable:")) {
  // Find the statusbar section
  const sbIdx = c.indexOf("    gatewayUnavailable:");
  if (sbIdx >= 0) {
    console.log('gatewayUnavailable already exists at', sbIdx);
  } else {
    // Search more broadly
    const sb2 = c.indexOf("unknown: 'unknown',\n    restart:");
    if (sb2 >= 0) {
      c = c.slice(0, sb2) + "gatewayUnavailable: 'inference unavailable',\n    " + c.slice(sb2);
      console.log('Added gatewayUnavailable');
    }
  }
}

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d);
