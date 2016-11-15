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
//Device that pacCap is running on
var device = "";
//A map of all local devices on the network
var localDevices = {};

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
    //Create new session
    // sessionDatabase.createSession(String(Math.floor(new Date() / 1000)),function(error,newSession){
    //     console.log("New session created with id: ",newSession._id);
    // });
    //Start pacCap
    device = pacCap.start(function(packets,error){
        if( error ){
            console.error("ERROR: ",error);
        }else{
            console.log( network.getLocalDevice( packets[0], device ) );
            //If verbose was requested print all incomming packets
            if( verbose ){
                packets.forEach(function(packet){
                    console.log( "captured packet of size:", packet.size );
                });
            }
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

    if( verbose ){
        console.log( "capturing on interface:", device );
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
        pacCap.close();
    }
    process.exit(0);
});
