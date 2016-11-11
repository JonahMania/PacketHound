//Tells webpack to copy the packets html file to the public folder
require("file?name=[name].[ext]!../../html/packets/packets.html");
//Add css styling to the main html file
require("!style!css!../../css/container.css");
//Code to build the packets vis
const packets = require("./index");
const url = require("../utils/url");
//Get the container dom element
var contentContainer = document.getElementById("contentContainer");
//Get the parameters from the url
var params = url.getParams();
//Filters for use when grabbing the packet data
var filters = {};
//Set filters
if( !params.count ){
    filters.count = 200;
}else{
    filters.count = params.count;
}

//Onclick event for when a packet is selected from the vis
function onclick( packet ){
    //Navigate to packet vis of selected packet
    window.location.href = "/database/packet?id="+packet._id;
}

packets.build( contentContainer, onclick, filters );
