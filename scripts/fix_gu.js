const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Remove the two misplaced gatewayUnavailable entries
c = c.replace("    gatewayUnavailable: 'Indisponível',\n", "");
c = c.replace("    gatewayUnavailable: 'inference unavailable',\nstatusbar:", "\nstatusbar:");

// Now add it inside the statusbar section after unknown
c = c.replace(
  "statusbar: {\nunknown: 'unknown',",
  "statusbar: {\ngatewayUnavailable: 'inference unavailable',\nunknown: 'unknown',"
);

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d);
