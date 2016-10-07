//Load html for the sidebar
var sideBarHTML = require("html-loader!../../html/sideBar/sideBar.html");
//Add css styling
require("!style!css!../../css/sideBar.css");

var capContainer;
var databaseInfoContainer;

/**
* @param {object} domElement The element to render new html in
*/
function build( domElement ){
    //Write sideBar to dom
    domElement.innerHTML = sideBarHTML;
    capContainer = document.getElementById("capContainer");
    databaseInfoContainer = document.getElementById("databaseInfoContainer");
}
/**
* Sets an onclick event to the capInfo box
* @param {function} clickEvent Function to run when the capInfo box is clicked
*/
function setCapInfoOnclick( clickEvent ){
    capContainer.onclick = function(){
        clickEvent();
    }
}
/**
* Sets an onclick event to the databaseInfo box
* @param {function} clickEvent Function to run when the databaseInfo box is clicked
*/
function setDatabaseInfoOnclick( clickEvent ){
    databaseInfoContainer.onclick = function(){
        clickEvent();
    }
}

module.exports.build = build;
module.exports.setCapInfoOnclick = setCapInfoOnclick;
module.exports.setDatabaseInfoOnclick = setDatabaseInfoOnclick;
