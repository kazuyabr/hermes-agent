const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Fix missing }, after empty and before managedUpdates
c = c.replace(
  "empty: 'Nenhuma conexão registrada ainda.'\n    managedUpdates:",
  "empty: 'Nenhuma conexão registrada ainda.'\n    },\n    managedUpdates:"
);

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('connections fix done!');
