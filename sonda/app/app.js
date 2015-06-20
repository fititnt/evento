var graph = require('fbgraph');
var Data = require('./data.js');
var Conf = null;

var options = {
  timeout: 3000
  , pool: {maxSockets: Infinity}
  , headers: {connection: "keep-alive"}
};


module.exports = {
  /**
   * Inicializa
   *
   * @param   {Object}   GlobalConf  Configurações globais
   */
  init: function (GlobalConf) {
    Conf = GlobalConf;
    Data.init(Conf);

    graph.setAccessToken(Conf.facebook.access_token).setVersion('2.2'); // Fuck 2.3!
  },
  /**
   * Agenda uma função para ser executada após o delay padrão
   *
   * @param   {Function}  todo        Função para ser executada
   * @param   {Integer}   [waitMore]  Valor adicional de atraso. Multiplica delay padrão
   */
  next: function (todo, waitMore) {
    waitMore = waitMore ? (waitMore * Conf.crawlerDelay) : 0;
    setTimeout(todo, Conf.crawlerDelay + waitMore);
    console.log('Agendando em ' + waitMore);
  },
  /**
   * Retorna informações sobre uma lista de eventos
   *
   * @param   {Function}   cb       Callback a ser executado ao finalizar
   * @param   {String}     terms    Termos a serem pesquisados
   * @returns {void}
   */
  getSearchList: function (cb, terms) {
    graph.setOptions(options).get("search?type=event&q=" + terms, function (err, res) {
      Conf.debug && console.log("\r\n App.getSearchList Data:\r\n", res);

      Data.setSearchList(console.log, res.data);

      // Obtenha ainda mais informações sobre esses eventos
      if (res.data && res.data.length) {
        res.data.forEach(function (item, idx) {
          module.exports.next(function () {
            module.exports.getEvent(null, res.data[idx].id);
          }, idx);
        });
      }

      cb && cb(res.data);
    });
  },
  getEvent: function (cb, id) {
    var url = id + '?fields=name,description,is_date_only,start_time,end_time,updated_time,owner,timezone,venue';
    //console.log(url);
    graph.setOptions(options).get(url, function (err, res) {
      Conf.debug && console.log("\r\n App.getEvent Data:\r\n", res);
      cb && cb(res);
      Data.setEvents(console.log, [res]);
    });
  }
};