const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');
let lines = c.split('\n');

// Find connectGateway line and insert fleet + remoteOverride after it
let insertIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("connectGateway:") && lines[i].includes("Gerenciar gateways")) {
    insertIdx = i;
    break;
  }
}

if (insertIdx < 0) {
  console.log('ERROR: connectGateway not found');
  process.exit(1);
}

const fleetBlock = `    fleet: {
      allOnGateway: 'Todos os perfis neste gateway',
      gateway: gateway => \`Perfis em \${gateway}\`,
      gatewayUnreachable: gateway => \`\${gateway} \u00b7 inacess\u00edvel\`,
      onGateway: (name, gateway) => \`\${name} \u00b7 \${gateway}\`,
      switchTo: (name, gateway) => \`Mudar para \${name} em \${gateway}\`,
      deleteOn: gateway => \` em \${gateway}\`
    },
    remoteOverride: {
      menuItem: 'Conectar a um host remoto\u2026',
      badge: (host) => \`Executa em \${host}\`,
      title: (profile) => \`Conectar \${profile} a um host remoto\`,
      description: 'Sess\u00f5es neste perfil ser\u00e3o executadas no Hermes remoto que voc\u00ea apontar, em vez deste computador.',
      urlLabel: 'Endere\u00e7o remoto',
      urlPlaceholder: 'https://hermes.example.com',
      urlInvalid: 'Digite um endere\u00e7o completo come\u00e7ando com http:// ou https://',
      tokenLabel: 'Token de acesso',
      tokenPlaceholder: 'Cole o token de sess\u00e3o remoto',
      tokenSavedHint: 'Um token j\u00e1 est\u00e1 salvo. Deixe em branco para manter.',
      plainTextOptIn: 'Este computador n\u00e3o possui armazenamento seguro de chaves, ent\u00e3o o token ser\u00e1 salvo criptografado no disco. Salvar mesmo assim.',
      collisionWarning: (label) => \`Um gateway chamado "\${label}" j\u00e1 existe nas Configura\u00e7\u00f5es. Esta conex\u00e3o de perfil \u00e9 separada e n\u00e3o o alterar\u00e1.\`,
      confirmTitle: 'Conectar este perfil a um host remoto?',
      confirmNote: (profile, host) => \`Novos chats em \${profile} ser\u00e3o executados em \${host}. Aquele computador executar\u00e1 comandos e ler\u00e1 arquivos l\u00e1, n\u00e3o nesta m\u00e1quina. Conecte apenas a um host em que confie.\`,
      confirmBack: 'Voltar',
      connect: 'Conectar',
      connecting: 'Conectando\u2026',
      disconnect: 'Remover conex\u00e3o remota',
      savedTitle: 'Perfil conectado',
      savedMessage: (profile, host) => \`\${profile} agora \u00e9 executado em \${host}\`,
      removedTitle: 'Conex\u00e3o remota removida',
      removedMessage: (profile) => \`\${profile} agora \u00e9 executado neste computador\`,
      removeFailed: 'N\u00e3o foi poss\u00edvel remover a conex\u00e3o remota',
      authFailedTitle: 'Host remoto rejeitou o token salvo',
      authFailedMessage: (profile, host) => \`\${host} recusou o token salvo para \${profile}. Pode ter sido alterado do lado remoto.\`,
      updateToken: 'Inserir novo token\u2026'
    },`;

lines.splice(insertIdx + 1, 0, fleetBlock);
c = lines.join('\n');

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('Fleet + remoteOverride added!', lines.length, 'lines');
