const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');
let lines = c.split('\n');

// Fix empty string in connections
c = c.replace("empty: 'No connections registered yet.'", "empty: 'Nenhuma conex\u00e3o registrada ainda.'");
lines = c.split('\n');

// Find the empty line in connections section and add managedUpdates after it
let insertIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("empty: 'Nenhuma conex") && lines[i+1] && lines[i+1].includes("},")) {
    insertIdx = i;
    break;
  }
}

if (insertIdx < 0) {
  console.log('ERROR: connections empty not found');
  process.exit(1);
}

const managedBlock = `    managedUpdates: {
      title: 'Atualiza\u00e7\u00f5es gerenciadas',
      intro: 'Atualize instala\u00e7\u00f5es SSH gerenciadas pelo Desktop de forma transacional: as sess\u00f5es s\u00e3o drenadas, o checkout remoto \u00e9 atualizado e cada perfil \u00e9 restaurado com um comprovante correlacionado.',
      sshConnection: 'Instala\u00e7\u00e3o SSH gerenciada pelo Desktop',
      update: 'Atualizar',
      updating: 'Atualizando\u2026',
      progress: 'Drenando sess\u00f5es, atualizando a instala\u00e7\u00e3o remota e restaurando perfis\u2026',
      updated: 'Atualizado',
      partial: 'Atualizado \u2014 restaura\u00e7\u00e3o falhou',
      refused: 'Recusado',
      failed: 'Falha na atualiza\u00e7\u00e3o',
      alreadyRunning: 'Atualiza\u00e7\u00e3o j\u00e1 em andamento',
      receipt: (id, outcome) => \`Comprovante \${id} \u00b7 \${outcome}\`,
      receiptVersions: (pre, post) => \`\${pre} \u2192 \${post}\`,
      scopesRestored: (profiles) => \`Perfis restaurados: \${profiles}\`,
      scopeNotRestored: (profile, error) => \`Perfil "\${profile}" n\u00e3o restaurado: \${error}\`
    },`;

lines.splice(insertIdx + 1, 0, managedBlock);
c = lines.join('\n');

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('managedUpdates added!', lines.length, 'lines');
