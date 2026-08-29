const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

const inserts = [
  [
    "gatewayConnectionLost: 'Conexão com o gateway perdida',",
    "gatewayConnectionLost: 'Conexão com o gateway perdida',\ngatewayConnectionLostDetail: 'Ainda tentando em segundo plano. Você pode continuar lendo e redigindo — abra as configurações do Gateway se isso persistir.',"
  ],
  [
    "saveFailed: 'Hermes não salvou essa mudança de modelo.',",
    "saveFailed: 'Hermes não salvou essa mudança de modelo.',\n      confirmTitle: 'Aviso de Seleção de Modelo',\n      confirmDetail: 'Confirme apenas se você aceita essa troca.',\n      confirmAction: 'Confirmar',\n      declined: 'Alteração de modelo cancelada — você recusou o aviso de dados.',"
  ],
  [
    "exportProfile: 'Exportar…',",
    "exportProfile: 'Exportar…',\n    exportMenu: 'Exportar…',"
  ],
];

for (const [find, replace] of inserts) {
  if (c.includes(find) && !c.includes(replace.split('\n')[1])) {
    c = c.replace(find, replace);
    console.log('Inserted:', find.substring(0, 40));
  }
}

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d);
