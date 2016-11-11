require("file?name=[name].[ext]!../../html/database/database.html");
require("!style!css!../../css/database.css");

const packets = require("../packets");
const packet = require("../packet");
const request = require("../utils/request");

var databaseVisWrapper = document.getElementById("databaseVisWrapper");
var packetOverlayContainer = document.getElementById("packetOverlayContainer");
var packetContainer = document.getElementById("packetContainer");
var closeOverlay = packetOverlayContainer.getElementsByTagName("button")[0];
var totalPackets = document.getElementById("totalPackets");
var sizeOnDisk = document.getElementById("sizeOnDisk");

var filters = {};
//By default set filters to 200
filters.count = 200;
//Get number of packets and size of packets database
request.getJSON("/database/metadata.json",function(error,response){
    if( error ){
        console.error(error);
    }else{
        //Set to html
        totalPackets.innerHTML = "Total packets: " + response.totalPackets;
        sizeOnDisk.innerHTML = "Size on disk: " + response.packetDatabaseSize;
    }
});
//Onclick listener for each packet in the packets visualization
function packetOnclick( packetData ){
    packet.build( packetContainer, packetData );
    packetOverlayContainer.style.left = "0px";
}
//Onclick listener for the packet overlay close button
function closeOverlayOnclick(){
    console.log("clicked");
    packetOverlayContainer.style.left = "-50%";
}
//Set listener
closeOverlay.onclick = closeOverlayOnclick;
//Build packets vis
packets.build( databaseVisWrapper, packetOnclick, filters );
