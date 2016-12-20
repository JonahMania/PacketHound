const d3 = require("d3");
const request = require("../utils/request");
//Add css styling
require("!style!css!../../css/packets.css");
const packetsTemplate = require("html-loader!../../html/packets/packetsTemplate.html");
const time = require("../utils/time");
const packetTextures = require("./packetTextures");

/**
* Draws packets in a dom element
* @param {object} domElement The element to draw the packet in
* @param {object} packets The packets to draw
* @param {object} onclick onclick event for the packet
*/
function drawPackets( domElement, packets, onclick ){

    var padding = {
        y:6,
        x:4
    };
    var containerPadding = 6;
    var blockHeight = 40;
    var maxBlockWidth = domElement.offsetWidth - ( padding.x * 2 ) - ( containerPadding * 2 );
    var container;
    var currX = padding.x + containerPadding;
    var currY = padding.y + containerPadding;
    var currWidth = 0;
    var zoomFactor = 16;

    //Set scale for block width
    var widthScale = d3.scaleLinear()
        .domain([0,Math.max.apply(Math,packets.map(function(p){
            return p.size;
        }))])
        .range([0,maxBlockWidth]);
    //Append container svg
    container = d3.select(domElement)
    .append("svg")
    .attr("width",maxBlockWidth);

    packets.forEach(function(packet){

        var t;
        //Set the correct texture for this packet type
        switch( packet.ipType ){
                case 6:
                    t = packetTextures.tcp;
                    break;
                case 17:
                    t = packetTextures.udp;
                    break;
                default:
                    t =packetTextures.other;
                    break;
        }
        //Scale the current packet by its size
        currWidth = widthScale(packet.size);
        //If we have overflowed passed the container bounds move to next line
        if( currX + currWidth > maxBlockWidth ){
            currX = padding.x + containerPadding;
            currY += blockHeight + padding.y;
        }
        //Add rect for new packet
        container
        .call(t)
        .append("rect")
        .attr("width",currWidth)
        .attr("height",blockHeight)
        .attr("x",currX)
        .attr("y",currY)
        .attr("class","databaseVisPacket")
        .on("mouseover",function(){
            //Remove all other zoomed packets
            d3.selectAll(".ZOOMED")
            .remove();
            //Add new rect on hover
            container.append("rect")
            .attr("width",this.getBBox().width + zoomFactor)
            .attr("height",this.getBBox().height + zoomFactor)
            .attr("x",this.getBBox().x - (zoomFactor / 2))
            .attr("y",this.getBBox().y - (zoomFactor / 2))
            //When focus is lost remove hover
            .on("mouseout",function(){
                d3.selectAll(".ZOOMED")
                .remove();
            })
            //On select go to packet page
            .on("click",function(){
                onclick(packet);
            })
            .attr("class","databaseVisPacket ZOOMED")
            .style("fill",t.url());
        })
        .style("fill",t.url());

        currX += currWidth + padding.x;
    });

    //Give container the correct height
    container.attr("height",currY + blockHeight + padding.y + containerPadding);
}

/**
* Draws a block of the key in a dom element
* @param {object} domElement The element to draw the packet in
* @param {string} type The type of the block to draw
* @param {string} text The text to render for this block of the key
*/
function buildKeyBlock( domElement, type, text ){
    var keyBlockWidth = 40;
    var keyBlockHeight = 40;
    //Create d3 key
    var keyContainer = d3.select( domElement )
    .append("div");

    keyContainer.append("svg")
    .attr("width",keyBlockWidth + 4)
    .attr("height",keyBlockHeight + 4)
    .call(packetTextures[type])
    .append("rect")
    .attr("width",keyBlockWidth)
    .attr("height",keyBlockHeight)
    .attr("x",2)
    .attr("y",2)
    .style("fill",packetTextures[type].url());
    keyContainer.append("p")
    .html(text);
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

    //Build key
    buildKeyBlock(packetsVisKey,"tcp","TCP packet");
    buildKeyBlock(packetsVisKey,"udp","UDP packet");
    buildKeyBlock(packetsVisKey,"other","other");

    //Get requested packets
    request.getJSON("/packets.json?count="+filters.count,function(error,packets){
        if( error ){
            console.error(error);
        }else{
            //Set number of packets
            packetsVisCount.innerHTML = packets.length+" packets";
            //Set date range of packets
            packetsVisDates.innerHTML = time.timestampToDate(packets[packets.length-1].timestamp)+" to "+time.timestampToDate(packets[0].timestamp);
            // packets.forEach(function(packet){
            //     drawPacket(packetsVisContainer, packet, onclick);
            // });
            drawPackets(packetsVisContainer, packets, onclick);
        }
    });
}
module.exports.build = build;
