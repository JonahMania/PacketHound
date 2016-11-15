const db = require('./database').sessions;
/**
* Creates a new session in the database
* @param {string} timestamp A unix timestamp of when the session was started
* @param {function} callback Function to run when the new session has be created
*/
function createSession(timestamp, callback){
    let newSession = {
        "startTime":timestamp,
        "endTime":"",
        "network":{
        }
    };
    db.insert(newSession,function(error,newSession){
        return callback( error, newSession );
    });
}
/**
* Gets a session from the database
* @param {string} sessionId The id of the session
* @param {function} callback Function to run when when the session is recieved
*/
function getSession( sessionId, callback ){
    //Error checking
    if( sessionId === undefined ){
        return callback(Error("sessionId param is required"),null);
    }
    db.findOne({_id:sessionId},function(error,session){
        if( session == null ){
            return callback(Error("could not find session with id: "+sessionId));
        }
        return callback( error, session );
    });
}
/**
* Updates the list of devices currently on the network
* @param {string} sessionId The id of the session
* @param {object} devices The devices to add in the database
* @param {function} callback Function to run when when the devices list is
* updated
*/
function updateDevices( sessionId, devices, callback ){
    db.update({ _id: sessionId }, { $set: { "network.devices" :  devices  } }, {}, function (error, numReplaced) {
        callback(error,devices);
    });
}
/**
* Adds the capture device of the system to the session
* @param {string} sessionId The id of the session
* @param {object} device The device to add in the database
* @param {function} callback Function to run when when the capture device is
* updated
*/
function addSystemDevice( sessionId, device, callback ){
    db.update({ _id: sessionId },  { $set: { "network.captureDevice": device } }, {}, function (error, numReplaced) {
        callback(error,device);
    });
}
/**
* Sets the end time of a session
* @param {string} sessionId The id of the session
* @param {string} timestamp The time when the session ended
* @param {function} callback Function to run when when the update is complete
*/
function endSession( sessionId, timestamp, callback ){
    db.update({ _id: sessionId },  { $set: { "endTime": timestamp } }, {}, function (error, numReplaced) {
        callback(error,timestamp);
    });
}

module.exports.createSession = createSession;
module.exports.getSession = getSession;
module.exports.updateDevices = updateDevices;
module.exports.addSystemDevice = addSystemDevice;
module.exports.endSession = endSession;
