const d3 = require("d3");
const time = require("../utils/time");
const hex = require("../utils/hex");
const packetHeaderDesc = require("./packetHeaderDesc");
//Add css styling
require("!style!css!../../css/packet.css");
const packetTemplate = require("html-loader!../../html/packet/packetTemplate.html");
/**
* Draws a header visualization in a dom element
* @param {object} domElement Element to draw header in
* @param {object} packet Packet to get data from when drawing header
* @param {object} headerDesc The description of how the header should be drawn
* and shaded
* @param {int} bytes The number of bytes to have across the top of the header
* @param {int} blockHeight The height in pixels of each block in the header
*/
function drawHeader( domElement, packet, headerDesc, bytes, blockHeight ){
    //Header height in px
    var headerHeight = 0;
    var currYPos = 0;
    var currXPos = 0;

    headerDesc.forEach( function( block ){
        headerHeight += block.size;
    });

    headerHeight = Math.ceil( headerHeight / bytes ) * blockHeight + "px";

    var svg = d3.select(domElement)
        .append("svg")
        .attr("width","100%")
        .attr("height", headerHeight)
        .attr("class","headerVisContainer");

    headerDesc.forEach(function( block ){
        var blockBytes = block.size;
        var width = 0;
        var height = 0;
        var x = 0;
        var y = 0;
        var text;
        var rect;

        if( blockBytes >= bytes - currXPos ){
            textX = ( currXPos / bytes ) * 100 + ( ( ( bytes - currXPos ) / bytes ) * 100 ) / 2 + "%";
        }else{
            textX = ( currXPos / bytes ) * 100 + ( ( blockBytes / bytes ) * 100 ) / 2 + "%";
        }
        var textY = currYPos + blockHeight / 2 + "px";

        while( blockBytes > 0 ){
            //Check if the current block can fit on line without being divided
            if( blockBytes >= bytes - currXPos ){
                blockBytes -= bytes - currXPos;
                //Get width in percentile
                width = ( ( bytes - currXPos ) / bytes ) * 100;
                //Get height as pixel value
                height = blockHeight;
                //Get x position in percentile
                x = ( currXPos / bytes ) * 100;
                //Get y as pixel value
                y = currYPos;
                currYPos += blockHeight;
                currXPos = 0;
            }else{
                //Get width in percentile
                width = ( blockBytes / bytes ) * 100;
                //Get height as pixel value
                height = blockHeight;
                //Get x position in percentile
                x = ( currXPos / bytes ) * 100;
                //Get y as pixel value
                y = currYPos;

                currXPos += blockBytes;
                blockBytes = 0;
            }
            //Draw block
            svg.call(block.texture);
            rect = svg.append("rect")
                .attr("x",x + "%")
                .attr("y",y + "px")
                .attr("width",width + "%")
                .attr("height",height + "px")
                .attr("class","packetBlock");
            if( typeof(packet[block.field]) == "undefined" ){
                rect.style("fill","black");
            }else{
                rect.style("fill",block.texture.url());
            }
        }
        //Add background first so its behind text element
        textBackground = svg.append("rect");

        //Add text
        text = svg.append("text")
            .attr("x", textX )
            .attr("y", textY )
            .attr("dy", ".35em")
            // .attr("style","z-index:40;")
            .style("text-anchor", "middle")
            .attr("class","packetBlockText");
                // console.log(typeof(packet[block.field]));
        if( typeof(packet[block.field]) == "undefined" || typeof(packet[block.field]) == "boolean" ){
            text.text(block.name);
        }else{
            text.text(block.name+": "+packet[block.field]);
        }
    });
}
/**
* Builds the packet visualization
* @param {object} domElement Element to packet header in
* @param {object} packet Packet to get data from
*/
function build( domElement, packet ){
    domElement.innerHTML = packetTemplate;
    var packetTimestamp = document.getElementById("packetTimestamp");
    var packetVisContainer = document.getElementById("packetVisContainer");
    var showBytes = document.getElementById("showBytes");
    var showHex = document.getElementById("showHex");
    var showAscii = document.getElementById("showAscii");
    var ethernetHeader = document.createElement("div");
    var ipHeader = document.createElement("div");
    var tcpHeader = document.createElement("div");
    var packetDataWrapper = document.createElement("div");
    var packetData = document.createElement("p");

    //Number of bytes to put across the top of the packet vis
    var bytes = 4;
    //Height of a block in the packet vis
    var blockHeight = 40;

    packetDataWrapper.className += "packetDataWrapper";
    packetTimestamp.innerHTML = time.timestampToDate( packet.timestamp );

    packetVisContainer.appendChild(ethernetHeader);
    packetVisContainer.appendChild(ipHeader);
    packetVisContainer.appendChild(tcpHeader);
    packetDataWrapper.appendChild(packetData);
    packetVisContainer.appendChild(packetDataWrapper);
    //Draw ethernet header
    drawHeader( ethernetHeader, packet, packetHeaderDesc.ethernetHeader, bytes, blockHeight );
    //If its an ip packet draw ip header
    if( packet.etherType === 8 ){
        drawHeader( ipHeader, packet, packetHeaderDesc.ipHeader, bytes, blockHeight );
        //If its a tcp packet draw tcp header
        if( packet.ipType === 6 ){
            drawHeader( tcpHeader, packet, packetHeaderDesc.tcpHeader, bytes, blockHeight );
        }
    }

    packetData.innerHTML = hex.toAscii(packet.data);
    showBytes.onclick = function(){ packetData.innerHTML = hex.toBytes(packet.data); };
    showHex.onclick = function(){ packetData.innerHTML = packet.data.replace(/(.{2})/g,"$1 "); };
    showAscii.onclick = function(){ packetData.innerHTML = hex.toAscii(packet.data); };
}

module.exports.build = build;
