const textures = require("textures");

let ethernetHeader = [
    {
        "size": 6,
        "field": "srcMacAddr",
        "texture": textures.paths()
        .d("caps")
        .lighter()
        .thicker()
        .stroke("black")
        .background("white")
    },
    {
        "size": 6,
        "field": "destMacAddr",
        "texture": textures.paths()
        .d("caps")
        .lighter()
        .thicker()
        .stroke("blue")
        .background("white")
    },
    {
        "size": 2,
        "field": "destMacAddr",
        "texture": textures.paths()
        .d("caps")
        .lighter()
        .thicker()
        .stroke("red")
        .background("white")
    }
];

let ipHeader = [

];

let tcpHeader = [

];

module.exports.ethernetHeader = ethernetHeader;
module.exports.ipHeader = ipHeader;
module.exports.tcpHeader = tcpHeader;
