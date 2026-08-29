const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// 1. Add fleet + remoteOverride after connectGateway in profiles section
const fleetBlock = `
    fleet: {
      allOnGateway: 'Todos os perfis neste gateway',
      gateway: gateway => \`Perfis em \${gateway}\`,
      gatewayUnreachable: gateway => \`\${gateway} · inacessível\`,
      onGateway: (name, gateway) => \`\${name} · \${gateway}\`,
      switchTo: (name, gateway) => \`Mudar para \${name} em \${gateway}\`,
      deleteOn: gateway => \` em \${gateway}\`
    },
    remoteOverride: {
      menuItem: 'Conectar a um host remoto…',
      badge: (host: string) => \`Executa em \${host}\`,
      title: (profile: string) => \`Conectar \${profile} a um host remoto\`,
      description: 'Sessões neste perfil serão executadas no Hermes remoto que você apontar, em vez deste computador.',
      urlLabel: 'Endereço remoto',
      urlPlaceholder: 'https://hermes.example.com',
      urlInvalid: 'Digite um endereço completo começando com http:// ou https://',
      tokenLabel: 'Token de acesso',
      tokenPlaceholder: 'Cole o token de sessão remoto',
      tokenSavedHint: 'Um token já está salvo. Deixe em branco para manter.',
      plainTextOptIn:
        'Este computador não possui armazenamento seguro de chaves, então o token será salvo criptografado no disco. Salvar mesmo assim.',
      collisionWarning: (label: string) =>
        \`Um gateway chamado "\${label}" já existe nas Configurações. Esta conexão de perfil é separada e não o alterará.\`,
      confirmTitle: 'Conectar este perfil a um host remoto?',
      confirmNote: (profile: string, host: string) =>
        \`Novos chats em \${profile} serão executados em \${host}. Aquele computador executará comandos e lerá arquivos lá, não nesta máquina. Conecte apenas a um host em que confie.\`,
      confirmBack: 'Voltar',
      connect: 'Conectar',
      connecting: 'Conectando…',
      disconnect: 'Remover conexão remota',
      savedTitle: 'Perfil conectado',
      savedMessage: (profile: string, host: string) => \`\${profile} agora é executado em \${host}\`,
      removedTitle: 'Conexão remota removida',
      removedMessage: (profile: string) => \`\${profile} agora é executado neste computador\`,
      removeFailed: 'Não foi possível remover a conexão remota',
      authFailedTitle: 'Host remoto rejeitou o token salvo',
      authFailedMessage: (profile: string, host: string) =>
        \`\${host} recusou o token salvo para \${profile}. Pode ter sido alterado do lado remoto.\`,
      updateToken: 'Inserir novo token…'
    },`;

c = c.replace(
  /connectGateway: 'Manage gateways…',\nactions:/,
  `connectGateway: 'Gerenciar gateways…',\n${fleetBlock}\nactions:`
);

// 2. Add managedUpdates after empty in connections section
const managedUpdatesBlock = `
    managedUpdates: {
      title: 'Atualizações gerenciadas',
      intro:
        'Atualize instalações SSH gerenciadas pelo Desktop de forma transacional: as sessões são drenadas, o checkout remoto é atualizado e cada perfil é restaurado com um comprovante correlacionado.',
      sshConnection: 'Instalação SSH gerenciada pelo Desktop',
      update: 'Atualizar',
      updating: 'Atualizando…',
      progress: 'Drenando sessões, atualizando a instalação remota e restaurando perfis…',
      updated: 'Atualizado',
      partial: 'Atualizado — restauração falhou',
      refused: 'Recusado',
      failed: 'Falha na atualização',
      alreadyRunning: 'Atualização já em andamento',
      receipt: (id: string, outcome: string) => \`Comprovante \${id} · \${outcome}\`,
      receiptVersions: (pre: string, post: string) => \`\${pre} → \${post}\`,
      scopesRestored: (profiles: string) => \`Perfis restaurados: \${profiles}\`,
      scopeNotRestored: (profile: string, error: string) => \`Perfil "\${profile}" não restaurado: \${error}\`
    },`;

c = c.replace(
  /empty: 'No connections registered yet\.'\n    \},\n\ngateway:/,
  `empty: 'Nenhuma conexão registrada ainda.'\n    },${managedUpdatesBlock}\n\n    gateway:`
);

