const fs = require('fs');

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env['URL_BACK']}',
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', envConfigFile);

console.log('Arquivo environment.prod.ts gerado com sucesso!');