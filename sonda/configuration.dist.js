
// Renomeie para configuration.js
// Obtenha token em https://developers.facebook.com/tools/explorer
// @todo obter token de forma automática (fititnt, 2015-06-20 01:00)

module.exports = {
  crawlerDelay: 3000,
  database: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    db: 'evento',
    multiStatements: true
  },
  debug: 2, // Debug level. 0: nenhum; 1 ativo e padrão; 2: pra caralho
  facebook: {
    access_token: ""
  }
};