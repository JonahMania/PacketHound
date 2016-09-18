var pacCap = require('../../../pacCap/build/Release/pacCap');

function run(){
    console.log("running");
}

function close(){
    console.log("closing");
}

module.exports.run = run;
module.exports.close = close;
