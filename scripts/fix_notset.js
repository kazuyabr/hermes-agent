const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Fix the broken notSet replacement - add the key back
c = c.replace(/não definido,/g, "notSet: 'Não definido',");

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('notSet fixed!');
