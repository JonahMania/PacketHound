const d3 = require("d3");
const time = require("../utils/time");
const hex = require("../utils/hex");
const packetHeaderDesc = require("./packetHeaderDesc");

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
        var textX;
        var textBackground;
        //Padding around the text background rect in px
        var textBackgroundPadding = 6;

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
            svg.call(block.texture)
            .append("rect")
                .attr("x",x + "%")
                .attr("y",y + "px")
                .attr("width",width + "%")
                .attr("height",height + "px")
                .attr("class","packetBlock")
                .style("fill",block.texture.url());
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
            .attr("class","packetBlockText")
            .text(block.name+": "+packet[block.field]);
        text = text._groups[0][0].getBBox();
        //Set text background attributes
        textBackground.attr("x",text.x - textBackgroundPadding / 2 )
        .attr("y",text.y - textBackgroundPadding / 2)
        .attr("width",text.width + textBackgroundPadding)
        .attr("height",text.height + textBackgroundPadding)
        .style("fill",block.textBackground);

    });
}

function draw( domElement, packet ){

    var packetTimestamp = document.getElementById("packetTimestamp");
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
    domElement.innerHTML = "";
    domElement.appendChild(ethernetHeader);
    domElement.appendChild(ipHeader);
    domElement.appendChild(tcpHeader);
    packetDataWrapper.appendChild(packetData);
    domElement.appendChild(packetDataWrapper);

    drawHeader( ethernetHeader, packet, packetHeaderDesc.ethernetHeader, bytes, blockHeight );
    drawHeader( ipHeader, packet, packetHeaderDesc.ipHeader, bytes, blockHeight );
    drawHeader( tcpHeader, packet, packetHeaderDesc.tcpHeader, bytes, blockHeight );
    packetData.innerHTML = hex.toAscii(packet.data);
    showBytes.onclick = function(){ packetData.innerHTML = hex.toBytes(packet.data); };
    showHex.onclick = function(){ packetData.innerHTML = packet.data.replace(/(.{2})/g,"$1 "); };
    showAscii.onclick = function(){ packetData.innerHTML = hex.toAscii(packet.data); };

}

module.exports.draw = draw;
