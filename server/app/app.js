var Data = require('./data.js');
var restify = require('restify');
var Server = restify.createServer();
var Conf = null;





module.exports = {
  /**
   * Inicializa
   *
   * @param   {Object}   GlobalConf  Configurações globais
   */
  init: function (GlobalConf) {
    Conf = GlobalConf;
    Data.init(Conf);

    Server.use(restify.gzipResponse());
    Server.use(restify.queryParser());
    Server.use(restify.CORS());
    Server.use(restify.fullResponse());

    Server.use(restify.bodyParser()); // mapped in req.body
    Server.pre(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.charSet('utf-8');
      return next();
    });

    Server.listen(1337, function () {
      console.log(JSON.stringify({ts: new Date, type: "INFO", name: "Application", event: 'INICIALIZACAO ' + Server.url}));
    });
    console.log(Conf);
  }
};
