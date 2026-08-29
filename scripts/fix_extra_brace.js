const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Remove the last extra closing brace
// The file should end with: \n  }\n}\n but has \n  }\n}\n}\n
const lastThreeBraces = c.lastIndexOf('}\n}\n');
if (lastThreeBraces > 0) {
  // Check if there's an extra } after the normal ending
  const after = c.substring(lastThreeBraces + 4);
  console.log('After last }}:', JSON.stringify(after));
  if (after.trim() === '}') {
    // Remove the extra }
    c = c.substring(0, lastThreeBraces + 4) + after.replace('}', '').trimEnd() + '\n';
    fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
    console.log('Extra brace removed!');
  } else {
    console.log('No extra brace found at end');
  }
} else {
  console.log('Pattern not found');
}
