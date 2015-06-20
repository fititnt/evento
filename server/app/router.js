
/**
 *
 * @param   {Object}  server      Um objeto inicializado da biblioteca Restify
 * @param   {Object}  Controller  Controller para gerenciar todas as requisições
 * @returns void
 */
module.exports.set = function (server, Controller) {
  server.get('/', Controller.default);
  server.get('/eventos', Controller.getEventos);
};