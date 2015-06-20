var graph = require('fbgraph');
var Data = require('./data.js');


var options = {
  timeout: 3000
  , pool: {maxSockets: Infinity}
  , headers: {connection: "keep-alive"}
};


module.exports = {
  init: function (Conf) {
    Data.init(Conf);

    graph.setAccessToken(Conf.facebook.access_token).setVersion('2.2');


  },
  getSearchList: function () {
    graph.setOptions(options).get("search?type=event&q=festa porto alegre", function (err, res) {
      console.log(res);
      
      Data.setSearchList(console.log, res.data);
      //module.exports.getEvent(res.data[0].id);

    });
  },
  getEvent: function (id) {
    var url = id + '?fields=name,description,is_date_only,start_time,end_time,updated_time,owner,timezone,venue';
    console.log(url);
    graph.setOptions(options).get(url, function (err, res) {
      console.log(res);
    });
  }
};