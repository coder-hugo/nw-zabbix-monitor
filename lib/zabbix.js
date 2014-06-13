var rpc = require('node-json-rpc');

module.exports = {
  Zabbix: function(options) {
    var client = new rpc.Client(options);
    var auth_token;

    this.login = function(username, password, callback) {
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
    }

    this.logout = function() {
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
    }

    this.getTrigger = function(callback) {
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
            callback(res);
          }
        }
      );
    }
  }
}
