const fs = require("fs");
/**
* Takes a file path and returns a string with the files size
* @param {string} path File path
*/
function getSize( path ){
    var fileStats = fs.statSync(path);
    var sizeInBytes = fileStats.size;
    var digits = sizeInBytes.toString().length;

    if( digits < 4 ){
        return sizeInBytes.toString + " bytes";
    }
    if( digits < 7 ){
        return ( sizeInBytes / 1000.0 ).toFixed(2).toString() + "kb";
    }
    if( digits < 10 ){
        return ( sizeInBytes / 1000000.0 ).toFixed(2).toString() + "mb";
    }
    if( digits < 13 ){
        return ( sizeInBytes / 1000000000.0 ).toFixed(2).toString() + "gb";
    }
}

module.exports.getSize = getSize;
