const textures = require("textures");

var tcp = textures
    .lines()
    .lighter()
    .thicker()
    .stroke("#ffa726")
    .background("#ffe0b2");

var udp = textures
    .paths()
    .d("crosses")
    .lighter()
    .thicker()
    .stroke("#5c6bc0")
    .background("#c5cae9");

var other = textures
    .circles()
    .size(5)
    .stroke("black");

module.exports.tcp = tcp;
module.exports.udp = udp;
module.exports.other = other;