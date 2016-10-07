require("file?name=[name].[ext]!../html/index.html");
require("file?name=[name].[ext]!./main.js");
//Package capture module
const pacCap = require("../../pacCap/build/Release/pacCap");
//Page modules
const sideBar = require("./sideBar/sideBar");
const capture = require("./capture/capture");
const databaseInterface = require("./databaseInterface/databaseInterface");
//Database module
const packetDatabase = require("./database/packetDatabase");
//Add css styling
require("!style!css!../css/main.css");
var contentElement = document.getElementById("content");
var sideBarElement = document.getElementById("sideBar");
//Method to start capturing packets
function startCap(){
    console.log("pacCap: starting");
    pacCap.start(function(response,error){
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
}
//Method to stop captuing packets
function stopCap(){
    console.log("pacCap: closing");
    pacCap.close();
}
//Build sideBar
sideBar.build(sideBarElement);
//Build capture content
// capture.build(contentElement,startCap,stopCap);
databaseInterface.build(contentElement);

sideBar.setCapInfoOnclick(function(){
    //Build capture content
    capture.build(contentElement,startCap,stopCap);
    document.getElementById("databaseInfoContainer").style["background-color"] = "#2b303b";
    document.getElementById("capContainer").style["background-color"] = "#21252d";
});

sideBar.setDatabaseInfoOnclick(function(){
    databaseInterface.build(contentElement);
    document.getElementById("capContainer").style["background-color"] = "#2b303b";
    document.getElementById("databaseInfoContainer").style["background-color"] = "#21252d";
});
//Make sure that we close pcap when the user refreshes or leaves
window.onbeforeunload = function (e) {
    console.log("pacCap: closing");
    pacCap.close();
}
