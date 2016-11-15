const os = require("os");
/**
* Gets all network interfaces on the system
* @return {array} interfaces An array of all interfaces on the system
*/
function getInterfaces(){
    return os.networkInterfaces();
}
/**
*
*/
function ipToNumber( ip ){
    var ret = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    return (+ret[1]<<24) + (+ret[2]<<16) + (+ret[3]<<8) + (+ret[4]);
}
/**
* Finds the device from a packet that is on the local network
* @param {object} packet The packet to check devices on
* @param {object} device The interface that is currently being captured on
* @param {object} localDevices An object of devices currently on the network
* @return {bool} ret Flag to mark if new devices were added to the localDevices
* list
*/
function getLocalDevice( packet, device, localDevices ){
    var ip = ipToNumber( device.address );
    var mask = ipToNumber( device.mask );
    var srcIp = ipToNumber( packet.ipSrcAddr );
    var destIp = ipToNumber( packet.ipDestAddr );
    var ret = false;
    //Check if both masked addess are the same
    if( ( ip & mask ) == ( srcIp & mask ) ){
        if( !localDevices[packet.etherSrcAddr] ){
            localDevices[packet.etherSrcAddr] = true;
            ret = true;
        }
    }
    if( ( ip & mask ) == ( destIp & mask ) ){
        if( !localDevices[packet.etherDestAddr] ){
            localDevices[packet.etherDestAddr] = true;
            ret = true;
        }
    }

    return ret
}

module.exports.getInterfaces = getInterfaces;
module.exports.getLocalDevice = getLocalDevice;
