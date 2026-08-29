const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Add gatewayUnavailable before statusbar section
c = c.replace(
  "statusbar: {\nunknown: 'unknown',",
  "    gatewayUnavailable: 'inference unavailable',\nstatusbar: {\nunknown: 'unknown',"
);

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d);
