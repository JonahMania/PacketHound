const packetDatabase = require("../database/packetDatabase");
var databaseInfoHTML = require("html-loader!../../html/sideBar/databaseInfo.html");
var databaseFiltersHTML = require("html-loader!../../html/sideBar/databaseFilters.html");
var container;
/**
* Loads the databaseinfo module
* @param {object} domElement The element to render new html in
*/
function loadDatabaseInfo( domElement ){
    container = domElement;
    container.innerHTML = databaseInfoHTML;
}
/**
* Expands the database info module
*/
function expand(){
    var totalPackets;
    container.innerHTML = databaseFiltersHTML;
    totalPackets = document.getElementById("totalPackets");
    packetDatabase.getNumPackets(function( err, count ){
        if(err){
            console.err(err);
        }else{
            totalPackets.innerHTML = count;
        }
    });
}
/**
* collapse the database info module
*/
function collapse(){
    var totalPackets;
    container.innerHTML = databaseInfoHTML
    totalPackets = document.getElementById("totalPackets");
    packetDatabase.getNumPackets(function( err, count ){
        if(err){
            console.err(err);
        }else{
            totalPackets.innerHTML = count;
        }
    });
}

module.exports.loadDatabaseInfo = loadDatabaseInfo;
module.exports.expand = expand;
module.exports.collapse = collapse;
