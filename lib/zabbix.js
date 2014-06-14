var rpc = require('node-json-rpc');
var url = require('url');


var urlToOptions = function(zabbixUrl) {
  var parsedUrl = url.parse(zabbixUrl);
  var result = {};
  result.host = parsedUrl.hostname;
  result.ssl = parsedUrl.protocol === 'https://';
  result.port = parsedUrl.port || result.ssl ? 443 : 80;
  result.path = parsedUrl.pathname.replace(/\/?$/, '/') + 'api_jsonrpc.php';
  return result;
}

var client;
var auth_token = null;
var triggerCache;

module.exports = {
  connect: function(zabbixUrl, username, password, callback) {
    client = new rpc.Client(urlToOptions(zabbixUrl));
    client.call(
      {
        "jsonrpc": "2.0",
        "method": "user.login",
        "params": {
          "user": username,
          "password": password
        },
        "id": 1
      },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          auth_token = res.result;
          callback();
        }
      }
    );
  },
  disconnect: function() {
    client.call(
      {
        "jsonrpc": "2.0",
        "method": "user.logout",
        "params": [],
        "auth": auth_token,
        "id": 1
      },
      function(err, res) {
        if (err) {
          console.log(err);
        }
      }
    );
    auth_token = null;
    client = null;
  },
  retrieveTriggers: function(callback) {
    client.call(
      {
          "jsonrpc": "2.0",
          "method": "trigger.get",
          "params": {
            "output": "extend",
            "expandDescription": true,
            "withUnacknowledgedEvents": true
          },
          "auth": auth_token,
          "id": 1
      }, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          triggerCache = res.result;
          callback(res.result);
        }
      }
    );
  },
  isConnected: function() {
    return auth_token != null;
  },
  getTriggerCache: function() {
    return triggerCache;
  }
}
