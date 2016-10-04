//Load html for the sidebar
var sideBarHTML = require("html-loader!../../html/sideBar/sideBar.html");
//Add css styling
require("!style!css!../../css/sideBar.css");
const capInfo = require("./capInfo");
const databaseInfo = require("./databaseInfo");


/**
* @param {object} domElement The element to render new html in
*/
function build( domElement ){
    var capContainer;
    var databaseInfoContainer;
    //Write sideBar to dom
    domElement.innerHTML = sideBarHTML;
    capContainer = document.getElementById("capContainer");
    databaseInfoContainer = document.getElementById("databaseInfoContainer");
    //Load startCap module
    capInfo.loadStartCap( capContainer );
    //Load databaseInfo module
    databaseInfo.loadDatabaseInfo( databaseInfoContainer );
}

module.exports.build = build;
