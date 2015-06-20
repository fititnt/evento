
// Renomeie para configuration.js
// Obtenha token em https://developers.facebook.com/tools/explorer
// @todo obter token de forma automática (fititnt, 2015-06-20 01-
module.exports = {
  crawlerDelay: 1500,
  facebook: {
    access_token: ""
  },
  database: {
    host: '127.0.0.1',
    user: 'foo',
    password: 'bar',
    db: 'mydb',
    multiStatements: true
  }
};