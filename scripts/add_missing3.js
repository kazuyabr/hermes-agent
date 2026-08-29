const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// 1. tipsTitle etc. before pet: {
let idx = c.indexOf("pet: {\n");
if (idx >= 0 && !c.includes("tipsTitle:")) {
  c = c.slice(0, idx) + "    tipsTitle: 'Dicas',\n    tipsDesc: 'Mostrar dicas rotativas no espaço vazio do chat.',\n    tipsReset: 'Reiniciar dicas',\n    toursTitle: 'Guias',\n    toursDesc: 'Mostrar guias interativos ao usar o Hermes pela primeira vez.',\n    vibeHeartsTitle: 'Reações',\n    vibeHeartsDesc: 'Mostrar reações de coração nas respostas do Hermes.',\n    vibeHeartsReset: 'Reiniciar reações',\n" + c.slice(idx);
  console.log('Added tips/tours/vibeHearts keys');
}

// 2. keychainEncryption in gateway section
idx = c.indexOf("sshErrUnknown:");
if (idx >= 0 && !c.includes("keychainEncryptionTitle:")) {
  c = c.slice(0, idx) + c.slice(idx).replace(
    "sshErrUnknown:",
    "keychainEncryptionTitle: 'Criptografia do chaveiro',\n      keychainEncryptionDesc: 'Proteger tokens de conexão com o chaveiro do sistema.',\n      keychainEncryptionFailed: 'Falha ao acessar o chaveiro',\n      sshErrUnknown:"
  );
  console.log('Added keychainEncryption keys');
}

// 3. openInExternal, popIn, popOut after openInBrowser
idx = c.indexOf("openInBrowser:");
if (idx >= 0 && !c.includes("openInExternal:")) {
  const afterOpenInBrowser = c.indexOf(",", idx) + 1;
  c = c.slice(0, afterOpenInBrowser) + "\n    openInExternal: 'Abrir no navegador externo',\n    popIn: 'Incorporar no painel',\n    popOut: 'Separar em janela'," + c.slice(afterOpenInBrowser);
  console.log('Added openInExternal/popIn/popOut');
}

// 4. newTab after toggleStripTab area
idx = c.indexOf("toggleStripTab:");
if (idx >= 0 && !c.includes("newTab:")) {
  const afterToggle = c.indexOf(",", idx) + 1;
  c = c.slice(0, afterToggle) + "\n    newTab: 'Nova aba'," + c.slice(afterToggle);
  console.log('Added newTab');
}

// 5. readOnlyTranscript keys
if (!c.includes("readOnlyTranscriptTitle:")) {
  idx = c.indexOf("handoff:");
  if (idx >= 0) {
    c = c.slice(0, idx) + "    readOnlyTranscriptTitle: 'Transcrição somente leitura',\n    readOnlyTranscriptBody: 'Este chat está em modo somente leitura. Inicie uma nova sessão para continuar.',\n    readOnlyTranscriptSendBlocked: 'Não é possível enviar mensagens em modo somente leitura.',\n    hydrationSyncing: 'Sincronizando...',\n" + c.slice(idx);
    console.log('Added readOnlyTranscript keys');
  }
}

// 6. resetHudLayout
if (!c.includes("resetHudLayout:")) {
  idx = c.indexOf("showRightSidebar:");
  if (idx >= 0) {
    const lineEnd = c.indexOf("\n", idx);
    c = c.slice(0, lineEnd + 1) + "    resetHudLayout: 'Redefinir layout',\n" + c.slice(lineEnd + 1);
    console.log('Added resetHudLayout');
  }
}

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d, 'Lines:', c.split('\n').length);
