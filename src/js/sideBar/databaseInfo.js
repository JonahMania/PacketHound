var databaseInfoHTML = require("html-loader!../../html/sideBar/databaseInfo.html");
/**
* Method to load the databaseinfo module
* @param {object} domElement The element to render new html in
*/
function loadDatabaseInfo( domElement ){
    domElement.innerHTML = databaseInfoHTML;
}

module.exports.loadDatabaseInfo = loadDatabaseInfo;
