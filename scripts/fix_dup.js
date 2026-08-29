const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Remove the duplicate }, after managedUpdates closing
// The pattern is:  },\n    },\n  gateway:
// Should be:      },\n  gateway:
c = c.replace(
  "      scopeNotRestored: (profile, error) => `Perfil \"${profile}\" não restaurado: ${error}`\n    },\n    },\n\ngateway:",
  "      scopeNotRestored: (profile, error) => `Perfil \"${profile}\" não restaurado: ${error}`\n    },\n\ngateway:"
);

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);

// Verify
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth after fix:', d);
