var graph = require('fbgraph');
var Data = require('./data.js');
var Conf = null;

var options = {
  timeout: 3000
  , pool: {maxSockets: Infinity}
  , headers: {connection: "keep-alive"}
};


module.exports = {
  init: function (Conf2) {
    Conf = Conf2;
    Data.init(Conf);

    graph.setAccessToken(Conf.facebook.access_token).setVersion('2.2');
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
      console.log(res);

      Data.setSearchList(console.log, res.data);

      // Obtenha ainda mais informações sobre esses eventos
      if (res.data && res.data.length) {
        res.data.forEach(function (item, idx) {
          module.exports.next(function () {
            module.exports.getEvent(res.data[idx].id);
          }, idx);
        });
      }

      cb && cb(res.data);
    });
  },
  getEvent: function (id) {
    var url = id + '?fields=name,description,is_date_only,start_time,end_time,updated_time,owner,timezone,venue';
    console.log(url);
    graph.setOptions(options).get(url, function (err, res) {
      console.log(res);
      Data.setEvent(console.log, [res]);
    });
  }
};