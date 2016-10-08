const packetVisHTML = require("html-loader!../../html/databaseInterface/packetVis.html");
const drawPacket = require("./drawPacket");

var container;

function build( domElement ){
    container = domElement;
    container.innerHTML = packetVisHTML;
}

function setPacket( packet ){
    var ethernetHeaderVis = document.getElementById("ethernetHeaderVis");
    var packetVisBack = document.getElementById("packetVisBack");
    packetVisBack.onclick = collapse;
    // drawPacket.draw(ethernetHeaderVis,packet);
}

function expand(){
    container.style.left = "80px";
}

function collapse(){
    container.style.left = "calc( -50% + 40px )";
}

module.exports.build = build;
module.exports.setPacket = setPacket;
module.exports.expand = expand;
module.exports.collapse = collapse;
