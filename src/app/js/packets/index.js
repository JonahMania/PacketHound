const d3 = require("d3");
const textures = require("textures");
const request = require("../utils/request");
//Add css styling
require("!style!css!../../css/packets.css");
const packetsTemplate = require("html-loader!../../html/packets/packetsTemplate.html");
const time = require("../utils/time");

/**
* Draws a single packet block in a dom element
* @param {object} domElement The element to draw the packet in
* @param {object} packet The packet to draw
* @param {object} onclick onclick event for the packet
*/
function drawPacket( domElement, packet, onclick ){

    var blockWidth = packet.size / 3;
    var blockHeight = 40;
    var padding = 2;
    var t;

    if( packet.ipType === 6 ){
        //TCP
        t = textures
            .lines()
            .lighter()
            .thicker()
            .stroke("orange");
    }else if( packet.ipType === 17 ){
        //UDP
        t = textures
            .paths()
            .d("crosses")
            .lighter()
            .thicker()
            .stroke("blue");
    }else{
        //Other
        t = textures
            .circles()
            .size(5)
            .stroke("black");
    }

    d3.select(domElement)
        .append("svg")
        .attr("width",blockWidth)
        .attr("height",blockHeight)
        .attr("class","databaseVisPacketContainer")
        .call(t)
        .append("rect")
        .attr("x",padding)
        .attr("y",padding)
        .attr("width",blockWidth-padding*2)
        .attr("height",blockHeight-padding*2)
        .on("click",function(){
            onclick(packet);
        })
        .on("mouseover",function(){
            // d3.select(this.parentNode)
            // .attr("width",blockWidth+10)
            // .attr("height",blockHeight+10);
            // // .style("position");
            // d3.select(this)
            // .attr("x",0)
            // .attr("y",0)
            // .attr("width",blockWidth+10)
            // .attr("height",blockHeight+10);
        })
        .on("mouseout",function(){
            // d3.select(this.parentNode)
            // .attr("width",blockWidth)
            // .attr("height",blockHeight);
            // d3.select(this)
            // .attr("x",padding)
            // .attr("y",padding)
            // .attr("width",blockWidth-padding*2)
            // .attr("height",blockHeight-padding*2);
        })
        .attr("class","databaseVisPacket")
        .style("fill",t.url());
}
/**
* Builds the packetsVis content
* @param {object} domElement The element to render new html in
* @param {functon} onclick Functon to run when a packed is clicked takes one
* argument that will be the packet that has been selected
* @param {object} filters Filters to use when getting new packets from the database
*/
function build( domElement, onclick, filters ){
    domElement.innerHTML = packetsTemplate;
    var packetsVisCount = document.getElementById("packetsVisCount");
    var packetsVisDates = document.getElementById("packetsVisDates");
    var packetsVisKey = document.getElementById("packetsVisKey");
    var packetsVisContainer = document.getElementById("packetsVisContainer");

    //Get requested packets
    request.getJSON("/packets.json?count="+filters.count,function(error,packets){
        if( error ){
            console.error(error);
        }else{
            //Set number of packets
            packetsVisCount.innerHTML = packets.length+" packets";
            //Set date range of packets
            packetsVisDates.innerHTML = time.timestampToDate(packets[packets.length-1].timestamp)+" to "+time.timestampToDate(packets[0].timestamp);
            packets.forEach(function(packet){
                drawPacket(packetsVisContainer, packet, onclick);
            });
        }
    });
}
module.exports.build = build;
