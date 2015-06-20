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
      parts.push('(' + parseInt(item.id, 10)
              + ', "' + c.escape(item.name)
              + '", "' + c.escape(item.start_time.replace('T', ' '))
              + '", "' + (item.end_time && c.escape(item.end_time.replace('T', ' ')) || 'NULL')
              + '","' + c.escape(item.location)
              + '")');
    });
    if (parts.length) {
      //console.log(query + parts.join(", \r\n"));
      c.query(query + parts.join(',')).on('end', function () {
        cb && cb(true);
      });
    } else {
      cb && cb(false);
    }
  },
  setEvent: function (cb, data) {
    var parts = [], query;
    query = "REPLACE INTO `event` (id, name, description, is_date_only, timezone, location, start_time, end_time"
            + ", updated_time, owner_id, owner_name, venue_city, venue_country, venue_latitude, venue_longitude"
            + ", venue_state, venue_street, venue_id, raw) VALUES ";
    data.forEach(function (item) {
      parts.push('(' + parseInt(item.id, 10)
              + ', ' + '"' + c.escape(item.name) + '"'
              + ', ' + (item.description ? '"' + c.escape(item.description) + '"' : 'NULL')
              + ', ' + (item.is_date_only ? 1 : 0)
              + ', ' + (item.timezone && '"' + c.escape(item.timezone) + '"' || 'NULL')
              + ', ' + (item.location && '"' + c.escape(item.location) + '"' || 'NULL')
              + ', ' + (item.start_time && '"' + c.escape(item.start_time.replace('T', ' ').substring(0, 19)) + '"' || 'NULL')
              + ', ' + (item.end_time && '"' + c.escape(item.end_time.replace('T', ' ').substring(0, 19)) + '"' || 'NULL')
              + ', ' + (item.updated_time && '"' + c.escape(item.updated_time.replace('T', ' ').substring(0, 19)) + '"' || 'NULL')
              + ', ' + (item.owner_id && parseInt(item.owner_id) || 'NULL')
              + ', ' + (item.owner_name && '"' + c.escape(item.owner_name) + '"' || 'NULL')
              + ', ' + (item.venue_city && '"' + c.escape(item.venue_city) + '"' || 'NULL')
              + ', ' + (item.venue_country && '"' + c.escape(item.venue_country) + '"' || 'NULL')
              + ', ' + (item.venue_latitude && parseFloat(item.venue_latitude) || 'NULL')
              + ', ' + (item.venue_longitude && parseFloat(item.venue_longitude) || 'NULL')
              + ', ' + (item.venue_state && '"' + c.escape(item.venue_state) + '"' || 'NULL')
              + ', ' + (item.venue_street && '"' + c.escape(item.venue_street) + '"' || 'NULL')
              + ', ' + (item.venue_id && parseInt(item.venue_id, 10) || 'NULL')
              + ', ' + '"' + c.escape(JSON.stringify(item)) + '"'
              + ')');
    });
    if (parts.length) {
      //console.log(query + parts.join(", \r\n"));
      c.query(query + parts.join(',')).on('end', function () {
        cb && cb(true);
      });
    } else {
      cb && cb(false);
    }
  }
};