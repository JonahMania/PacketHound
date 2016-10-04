//Package capture module
var pacCap = require("../../pacCap/build/Release/pacCap");
//Load html for the sidebar
var sideBarHTML = require("html-loader!../../html/sideBar/sideBar.html");
var startCapHTML = require("html-loader!../../html/sideBar/startCap.html");
var capInfoHTML = require("html-loader!../../html/sideBar/capInfo.html");
var databaseInfoHTML = require("html-loader!../../html/sideBar/databaseInfo.html");
//Add css styling
require("!style!css!../../css/sideBar.css");

/**
* @param {object} domElement The element to render new html in
* @param {function} callback The callback for pacCap module
*/
function loadStartCap( domElement, callback ){
    var startCap;
    //Set html to dom element
    domElement.innerHTML = startCapHTML;
    startCap = document.getElementById("startCap");
    //Set onclick listener
    startCap.getElementsByTagName("button")[0].onclick = function(){
        //Start pacCap
        pacCap.start(callback);
        //Onclick load the capInfo module
        loadCapInfo(domElement,callback);
    }
}
/**
* @param {object} domElement The element to render new html in
* @param {function} callback The callback for pacCap module
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
* Method to load the databaseinfo module
* @param {object} domElement The element to render new html in
*/
function loadDatabaseInfo( domElement ){
    domElement.innerHTML = databaseInfoHTML;
}
/**
* @param {function} callback The callback for pacCap module
*/
function buildSideBar( callback ){
    var capContainer;
    var databaseInfoContainer;
    //Write sideBar to dom
    document.getElementById("sideBar").innerHTML = sideBarHTML;
    capContainer = document.getElementById("capContainer");
    databaseInfoContainer = document.getElementById("databaseInfoContainer");
    //Load startCap module
    loadStartCap(capContainer,callback);
    //Load databaseInfo module
    loadDatabaseInfo( databaseInfoContainer );
    //Make sure that we close pcap when the user refreshes or leaves
    window.onbeforeunload = function (e) {
        console.log("closing");
        pacCap.close();
    }

}

module.exports = buildSideBar;
