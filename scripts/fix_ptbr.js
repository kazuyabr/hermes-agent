const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Simple string replacements
const fixes = [
  ['Manage profiles\u2026', 'Gerenciar perfis...'],
  ['Manage gateways\u2026', 'Gerenciar gateways...'],
  ["actions: 'Actions'", "actions: 'A\u00e7\u00f5es'"],
  ["color: 'Color\u2026'", "color: 'Cor\u2026'"],
  ["colorFor: 'Color'", "colorFor: 'Cor'"],
  ["autoColor: 'Auto'", "autoColor: 'Autom\u00e1tica'"],
  ["noProfiles: 'No profiles yet.'", "noProfiles: 'Nenhum perfil ainda.'"],
  ["selectPrompt: 'Select a profile to view its details.'", "selectPrompt: 'Selecione um perfil para ver seus detalhes.'"],
  ["refresh: 'Refresh profiles'", "refresh: 'Atualizar perfis'"],
  ["refreshing: 'Refreshing profiles'", "refreshing: 'Atualizando perfis'"],
  ["default: 'default'", "default: 'padr\u00e3o'"],
  ["env: 'env'", "env: 'ambiente'"],
  ["defaultBadge: 'Default'", "defaultBadge: 'Padr\u00e3o'"],
  ["renameMenu: 'Rename\u2026'", "renameMenu: 'Renomear\u2026'"],
  ["editSoul: 'Edit SOUL.md\u2026'", "editSoul: 'Editar SOUL.md\u2026'"],
  ["copySetup: 'Copy setup'", "copySetup: 'Copiar configura\u00e7\u00e3o'"],
  ["notSet: 'Not set'", "n\u00e3o definido"],
  ["soulOptional: 'optional'", "soulOptional: 'opcional'"],
  ["soulPlaceholderCloned: 'cloned'", "soulPlaceholderCloned: 'clonado'"],
  ["soulPlaceholderEmpty: 'empty'", "soulPlaceholderEmpty: 'vazio'"],
  ["unsavedChanges: 'Unsaved changes'", "unsavedChanges: 'Altera\u00e7\u00f5es n\u00e3o salvas'"],
  ["systemDefault: 'System default'", "systemDefault: 'Padr\u00e3o do sistema'"],
  ["loading: 'Loading Hermes configuration...'", "loading: 'Carregando configura\u00e7\u00e3o do Hermes...'"],
  ["emptyTitle: 'Nothing to configure'", "emptyTitle: 'Nada para configurar'"],
  ["saving: 'Saving language\u2026'", "saving: 'Salvando idioma\u2026'"],
  ["exportMenu: 'Export\u2026'", "exportMenu: 'Exportar\u2026'"],
];

for (const [from, to] of fixes) {
  while (c.includes(from)) c = c.replace(from, to);
}

// Fix soulDesc
c = c.replace(
  "soulDesc: 'The system prompt and persona instructions baked into this profile.'",
  "soulDesc: 'O prompt do sistema e instru\u00e7\u00f5es de personalidade incorporados neste perfil.'"
);

// Fix emptyDesc
c = c.replace(
  "emptyDesc: 'This section has no adjustable settings.'",
  "emptyDesc: 'Esta se\u00e7\u00e3o n\u00e3o possui configura\u00e7\u00f5es ajust\u00e1veis.'"
);

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('Step 1: String fixes done!', c.split('\n').length, 'lines');
