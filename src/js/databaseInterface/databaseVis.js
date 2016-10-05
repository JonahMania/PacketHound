const d3 = require("d3");
const textures = require("textures");
const packetDatabase = require("../database/packetDatabase");
/**
* @param {int} size The size of the packet to show
*/
function drawPacket( domElement, size ){

    var blockWidth = size / 2;
    var blockHeight = 40;
    var padding = 2;

    var t = textures
        .lines()
        .lighter()
        .thicker()
        .stroke("orange");

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
        .attr("class","databaseVisPacket")
        .style("fill",t.url());
}
/**
* Builds the dataVis content
* @param {object} domElement The element to render new html in
*/
function build( domElement ){
    packetDatabase.getPackets(100,function(err,docs){
        if( !err ){
            docs.forEach(function(packet){
                drawPacket(domElement, packet.size);
            });
        }else{
            console.error(err);
        }
    });

}


module.exports.build = build;
