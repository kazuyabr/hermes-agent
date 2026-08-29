const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');
const lines = c.split('\n');

function findLine(pattern) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(pattern)) return i;
  }
  return -1;
}

function insertAfterLine(idx, ...newLines) {
  lines.splice(idx + 1, 0, ...newLines);
}

// 1. gatewayConnectionLostDetail (after gatewayConnectionLost)
let idx = findLine("gatewayConnectionLost:");
if (idx >= 0) {
  insertAfterLine(idx, "      gatewayConnectionLostDetail: 'Ainda tentando em segundo plano. Você pode continuar lendo e redigindo — abra as configurações do Gateway se isso persistir.',");
}

// 2. resetHudLayout (after hideRightSidebar)
idx = findLine("showRightSidebar:");
if (idx >= 0) {
  // Find the next line after showRightSidebar that has a comma
  insertAfterLine(idx + 2, "    resetHudLayout: 'Redefinir layout',");
}

// 3. tips section keys in appearance (after tipsTitle needs to be added)
idx = findLine("tipsTitle");
if (idx < 0) {
  idx = findLine("toursTitle");
  if (idx < 0) {
    // Find pet section and add tips keys before it
    idx = findLine("pet: {");
    if (idx >= 0) {
      insertAfterLine(idx - 1,
        "    tipsTitle: 'Dicas',
        tipsDesc: 'Mostrar dicas rotativas no espaço vazio do chat.',
        tipsReset: 'Reiniciar dicas',
        toursTitle: 'Guias',
        toursDesc: 'Mostrar guias interativos ao usar o Hermes pela primeira vez.',
        vibeHeartsTitle: 'Reações',
        vibeHeartsDesc: 'Mostrar reações de coração nas respostas do Hermes.',
        vibeHeartsReset: 'Reiniciar reações',");
    }
  }
}

// 4. keychainEncryption keys in gateway section
idx = findLine("sshErrUnknown:");
if (idx >= 0) {
  insertAfterLine(idx,
    "      keychainEncryptionTitle: 'Criptografia do chaveiro',
      keychainEncryptionDesc: 'Proteger tokens de conexão com o chaveiro do sistema.',
      keychainEncryptionFailed: 'Falha ao acessar o chaveiro',");
}

// 5. exportMenu in profiles
idx = findLine("exportProfile:");
if (idx >= 0) {
  insertAfterLine(idx, "    exportMenu: 'Exportar\u2026',");
}

// 6. confirmTitle/confirmDetail/confirmAction/declined in cron modelImpact
idx = findLine("saveFailed: 'Hermes did not save");
if (idx < 0) idx = findLine("saveFailed: 'Hermes n");
if (idx >= 0) {
  insertAfterLine(idx,
    "      confirmTitle: 'Aviso de Seleção de Modelo',
      confirmDetail: 'Confirme apenas se você aceita essa troca.',
      confirmAction: 'Confirmar',
      declined: 'Alteração de modelo cancelada — você recusou o aviso do nível de treinamento de dados.',");
}

// 7. gatewayUnavailable in system section
idx = findLine("commitsBehind:");
if (idx >= 0) {
  insertAfterLine(idx + 1,
    "    gatewayUnavailable: 'Gateway indisponível',");
}

// 8. openInExternal, popIn, popOut in preview section
idx = findLine("openInBrowser:");
if (idx >= 0) {
  insertAfterLine(idx,
    "    openInExternal: 'Abrir no navegador externo',
    popIn: 'Incorporar no painel',
    popOut: 'Separar em janela',");
}

// 9. newTab in tabs section
idx = findLine("toggleStripTab:");
if (idx >= 0) {
  // find the line with lastTabKeptTitle
  idx = findLine("lastTabKeptTitle:");
  if (idx >= 0) {
    insertAfterLine(idx + 2,
      "    newTab: 'Nova aba',");
  }
}

// 10. readOnlyTranscript keys in errors section
idx = findLine("handoff:");
if (idx >= 0) {
  // find the last property of handoff
  let handoffEnd = idx;
  for (let i = idx + 1; i < lines.length; i++) {
    if (lines[i].includes('},') || (lines[i].includes('}') && !lines[i].includes('{'))) {
      handoffEnd = i;
      break;
    }
  }
  // Add before handoff closing
}

c = lines.join('\n');
fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);

// Verify depth
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d, 'Lines:', c.split('\n').length);
