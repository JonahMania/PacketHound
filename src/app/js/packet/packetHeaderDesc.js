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
    {
        "name":"Src Port",
        "size": 2,
        "field": "tcpSrcPort",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#f57f17")
        .background("#fdd835")
    },
    {
        "name":"Dest Port",
        "size": 2,
        "field": "tcpDestPort",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#8c9eff")
        .background("#536dfe")
    },
    {
        "name":"Sequence Number",
        "size": 4,
        "field": "tcpSeq",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#69f0ae")
        .background("#00c853")
    },
    {
        "name":"Acknowledgment Number",
        "size": 4,
        "field": "tcpAck",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#eeeeee")
        .background("#bdbdbd")
    },
    {
        "name":"",
        "size": 0.5,
        "field": "",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"URG",
        "size": 0.25,
        "field": "tcpURG",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"PUSH",
        "size": 0.25,
        "field": "tcpPUSH",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"RST",
        "size": 0.25,
        "field": "tcpRST",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"SYN",
        "size": 0.25,
        "field": "tcpPUSH",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"ACK",
        "size": 0.25,
        "field": "tcpACK",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"FIN",
        "size": 0.25,
        "field": "tcpFIN",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffecb3")
        .background("#ffc107")
    },
    {
        "name":"Window Size",
        "size": 2,
        "field": "tcpWindow",
        "texture": textures.lines()
        .orientation("vertical")
        .strokeWidth(1)
        .size(24)
        .shapeRendering("crispEdges")
        .stroke("#ffab91")
        .background("#ff7043")
    }
];

module.exports.ethernetHeader = ethernetHeader;
module.exports.ipHeader = ipHeader;
module.exports.tcpHeader = tcpHeader;
