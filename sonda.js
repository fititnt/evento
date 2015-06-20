var graph = require('fbgraph');
var Conf = require('./configuration.js');
var Events = [];
var EventsDb = {};

graph.setAccessToken(Conf.facebook.access_token).setVersion('2.2');

var options = {
  timeout: 3000
  , pool: {maxSockets: Infinity}
  , headers: {connection: "keep-alive"}
};



graph.setOptions(options).get("search?q=festa porto alegre&type=event", function (err, res) {
  console.log(res);
  graph.setOptions(options).get("v2.2/696426020466557", function (err, res) {
    console.log(res);
  });
});
graph.setOptions(options).get("696426020466557", function (err, res) {
    console.log(res);
  });