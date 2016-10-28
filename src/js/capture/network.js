const os = require("os");
/**
* Gets the IP address of the current system
* @param {string} interfaceName The interface to get the IP of
* @return {string} address The IP address of the system
*/
function getIpAddress( interfaceName ){
    var interfaces = os.networkInterfaces();
    //Check if the interface exists
    if( interfaces[interfaceName] !== undefined ){
        //Find IPv4 address
        for( var i = 0; i < interfaces[interfaceName].length; i++ ){
            if( interfaces[interfaceName][i].family === "IPv4" ){
                return interfaces[interfaceName][i].address;
            }
        }
    }

    throw Error("Can not find IP address for network interface: " + interfaceName );
}
/**
* Gets the mac address of the current system
* @param {string} interfaceName The interface to get the mac address of
* @return {string} macAddress The mac address of the system
*/
function getMacAddress( interfaceName ){

}
/**
* Gets all network interfaces on the system
* @return {array} interfaces An array of all interfaces on the system
*/
function getInterfaces(){
    var interfaces = [];
    for( var netInterface in os.networkInterfaces() ){
        interfaces.push( netInterface );
    }
    return interfaces;
}

module.exports.getIpAddress = getIpAddress;
module.exports.getInterfaces = getInterfaces;