// 3. Add tips section before final closing
const tipsBlock = `
  tips: {
    close: 'Não mostrar esta dica novamente',
    items: {
      'new-session': {
        title: 'Começar do zero',
        text: 'Um novo chat obtém seu próprio contexto, terminal e diretório de trabalho.'
      },
      skills: {
        title: 'Ensinar uma vez',
        text: 'Skills são pastas de instruções que o Hermes carrega quando o trabalho as requer.'
      },
      messaging: {
        title: 'Hermes fora da mesa',
        text: 'Conecte Telegram, Discord, Slack e mais — mesmo agente, mesma memória.'
      },
      artifacts: {
        title: 'Tudo que o Hermes criou',
        text: 'Imagens, arquivos e links de todas as sessões, indexados em um só lugar.'
      },
      cron: {
        title: 'Trabalho que roda sozinho',
        text: 'Agende um prompt de hora em hora, toda noite ou em uma expressão cron.'
      },
      'command-palette': {
        title: 'Uma caixa para tudo',
        text: 'Sessões, configurações, skills e comandos — tudo responde à paleta.'
      },
      profiles: {
        title: 'Perfis são separados',
        text: 'Cada um é seu próprio Hermes — suas próprias chaves, memória e sessões.'
      },
      'composer-mentions': {
        title: 'Anexar e comandar',
        text: 'Digite @ para trazer um arquivo para a conversa, / para executar um comando.'
      },
      'model-switch': {
        title: 'Mudar modelo no meio do caminho',
        text: 'O nome do modelo é um botão. Mude quando o trabalho mudar de forma.'
      },
      'right-pane': {
        title: 'O painel de trabalho',
        text: 'Arquivos, terminal, revisão e o navegador in-app compartilham o lado direito.'
      }
    }
  },
`;

c = c.replace(
  /\n  ui: \{/,
  `${tipsBlock}\n  ui: {`
);

// 4. Fix untranslated strings in profiles section
const fixes = [
  ["connectGateway: 'Manage gateways…',", "connectGateway: 'Gerenciar gateways…',"],
  ["switchToConnection: name => `Switch to ${name}`,", "switchToConnection: name => `Mudar para ${name}`,],
  ["switchConnectionFailed: name => `Could not connect to ${name}`,", "switchConnectionFailed: name => `Não foi possível conectar a ${name}`,],
  ["manageProfiles: 'Manage profiles…',", "manageProfiles: 'Gerenciar perfis…',"],
  ["actions: 'Actions',", "actions: 'Ações',"],
  ["color: 'Color…',", "color: 'Cor…',"],
  ["colorFor: 'Color',", "colorFor: 'Cor',"],
  ["setColor: color => `Set color ${color}`,", "setColor: color => `Definir cor ${color}`,],
  ["autoColor: 'Auto',", "autoColor: 'Automática',"],
  ["noProfiles: 'No profiles yet.',", "noProfiles: 'Nenhum perfil ainda.',"],
  ["selectPrompt: 'Select a profile to view its details.',", "selectPrompt: 'Selecione um perfil para ver seus detalhes.',],
  ["refresh: 'Refresh profiles',", "refresh: 'Atualizar perfis',],
  ["refreshing: 'Refreshing profiles',", "refreshing: 'Atualizando perfis',],
  ["default: 'default',", "default: 'padrão',"],
  ["skills: count => `${count} ${count === 1 ? 'skill' : 'skills'}`,", "skills: count => `${count} ${count === 1 ? 'skill' : 'skills'}`,],
  ["env: 'env',", "env: 'ambiente',"],
  ["defaultBadge: 'Default',", "defaultBadge: 'Padrão',"],
  ["renameMenu: 'Rename…',", "renameMenu: 'Renomear…',"],
  ["editSoul: 'Edit SOUL.md…',", "editSoul: 'Editar SOUL.md…',"],
  ["copySetup: 'Copy setup',", "copySetup: 'Copiar configuração',],
  ["notSet: 'Not set',", "notSet: 'Não definido',"],
  ["soulDesc: 'The system prompt and persona instructions baked into this profile.',", "soulDesc: 'O prompt do sistema e instruções de personalidade incorporados neste perfil.',"],
  ["soulOptional: 'optional',", "soulOptional: 'opcional',"],
  ["soulPlaceholder: mode => `The system prompt / persona for this profile.\nLeave blank to keep the ${mode} default.`,", "soulPlaceholder: mode => `O prompt do sistema / personalidade para este perfil.\nDeixe em branco para manter o padrão do ${mode}.`,],
  ["soulPlaceholderCloned: 'cloned',", "soulPlaceholderCloned: 'clonado',"],
  ["soulPlaceholderEm
