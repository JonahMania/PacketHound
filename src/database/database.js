const Datastore = require('nedb');
db = {};
//Database for storing packets
db.packets = new Datastore({ filename: './databases/packets.db', autoload: true });
//Database for storing user settings
db.settings = new Datastore({ filename: './databases/settings.db', autoload: true });
//Expose databases
module.exports = db;
