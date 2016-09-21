var pacCap = require("../../pacCap/build/Release/pacCap");
var sideBar = require("./sideBar/sideBar.js");
//Add css styling
require("!style!css!../css/main.css");
//Build SideBar
sideBar();

// function run(){
//     pacCap.start(function(response, error){
//         if( !error ){
//             console.log("Captured packet of size",response);
//         }else{
//             console.log(error);
//         }
//     });
//
//     console.log("running");
//     return true;
// }
//
// function close(){
//     console.log("closing");
//     pacCap.close();
//     return true;
// }
