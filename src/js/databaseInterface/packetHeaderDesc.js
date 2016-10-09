const textures = require("textures");

let ethernetHeader = [
    {
        "name":"Src Mac",
        "size": 6,
        "field": "etherSrcAddr",
        "texture": textures.lines()
        .lighter()
        .size(8)
        .stroke("#01579b")
        .background("#03a9f4")
    },
    {
        "name":"Dest Mac",
        "size": 6,
        "field": "etherDestAddr",
        "texture": textures.lines()
        .lighter()
        .size(8)
        .stroke("#ffcdd2")
        .background("#f44336")
    },
    {
        "name":"Type",
        "size": 2,
        "field": "etherType",
        "texture": textures.lines()
        .lighter()
        .size(8)
        .stroke("#607d8b")
        .background("#cfd8dc")
    }
];

let ipHeader = [
    {
        "name":"Src IP",
        "size": 4,
        "field": "ipSrcAddr",
        "texture": textures.paths()
        .d("nylon")
        .lighter()
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")

    },
    {
        "name":"Dest IP",
        "size": 4,
        "field": "ipDestAddr",
        "texture": textures.paths()
        .d("nylon")
        .lighter()
        .shapeRendering("crispEdges")
        .stroke("#3f51b5")
        .background("#9fa8da")
    }
];

let tcpHeader = [

];

module.exports.ethernetHeader = ethernetHeader;
module.exports.ipHeader = ipHeader;
module.exports.tcpHeader = tcpHeader;
