const express = require("express");
const bodyParser = require("body-parser");
const setRoutes = require("./routes");
const pacCap = require("../pacCap/build/Release/pacCap");
const packetDatabase = require("../database/packetDatabase");
const sessionDatabase = require("../database/sessionDatabase");
const network = require("./utils/network");

let app = express();
//Port to run the server on
let port = 3000;
//Get array of arguments
let argv = process.argv;
//Filters to run with pacCap
let filters = "";
//Verbose mode flag
let verbose = false;
//Flag to run pacCap
let capture = false;
//Device to pass to pcap
var device = "";
//Device that pcap is using
var captureDevice = {};
//All interfaces on the machine
var interfaces = network.getInterfaces();
//A map of all local devices on the network
var localDevices = {};
//Id of the current session
var sessionId = null;

//Get command line arguments
argv.forEach(function( arg, index ){
    switch (arg) {
        case "-f":
        case "-filters":
            filters = argv[index+1];
            break;
        case "-c":
        case "-capture":
            capture = true;
            break;
        case "-i":
        case "-interface":
            device = argv[index+1];
            break;
        case "-v":
        case "-verbose":
            verbose = true;
            break;
        default:
            break;
    }
});
if( capture ){
    //Start pacCap
    captureDevice = pacCap.start(function(packets,error){
        if( error ){
            console.error("ERROR: ",error);
        }else{
            packets.forEach(function(packet){
                if( packet.etherType === 8 && network.getLocalDevice( packet, captureDevice, localDevices ) ){
                    //Print data if verbose mode is selected
                    if( verbose ){
                        console.log( "New local devices found. Current device list:", localDevices );
                    }
                    //Update the device list in the session database
                    sessionDatabase.updateDevices(sessionId,localDevices,function(error,newDevices){
                        if(error){
                            console.error(error);
                        }
                    });
                }

            })
            if( packets != undefined ){
                //Insert packet into database
                packetDatabase.insertPacket(packets,function(error,response){
                    if( error ){
                        console.error( error );
                    }
                });
            }
        }
    }, filters, device);

    //Create new session
    sessionDatabase.createSession(String(Math.floor(new Date() / 1000)),function(error,newSession){
        if( error ){
            console.error(error);
        }else{
            sessionId = newSession._id;

            if( verbose ){
                console.log("New session created with id: ",newSession._id);
            }
            //Add the capture device to the session
            sessionDatabase.addSystemDevice( newSession._id, captureDevice, function( error, newDevice ){
                if( error ){
                    console.error(error);
                }
            });
        }
    });

    if( verbose ){
        console.log( "capturing on interface:", captureDevice.name );
    }
}

//Set server to parse data as json
app.use(bodyParser.json());
//Serve up static files
app.use(express.static('src/public'));
//Set routes
setRoutes(app);
//Start server
app.listen(port, function(){
    console.log("server listening on port " + port );
});

//Signal handler ( ctrl+c )
process.on( 'SIGINT', function(){
    if( capture ){
        sessionDatabase.endSession(sessionId,String(Math.floor(new Date() / 1000)),function(error,time){
            if(error){
                console.error(error);
            }
            pacCap.close();
            process.exit(0);
        });
    }else{
        process.exit(0);
    }
});
