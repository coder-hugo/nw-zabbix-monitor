var localStorage = require('./storage.js').storage;

module.exports = {
  saveSecrets: function(secrets) {
    // FIXME at least the password should be stored in a secret password store like gnome-keyring, kwallet, etc.
    localStorage.setJSONItem('secrets', secrets);
  },
  loadSecrets: function() {
    return localStorage.getJSONItem('secrets');
  }
}
