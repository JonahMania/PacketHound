var databaseInterfaceHTML = require("html-loader!../../html/databaseInterface/databaseInterface.html");
//Add css styling
require("!style!css!../../css/databaseInterface.css");
const databaseVis = require("./databaseVis");
/**
* @param {object} domElement The element to render new html in
*/
function build( domElement ){
    var databaseVisContainer;
    domElement.innerHTML = databaseInterfaceHTML;
    databaseVisContainer = document.getElementById("databaseVisContainer");
    databaseVis.build(databaseVisContainer);
}

module.exports.build = build;
