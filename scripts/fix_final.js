const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// 1. Fix readOnlyTranscriptSendBlocked - should be a plain string, not a function
c = c.replace(
  "readOnlyTranscriptSendBlocked: (profile) => `Não é possível enviar mensagens em modo somente leitura no perfil ${profile}.`,",
  "readOnlyTranscriptSendBlocked: 'Este chat está aberto como transcrição somente leitura — envio desabilitado.',"
);

// 2. Fix hydrationSyncing - should be a function (profile: string) => string
c = c.replace(
  "hydrationSyncing: 'Sincronizando...',",
  "hydrationSyncing: (profile) => `Sincronizando ${profile}…`,"
);

// 3. Remove misplaced tips keys from inside translucencyScope and add them at the right place
// First remove them from wrong place
c = c.replace(
  "\n    tipsTitle: 'Dicas',\n    tipsDesc: 'Mostrar dicas rotativas no espaço vazio do chat.',\n    tipsReset: (count) => `Trazer de volta ${count} dica${count === 1 ? '' : 's'} fechada${count === 1 ? '' : 's'}`,\n    toursTitle: 'Guias',\n    toursDesc: 'Deixe o Hermes guiá-lo pelo aplicativo, escurecendo a tela e destacando cada etapa.',\n    vibeHeartsTitle: 'Reações',\n    vibeHeartsDesc: 'Mostrar reações de coração nas respostas do Hermes.',\n    vibeHeartsReset: 'Reiniciar reações',window:",
  "\nwindow:"
);

// Now find the correct location in appearance section
// In en.ts, tipsTitle is after translucencyScope closing and before pet:
// Find "pet: {" and insert before it
const petIdx = c.indexOf("pet: {\n");
if (petIdx >= 0 && !c.includes("tipsTitle:")) {
  const insertBlock = "\n    tipsTitle: 'Dicas',\n    tipsDesc: 'Mostrar dicas rotativas no espaço vazio do chat.',\n    tipsReset: (count) => `Trazer de volta ${count} dica${count === 1 ? '' : 's'} fechada${count === 1 ? '' : 's'}`,\n    toursTitle: 'Guias',\n    toursDesc: 'Deixe o Hermes guiá-lo pelo aplicativo, escurecendo a tela e destacando cada etapa.',\n    vibeHeartsTitle: 'Reações',\n    vibeHeartsDesc: 'Mostrar reações de coração nas respostas do Hermes.',\n    vibeHeartsReset: 'Reiniciar reações',\n";
  c = c.slice(0, petIdx) + insertBlock + c.slice(petIdx);
  console.log('Added tips in correct location');
}

// 4. Fix gatewayUnavailable - remove from wrong place, add in statusbar
c = c.replace("\n    gatewayUnavailable: 'Gateway indisponível',\nstatusbar:", "\nstatusbar:");
if (!c.includes("gatewayUnavailable:")) {
  const statusbarIdx = c.indexOf("statusbar: {\nunknown:");
  if (statusbarIdx >= 0) {
    c = c.slice(0, statusbarIdx) + "    gatewayUnavailable: 'Indisponível',\n" + c.slice(statusbarIdx);
    console.log('Added gatewayUnavailable in statusbar');
  }
}

// 5. Fix openInExternal placement - need to find preview section
const previewOpenBrowser = c.indexOf("openInBrowser: 'Open in browser',\n    linkHint:");
if (previewOpenBrowser >= 0 && !c.includes("openInExternal:")) {
  // The openInBrowser in the preview section
  c = c.slice(0, previewOpenBrowser) + "openInBrowser: 'Open in browser',\n    openInExternal: 'Abrir no navegador externo',\n    popIn: 'Incorporar no painel',\n    popOut: 'Separar em janela',\n    linkHint:" + c.slice(previewOpenBrowser + "openInBrowser: 'Open in browser',\n    linkHint:".length);
  console.log('Added openInExternal in preview');
}

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d);
