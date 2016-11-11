const textures = require("textures");

let ethernetHeader = [
    {
        "name":"Src Mac",
        "size": 6,
        "field": "etherSrcAddr",
        "textBackground":"#03a9f4",
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
        "textBackground":"#f44336",
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
        "textBackground":"#cfd8dc",
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
        "textBackground":"#ffc107",
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
        "textBackground":"#9fa8da",
        "texture": textures.paths()
        .d("nylon")
        .lighter()
        .shapeRendering("crispEdges")
        .stroke("#3f51b5")
        .background("#9fa8da")
    }
];

let tcpHeader = [
    {
        "name":"Src Port",
        "size": 2,
        "field": "tcpSrcPort",
        "textBackground":"#fdd835",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .stroke("#f57f17")
        .background("#fdd835")
    },
    {
        "name":"Dest Port",
        "size": 2,
        "field": "tcpDestPort",
        "textBackground":"#536dfe",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .stroke("#8c9eff")
        .background("#536dfe")
    }
];

module.exports.ethernetHeader = ethernetHeader;
module.exports.ipHeader = ipHeader;
module.exports.tcpHeader = tcpHeader;
