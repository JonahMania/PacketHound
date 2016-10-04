const startCapHTML = require("html-loader!../../html/sideBar/startCap.html");
const capInfoHTML = require("html-loader!../../html/sideBar/capInfo.html");
/**
* @param {object} domElement The element to render new html in
*/
function loadStartCap( domElement ){
    //Set html to dom element
    domElement.innerHTML = startCapHTML;
}
/**
* @param {object} domElement The element to render new html in
*/
function loadCapInfo( domElement ){
    //Set html to dom element
    domElement.innerHTML = capInfoHTML;
}

module.exports.loadStartCap = loadStartCap;
module.exports.loadCapInfo = loadCapInfo;
