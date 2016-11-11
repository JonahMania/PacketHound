const express = require("express");
const bodyParser = require("body-parser");
const setRoutes = require("./routes");
const pacCap = require("../pacCap/build/Release/pacCap");
const packetDatabase = require("../database/packetDatabase");

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
    pacCap.start(function(packets,error){
        if( error ){
            console.error("ERROR: ",error);
        }else{
            //If verbose was requested print all incomming packets
            if( verbose ){
                console.log( packet );
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
    }, filters);
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
