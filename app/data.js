var Client = require('mariasql');
var c = new Client();

module.exports = {
  init: function (Conf) {
    c.connect(Conf.database);
    c.on('connect', function () {
      console.log('Client connected');
    }).on('error', function (err) {
      console.log('Client error: ' + err);
    }).on('close', function (hadError) {
      console.log('Client closed');
    });
  },
  setSearchList: function (cb, data) {
    var parts = [], query = "REPLACE INTO search_event (id, name, start_time, end_time, location) VALUES ";
    data.forEach(function (item) {
      parts.push('(' + item.id 
              +', "' + c.escape(item.name)
              + '", "' + c.escape(item.start_time.replace('T', ' '))
              + '", "' + (item.end_time && c.escape(item.end_time.replace('T', ' ')) || 'NULL')
              + '","' + c.escape(item.location) + '")');
    });
    if (parts.length) {
      console.log(query + parts.join(", \r\n"));
      c.query(query + parts.join(',')).on('end', function () {
        cb && cb(true);
      });
    } else {
      cb && cb(false);
    }

  }
};