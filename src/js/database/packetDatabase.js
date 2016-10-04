const db = require('electron').remote.require('../js/database/database').packets;
/**
* A function to insert a new packet into the database
* @param {array} packet An array of packets to insert into the database
* @param {function} callback Function to run when count is calculated
*/
function insertPacket( packet, callback ){
    db.insert(packet, function(err, newPacket){
        return callback(err,newPacket);
    });
}
/**
* A function to get the number of packets currently in the database
* @param {function} callback function to run when count is calculated
*/
function getNumPackets( callback ){
    db.count({}, function (err, count) {
        return callback(err,count);
    });
}

module.exports.insertPacket = insertPacket;
module.exports.getNumPackets = getNumPackets;
