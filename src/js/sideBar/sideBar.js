//Package capture module
var pacCap = require("../../pacCap/build/Release/pacCap");
//Load html for the sidebar
var sideBarHTML = require("html-loader!../../html/sideBar/sideBar.html");
var startCapHTML = require("html-loader!../../html/sideBar/startCap.html");
var capInfoHTML = require("html-loader!../../html/sideBar/capInfo.html");
//Add css styling
require("!style!css!../../css/sideBar.css");

/**
* @param { object } The element to render new html in
* @param { function } The callback for pacCap module
*/
function loadStartCap( domElement, callback ){
    var startCap;
    //Set html to dom element
    domElement.innerHTML = startCapHTML;
    startCap = document.getElementById("startCap");
    //Set onclick listener
    startCap.getElementsByTagName("button")[0].onclick = function(){
        console.log( callback );
        //Start pacCap
        pacCap.start(callback);
        //Onclick load the capInfo module
        loadCapInfo(domElement,callback);
    }
}
/**
* @param { object } The element to render new html in
* @param { function } The callback for pacCap module
*/
function loadCapInfo( domElement, callback ){
    var capInfo;
    //Set html to dom element
    domElement.innerHTML = capInfoHTML;
    capInfo = document.getElementById("capInfo");
    //Set onclick listener
    capInfo.getElementsByTagName("button")[0].onclick = function(){
        console.log("closing");
        //close pacCap
        pacCap.close();
        //Onclick load the startCap module
        loadStartCap(domElement,callback);
    }
}
/**
* @param { function } The callback for pacCap module
*/
function buildSideBar( callback ){
    var capContainer;
    //Write sideBar to dom
    document.write( sideBarHTML );
    capContainer = document.getElementById("capContainer");
    //Load startCap module
    loadStartCap(capContainer,callback);

}

module.exports = buildSideBar;
