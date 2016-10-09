const textures = require("textures");

let ethernetHeader = [
    {
        "name":"Src Mac",
        "size": 6,
        "field": "etherSrcAddr",
        "texture": textures.paths()
        .d("caps")
        .lighter()
        .thicker()
        .stroke("black")
        .background("white")
    },
    {
        "name":"Dest Mac",
        "size": 6,
        "field": "etherDestAddr",
        "texture": textures.paths()
        .d("caps")
        .lighter()
        .thicker()
        .stroke("blue")
        .background("white")
    },
    {
        "name":"Type",
        "size": 2,
        "field": "etherType",
        "texture": textures.paths()
        .d("caps")
        .lighter()
        .thicker()
        .stroke("red")
        .background("white")
    }
];

let ipHeader = [
    {
        "name":"Src IP",
        "size": 4,
        "field": "ipSrcAddr",
        "texture": textures.lines()
        .strokeWidth(1)
        .stroke("blue")
        .background("white")
    },
    {
        "name":"Dest IP",
        "size": 4,
        "field": "ipDestAddr",
        "texture": textures.lines()
        .strokeWidth(1)
        .stroke("red")
        .background("white")
    }
];

let tcpHeader = [

];

module.exports.ethernetHeader = ethernetHeader;
module.exports.ipHeader = ipHeader;
module.exports.tcpHeader = tcpHeader;
