const d3 = require("d3");
const textures = require("textures");
const packetDatabase = require("../database/packetDatabase");

var container;
/**
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
            d3.select(this)
            .attr("x",0)
            .attr("y",0)
            .attr("width",blockWidth)
            .attr("height",blockHeight);
        })
        .on("mouseout",function(){
            d3.select(this)
            .attr("x",padding)
            .attr("y",padding)
            .attr("width",blockWidth-padding*2)
            .attr("height",blockHeight-padding*2);
        })
        .attr("class","databaseVisPacket")
        .style("fill",t.url());
}
/**
* Builds the dataVis content
* @param {object} domElement The element to render new html in
* @param {functon} packetOnclick Functon to run when a packed is clicked takes
* on argument that will be the packet that has been selected
*/
function build( domElement, packetOnclick ){
    container = domElement;
    packetDatabase.getPackets(140,function(err,docs){
        if( !err ){
            docs.forEach(function(packet){
                drawPacket(container, packet, packetOnclick);
            });
        }else{
            console.error(err);
        }
    });
}

module.exports.build = build;
