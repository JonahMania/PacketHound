/**
* Takes a hex string and converts it to a ascii string
* @param {string} hexString A string of data in hex form
* @return {string} asciiString A stirng of data in ascii form
*/
function toAscii( hexString ){
    var asciiString = '';
    var byte;
    for (var i = 0; i < hexString.length; i += 2){
        //Convert hex to byte
        byte = parseInt(hexString.substr(i, 2), 16);
        //Check if byte is in readable range
        if( byte > 31 && byte < 127 ){
            //Convert to ascii
            asciiString += String.fromCharCode(byte);
        }else{
            //If byte is not readable then put a dot
            asciiString += ".";
        }
    }
    return asciiString;
}

/**
* Takes a hex string and converts it to bytes
* @param {string} hexString A string of data in hex form
* @return {string} byteString A stirng of data in byte form
*/
function toBytes( hexString ){
    var byteString = '';
    for (var i = 0; i < hexString.length; i += 2){
        //Convert hex to byte
        byteString += parseInt(hexString.substr(i, 2), 16)+' ';
    }
    return byteString;
}

module.exports.toAscii = toAscii;
module.exports.toBytes = toBytes;
