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
            "devices":[]
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
* Adds a new device to the session devices list
*/
function addDevice( sessionId, device ){

}

module.exports.createSession = createSession;
module.exports.getSession = getSession;
module.exports.addDevice = addDevice;
