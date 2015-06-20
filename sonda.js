var graph = require('fbgraph');
var Conf = require('./configuration.js');

graph.setAccessToken(Conf.access_token);

var options = {
  timeout: 3000
  , pool: {maxSockets: Infinity}
  , headers: {connection: "keep-alive"}
};

graph
        .setOptions(options)
        .get("search?q=festa porto alegre&type=event", function (err, res) {
          console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
        });