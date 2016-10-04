require("file?name=[name].[ext]!../html/index.html");
require("file?name=[name].[ext]!./main.js");

const sideBar = require("./sideBar/sideBar.js");
const packetDatabase = require("./database/packetDatabase.js");
//Add css styling
require("!style!css!../css/main.css");
var totalPackets;
//Build SideBar
sideBar(function(response, error){
    if( !error ){
        if( response ){
            packetDatabase.insertPacket( response, function(err,newPacket){
                if( err ){
                    console.err( err);
                }
            });
            packetDatabase.getNumPackets(function( err, count ){
                if(err){
                    console.err(err);
                }else{
                    totalPackets.innerHTML = count;
                }
            });
        }
    }else{
        console.log(error);
    }
});

totalPackets = document.getElementById("totalPackets");
packetDatabase.getNumPackets(function( err, count ){
    if(err){
        console.err(err);
    }else{
        totalPackets.innerHTML = count;
    }
});
