const d3 = require("d3");
const textures = require("textures");
const packetHeaderDesc = require("./packetHeaderDesc");

function drawHeader( domElement, packet, headerDesc, bytes, blockHeight ){

}

function draw( domElement, packet ){
    var ethernetHeader = document.createElement("div");
    var ipHeader = document.createElement("div");
    var tcpHeader = document.createElement("div");
    var packetData = document.createElement("div");
    //Number of bytes to put across the top of the packet vis
    var bytes = 4;
    //Header height in px
    var headerHeight = 0;

    var blockHeight = 40;

    var currHeight = 0;
    var currYPos = 0;
    var currXPos = 0;

    domElement.innerHTML = "";
    domElement.appendChild(ethernetHeader);
    domElement.appendChild(ipHeader);
    domElement.appendChild(tcpHeader);
    domElement.appendChild(packetData);

    drawHeader( ethernetHeader, packet, packetHeaderDesc.ethernetHeader, bytes, blockHeight );

    packetHeaderDesc.ethernetHeader.forEach( function( block ){
        headerHeight += block.size;
    });

    headerHeight = Math.ceil( headerHeight / bytes ) * blockHeight + "px";

    var svg = d3.select(ethernetHeader)
        .append("svg")
        .attr("width","100%")
        .attr("height", headerHeight)
        .attr("class","headerVisContainer");

    packetHeaderDesc.ethernetHeader.forEach(function( block ){
        var blockBytes = block.size;
        var width = 0;
        var height = 0;
        var x = 0;
        var y = 0;

        while( blockBytes > 0 ){
            //Check if the current block can fit on line without being divided
            if( blockBytes >= bytes - currXPos ){
                blockBytes -= bytes - currXPos;
                //Get width in percentile
                width = ( ( bytes - currXPos ) / bytes ) * 100 + "%";
                //Get height as pixel value
                height = blockHeight + "px";
                //Get x position in percentile
                x = ( currXPos / bytes ) * 100 + "%";
                //Get y as pixel value
                y = currYPos + "px";
                //Draw block
                svg.call(block.texture)
                .append("rect")
                    .attr("x",x)
                    .attr("y",y)
                    .attr("width",width)
                    .attr("height",height)
                    .attr("class","packetBlock")
                    .style("fill",block.texture.url());

                currYPos += blockHeight;
                currXPos = 0;
            }else{
                //Get width in percentile
                width = ( blockBytes / bytes ) * 100 + "%";
                //Get height as pixel value
                height = blockHeight + "px";
                //Get x position in percentile
                x = ( currXPos / bytes ) * 100 + "%";
                //Get y as pixel value
                y = currYPos + "px";
                //Draw block
                svg.call(block.texture)
                .append("rect")
                    .attr("x",x)
                    .attr("y",y)
                    .attr("width",width)
                    .attr("height",height)
                    .attr("class","packetBlock")
                    .style("fill",block.texture.url());
                currXPos += blockBytes;
                blockBytes = 0;
            }
        }
    });
}

module.exports.draw = draw;
