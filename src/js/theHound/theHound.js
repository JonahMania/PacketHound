var pacCap = require("../../pacCap/build/Release/pacCap");

function run(){
    pacCap.start(function(response, error){
        if( !error ){
            console.log("Captured packet of size",response);
        }else{
            console.log(error);
        }
    });

    console.log("running");
    return true;
}

function close(){
    console.log("closing");
    // pacCap.close();
    return true;
}
