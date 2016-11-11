const Datastore = require('nedb');
db = {};
//Database for storing packets
db.packets = new Datastore({ filename: './databases/packets.db', autoload: true });
//Database for storing user settings
db.sessions = new Datastore({ filename: './databases/sessions.db', autoload: true });
//Expose databases
module.exports = db;
