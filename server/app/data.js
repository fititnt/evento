var Client = require('mariasql');
var c = new Client();
var Conf = null;

module.exports = {
  /**
   * Inicializa
   *
   * @param   {Object}   GlobalConf  Configurações globais
   */
  init: function (GlobalConf) {
    Conf = GlobalConf;
    c.connect(Conf.database);
    c.on('connect', function () {
      console.log('Client connected');
    }).on('error', function (err) {
      console.log('Client error: ' + err);
    }).on('close', function (hadError) {
      console.log('Client closed');
    });
  },
  getEventos: function (cb) {
    var query = 'SELECT * FROM event', data = [];
    c.query(query).on('result', function (res) {
      res.on('row', function (row) {
        if (row.raw) {
          delete row.raw;
        }
        data.push(row);
      });
    }).on('end', function () {
      cb(data);
    });
    ;
  }
};