const databaseInterfaceHTML = require("html-loader!../../html/databaseInterface/databaseInterface.html");
//Add css styling
require("!style!css!../../css/databaseInterface.css");
const databaseVis = require("./databaseVis");
const packetVis = require("./packetVis");
/**
* @param {object} domElement The element to render new html in
*/
function build( domElement ){
    var databaseVisContainer;
    var packetVisContainer;
    domElement.innerHTML = databaseInterfaceHTML;
    databaseVisContainer = document.getElementById("databaseVisContainer");
    packetVisContainer = document.getElementById("packetVisContainer");
    databaseVis.build(databaseVisContainer,function(packet){
        packetVis.setPacket( packet );
        packetVis.expand();
    });
    packetVis.build(packetVisContainer);
}

module.exports.build = build;
