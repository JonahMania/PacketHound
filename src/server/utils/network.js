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
* Gets the subnet mask of the current system
* @param {string} interfaceName The interface to get the IP of
* @return {string} mask The subnet mask of the interface
*/
function getNetmask( interfaceName ){
    var interfaces = os.networkInterfaces();
    //Check if the interface exists
    if( interfaces[interfaceName] !== undefined ){
        //Find IPv4 address
        for( var i = 0; i < interfaces[interfaceName].length; i++ ){
            if( interfaces[interfaceName][i].family === "IPv4" ){
                return interfaces[interfaceName][i].netmask;
            }
        }
    }

    throw Error("Can not find netmask for network interface: " + interfaceName );
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
    return os.networkInterfaces();
}
/**
* Finds the device from a packet that is on the local network
* @param {object} packet The packet to check devices on
* @param {string} device The interface that is currently being captured on
* @param {string} ip Any external ip on the local network
* @return {stirng} mac The mac address of the device on the network
*/
function getLocalDevice( packet, device, ip ){
    var localMask = getNetmask(device);
    var srcIp = packet.ipSrcAddr;
    var destIp = packet.ipDestAddr;
    return {
        "srcIp":srcIp,
        "destIp":destIp
    }
}

module.exports.getIpAddress = getIpAddress;
module.exports.getInterfaces = getInterfaces;
module.exports.getLocalDevice = getLocalDevice;
