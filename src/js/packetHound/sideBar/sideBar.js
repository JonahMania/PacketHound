//Load html for the sidebar
var sideBar = require("../../../html/sideBar/sideBar.html");
//Add css styling
// require("../../../css/sideBar.css");

function buildSideBar(){
    //Write sideBar to dom
    document.write( sideBar );
}

module.exports = buildSideBar;
