var Conf = null;

module.exports = {
  init: function (ConfGlobal, DataGlobal) {
    Conf = ConfGlobal;
    Data = DataGlobal;
  },
  /**
   * Router padrão
   *
   * @param   {Request}    req    Requisição do cliente
   * @param   {Response}   res    Respota do servidor
   * @param   {Function}   next   Callback para próxima ação
   */
  default: function (req, res, next) {
    res.send({'msg': 'nada para ver aqui. Tente /eventos'});
  },
  /**
   * Lista todos os eventos
   *
   * @param   {Request}    req    Requisição do cliente
   * @param   {Response}   res    Respota do servidor
   * @param   {Function}   next   Callback para próxima ação
   */
  getEventos: function (req, res, next) {
    Data.getEventos(function(data) {
      res.send(data);
    });
  }
};