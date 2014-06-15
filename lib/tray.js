var gui;

var tray;

module.exports = {
  init: function(gui) {
    tray = new gui.Tray({title: 'NW-Zabbix-Monitor'});
    var menu = new gui.Menu();
    var exit = new gui.MenuItem({label: "Exit"});
    exit.on('click', function() {
      gui.App.quit();
    });
    menu.append(exit);
    tray.menu = menu;
  },
  setPriority: function(priority) {
    var icon;
    switch (priority) {
      case '1':
        icon = 'information';
        break;
      case '2':
        icon = 'warning';
        break;
      case '3':
        icon = 'average';
        break;
      case '4':
        icon = 'high';
        break;
      case '5':
        icon = 'disaster';
        break;
      default:
        icon = 'not_classified';
        break;
    }
    tray.icon = 'icons/' + icon + '.png';
  },
  remove: function() {
    tray.remove();
  },
  on: function(event, callback) {
    tray.on(event, callback);
  }
}
