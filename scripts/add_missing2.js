const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

const inserts = [
  [
    "saveFailed: 'Hermes não pôde salvar a alteração de modelo.'",
    "saveFailed: 'Hermes não pôde salvar a alteração de modelo.',\n      confirmTitle: 'Aviso de Seleção de Modelo',\n      confirmDetail: 'Confirme apenas se você aceita essa troca.',\n      confirmAction: 'Confirmar',\n      declined: 'Alteração de modelo cancelada — você recusou o aviso de dados.'"
  ],
  [
    "exportProfile: 'Export profile…'",
    "exportProfile: 'Exportar…',\n    exportMenu: 'Exportar…'"
  ],
  [
    "commitsBehind: (count, branch) =>",
    "    gatewayUnavailable: 'Gateway indisponível',\n    commitsBehind: (count, branch) =>"
  ],
];

for (const [find, replace] of inserts) {
  if (c.includes(find) && !c.includes(replace.split('\n')[1].trim())) {
    c = c.replace(find, replace);
    console.log('Inserted:', find.substring(0, 50));
  }
}

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d);
