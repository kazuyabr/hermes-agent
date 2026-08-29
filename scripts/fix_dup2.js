const fs = require('fs');
let c = fs.readFileSync('apps/desktop/src/i18n/pt-br.ts', 'utf8');

// Remove the duplicate }, on its own line (line 826)
const lines = c.split('\n');
// Find the pattern: line with }, then next line also has },
for (let i = 0; i < lines.length - 1; i++) {
  if (lines[i].trim() === '},\n    },' || 
      (lines[i].trim() === '},' && lines[i+1].trim() === '},')) {
    // Check context - if one is managedUpdates closing
    if (lines[i-1] && lines[i-1].includes('scopeNotRestored')) {
      // Remove the extra }, line
      lines.splice(i + 1, 1);
      console.log('Removed extra }, at line', i + 2);
      break;
    }
  }
}

// Alternative: just find and remove the specific pattern
c = lines.join('\n');

// Simpler approach: find "},\n    },\n" and replace with "},\n"
// But need to be careful about what's between them
const idx1 = c.indexOf('scopeNotRestored');
if (idx1 >= 0) {
  const afterScope = c.indexOf('},', idx1);
  const afterFirstClose = c.indexOf('},', afterScope + 2);
  const between = c.substring(afterScope, afterFirstClose + 2);
  console.log('Between:', JSON.stringify(between.substring(0, 50)));
}

fs.writeFileSync('apps/desktop/src/i18n/pt-br.ts', c);
console.log('Lines:', c.split('\n').length);
