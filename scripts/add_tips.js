const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');
let lines = c.split('\n');

// Find the ui: section
let insertIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("ui: {")) {
    insertIdx = i;
    break;
  }
}

if (insertIdx < 0) {
  console.log('ERROR: ui section not found');
  process.exit(1);
}

const tipsBlock = `
  tips: {
    close: 'N\u00e3o mostrar esta dica novamente',
    items: {
      'new-session': {
        title: 'Come\u00e7ar do zero',
        text: 'Um novo chat obt\u00e9m seu pr\u00f3prio contexto, terminal e diret\u00f3rio de trabalho.'
      },
      skills: {
        title: 'Ensinar uma vez',
        text: 'Skills s\u00e3o pastas de instru\u00e7\u00f5es que o Hermes carrega quando o trabalho as requer.'
      },
      messaging: {
        title: 'Hermes fora da mesa',
        text: 'Conecte Telegram, Discord, Slack e mais \u2014 mesmo agente, mesma mem\u00f3ria.'
      },
      artifacts: {
        title: 'Tudo que o Hermes criou',
        text: 'Imagens, arquivos e links de todas as sess\u00f5es, indexados em um s\u00f3 lugar.'
      },
      cron: {
        title: 'Trabalho que roda sozinho',
        text: 'Agende um prompt de hora em hora, toda noite ou em uma express\u00e3o cron.'
      },
      'command-palette': {
        title: 'Uma caixa para tudo',
        text: 'Sess\u00f5es, configura\u00e7\u00f5es, skills e comandos \u2014 tudo responde \u00e0 paleta.'
      },
      profiles: {
        title: 'Perfis s\u00e3o separados',
        text: 'Cada um \u00e9 seu pr\u00f3prio Hermes \u2014 suas pr\u00f3prias chaves, mem\u00f3ria e sess\u00f5es.'
      },
      'composer-mentions': {
        title: 'Anexar e comandar',
        text: 'Digite @ para trazer um arquivo para a conversa, / para executar um comando.'
      },
      'model-switch': {
        title: 'Mudar modelo no meio do caminho',
        text: 'O nome do modelo \u00e9 um bot\u00e3o. Mude quando o trabalho mudar de forma.'
      },
      'right-pane': {
        title: 'O painel de trabalho',
        text: 'Arquivos, terminal, revis\u00e3o e o navegador in-app compartilham o lado direito.'
      }
    }
  },`;

lines.splice(insertIdx, 0, tipsBlock);
c = lines.join('\n');

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('tips added!', lines.length, 'lines');
