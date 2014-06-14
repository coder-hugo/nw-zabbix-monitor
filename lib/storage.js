var LocalStorage = require('node-localstorage').LocalStorage;

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var storage = new LocalStorage(getUserHome() + '/.nw-zabbix-monitor');

storage.getJSONItem = function(key) {
  return JSON.parse(storage.getItem(key));
}

storage.setJSONItem = function(key, value) {
  storage.setItem(key, JSON.stringify(value));
}

module.exports = {
  storage: storage
}
