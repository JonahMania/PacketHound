/**
* Gets JSON data from a url
* @param {string} url The url to grab data from
* @param {function} callback Function to run when response is returned takes
* arguments error and response
*/
function getJSON( url, callback ){
    var request = new XMLHttpRequest();
    request.open("get", url, true);
    request.responseType = "json";
    request.onload = function() {
    var status = request.status;
        if (status == 200) {
            callback(null, request.response);
        } else {
            callback(status, null);
        }
    };
    request.send();
}

module.exports.getJSON = getJSON;
