const db = require('./database').packets;
/**
* Inserts a new packet into the database
* @param {array} packet An array of packets to insert into the database
* @param {function} callback Function to run when count is calculated
*/
function insertPacket( packet, callback ){
    db.insert(packet, function(err, newPacket){
        return callback(err,newPacket);
    });
}
/**
* Gets the number of packets currently in the database
* @param {function} callback Function to run when count is calculated
*/
function getNumPackets( callback ){
    db.count({}, function(err, count){
        return callback(err,count);
    });
}
/**
* Gets a single packet by its id
* @param {string} id The id of the packet
* @param {function} callback Function to run when packet is found
*/
function getPacketById( id, callback ){
    //Error checking
    if( id === undefined ){
        return callback(Error("id param is required"),null);
    }
    db.findOne({ _id: id }, function (err, packet) {
        if( packet == null ){
            return callback(Error("could not find packet with id: "+id),null);
        }
        return callback(err, packet);
    });
}
/**
* Gets the most recient packets in the database
* @param {int} count The number of packets you want to recieve
* @param {function} callback function to run when count is calculated
*/
function getPackets( count, callback ){
    //Error checking
    if( count === undefined ){
        return callback(Error("count param is required"),null);
    }
    db.find({}).sort({ timestamp: -1 }).limit(count).exec(function(err, docs){
        return callback(err,docs);
    });
}

module.exports.insertPacket = insertPacket;
module.exports.getNumPackets = getNumPackets;
module.exports.getPacketById = getPacketById;
module.exports.getPackets = getPackets;
