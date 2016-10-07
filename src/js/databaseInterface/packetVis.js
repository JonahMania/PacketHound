const packetVisHTML = require("html-loader!../../html/databaseInterface/packetVis.html");
const drawPacket = require("./drawPacket");

var container;

function build( domElement ){
    container = domElement;
    container.innerHTML = packetVisHTML;
}

function setPacket( packet ){
    var ethernetHeaderVis = document.getElementById("ethernetHeaderVis");
    drawPacket.draw(ethernetHeaderVis,packet);
}

function expand(){
    container.style.right = 0;
}

module.exports.build = build;
module.exports.setPacket = setPacket;
module.exports.expand = expand;
