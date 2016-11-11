const captureHTML = require("html-loader!../../html/capture/capture.html");
/**
* Builds the capture module for the main content section
* @param {object} domElement The element to render new html in
* @param {function} startCap Method to start capturing
* @param {function} stopCap Method to stop capturing
*/
function build( domElement, startCap, stopCap ){
    domElement.innerHTML = captureHTML;
    var captureButton = document.getElementById("captureButton");
    var capturing = false;
    captureButton.onclick = function(){
        if( capturing ){
            captureButton.innerHTML = "Start Capture";
            stopCap();
            capturing = false;
        }else{
            captureButton.innerHTML = "Stop Capture";
            startCap();
            capturing = true;
        }
    }
}

module.exports.build = build;
