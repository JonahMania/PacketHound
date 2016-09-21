//Load html for the sidebar
var sideBarHTML = require("html-loader!../../html/sideBar/sideBar.html");
//Add css styling
require("!style!css!../../css/sideBar.css");

function buildSideBar(){
    // console.log( sideBarCSS );s
    //Write sideBar to dom
    document.write( sideBarHTML );
}

module.exports = buildSideBar;
