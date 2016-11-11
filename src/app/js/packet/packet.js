require("file?name=[name].[ext]!../../html/packet/packet.html");
//Add css styling to the main html file
require("!style!css!../../css/container.css");
// require("../../resources/fonts/JosefinSlab-Regular.ttf");
const packet = require("./index");
const url = require("../utils/url");
const request = require("../utils/request");
var params = url.getParams();
var contentContainer = document.getElementById("contentContainer");

request.getJSON( "/database/packet.json?id=" + params.id, function( error, packetData ){
    if( error ){
        console.error(error);
    }else{
        packet.build( contentContainer, packetData );
    }
});
