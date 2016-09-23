require("file?name=[name].[ext]!../html/index.html");
var sideBar = require("./sideBar/sideBar.js");
//Add css styling
require("!style!css!../css/main.css");
//Build SideBar
sideBar(function(response, error){
    if( !error ){
        if( response ){
            console.log("Captured ",response.length," packets");
        }
    }else{
        console.log(error);
    }
});
