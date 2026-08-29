const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// 1. Remove misplaced tips/tours/vibeHearts from line 616 area (wrong section)
// These were inserted in boot.steps.errors, they belong in appearance
c = c.replace(
  "    importedBadge: 'Imported',\n    tipsTitle: 'Dicas',\n    tipsDesc: 'Mostrar dicas rotativas no espaço vazio do chat.',\n    tipsReset: 'Reiniciar dicas',\n    toursTitle: 'Guias',\n    toursDesc: 'Mostrar guias interativos ao usar o Hermes pela primeira vez.',\n    vibeHeartsTitle: 'Reações',\n    vibeHeartsDesc: 'Mostrar reações de coração nas respostas do Hermes.',\n    vibeHeartsReset: 'Reiniciar reações',",
  "    importedBadge: 'Imported',"
);

// 2. Add tips keys in appearance section (after translucencyScope:)
// Find the right location in appearance
if (!c.includes("tipsTitle:")) {
  const scopeIdx = c.indexOf("translucencyScope:");
  if (scopeIdx >= 0) {
    // Find end of translucencyScope line
    const lineEnd = c.indexOf("\n", scopeIdx);
    const insertText = "\n    tipsTitle: 'Dicas',\n    tipsDesc: 'Mostrar dicas rotativas no espaço vazio do chat.',\n    tipsReset: (count) => `Trazer de volta ${count} dica${count === 1 ? '' : 's'} fechada${count === 1 ? '' : 's'}`,\n    toursTitle: 'Guias',\n    toursDesc: 'Deixe o Hermes guiá-lo pelo aplicativo, escurecendo a tela e destacando cada etapa.',\n    vibeHeartsTitle: 'Reações',\n    vibeHeartsDesc: 'Mostrar reações de coração nas respostas do Hermes.',\n    vibeHeartsReset: 'Reiniciar reações',";
    c = c.slice(0, lineEnd + 1) + insertText + c.slice(lineEnd + 1);
    console.log('Added tips keys in appearance section');
  }
}

// 3. Remove openInExternal from wrong section (artifact preview)
c = c.replace(
  "openInBrowser: 'Open in browser',\n    openInExternal: 'Abrir no navegador externo',\n    popIn: 'Incorporar no painel',\n    popOut: 'Separar em janela',",
  "openInBrowser: 'Open in browser',"
);

// 4. Add openInExternal, popIn, popOut in the correct preview section
if (!c.includes("openInExternal:")) {
  const previewIdx = c.indexOf("openPreview: 'Open preview',");
  if (previewIdx < 0) {
    // Try other patterns
    const altIdx = c.indexOf("openInBrowser: 'Open in browser',");
    if (altIdx >= 0) {
      const lineEnd = c.indexOf("\n", altIdx);
      c = c.slice(0, lineEnd + 1) + "\n    openInExternal: 'Abrir no navegador externo',\n    popIn: 'Incorporar no painel',\n    popOut: 'Separar em janela'," + c.slice(lineEnd + 1);
      console.log('Added openInExternal/popIn/popOut in preview');
    }
  }
}

// 5. Fix gatewayUnavailable placement  
if (!c.includes("gatewayUnavailable:")) {
  const sbIdx = c.indexOf("statusbar: {\nunknown:");
  if (sbIdx >= 0) {
    c = c.slice(0, sbIdx) + "    gatewayUnavailable: 'Gateway indisponível',\n" + c.slice(sbIdx);
    console.log('Added gatewayUnavailable');
  }
}

// 6. Fix readOnlyTranscriptSendBlocked to be a function
c = c.replace(
  "readOnlyTranscriptSendBlocked: 'Não é possível enviar mensagens em modo somente leitura.'",
  "readOnlyTranscriptSendBlocked: (profile) => `Não é possível enviar mensagens em modo somente leitura no perfil ${profile}.`"
);

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
let d = 0;
for (const ch of c) { if (ch==='{') d++; if (ch==='}') d--; }
console.log('Depth:', d, 'Lines:', c.split('\n').length);
