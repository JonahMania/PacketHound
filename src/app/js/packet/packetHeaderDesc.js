const textures = require("textures");

function etherTexture(background,foreground){
    return textures.lines()
    .lighter()
    .size(8)
    .stroke(foreground)
    .background(background);
}

function ipTexture(background,foreground){
    return textures.paths()
    .d("nylon")
    .lighter()
    .shapeRendering("crispEdges")
    .stroke(foreground)
    .background(background);
}

function tcpTexture(background,foreground){
    return textures.lines()
    .orientation("vertical")
    .lighter()
    .size(26)
    .stroke(foreground)
    .background(background);
}

let ethernetHeader = [
    {
        "name":"Src Mac",
        "size": 6,
        "field": "etherSrcAddr",
        "texture": etherTexture("#03a9f4","#01579b")
    },
    {
        "name":"Dest Mac",
        "size": 6,
        "field": "etherDestAddr",
        "texture": etherTexture("#f44336","#ffcdd2")
    },
    {
        "name":"Type",
        "size": 2,
        "field": "etherType",
        "texture": etherTexture("#cfd8dc","#607d8b")
    }
];

let ipHeader = [
    {
        "name":"Src IP",
        "size": 4,
        "field": "ipSrcAddr",
        "texture": ipTexture("#ffc107","#ffecb3")
    },
    {
        "name":"Dest IP",
        "size": 4,
        "field": "ipDestAddr",
        "texture": ipTexture("#9fa8da","#3f51b5")
    }
];

let tcpHeader = [
    {
        "name":"Src Port",
        "size": 2,
        "field": "tcpSrcPort",
        "texture": tcpTexture("#7c4dff","#ABB7B7")
    },
    {
        "name":"Dest Port",
        "size": 2,
        "field": "tcpDestPort",
        "texture": tcpTexture("#ffc107","#ffecb3")
    },
    {
        "name":"Sequence Number",
        "size": 4,
        "field": "tcpSeq",
        "texture": tcpTexture("#03a9f4","#01579b")
    },
    {
        "name":"Acknowledgment Number",
        "size": 4,
        "field": "tcpAck",
        "texture": tcpTexture("#cfd8dc","#607d8b")
    },
    {
        "name":"",
        "size": 0.5,
        "field": "",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"URG",
        "size": 0.25,
        "field": "tcpURG",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"PUSH",
        "size": 0.25,
        "field": "tcpPUSH",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"RST",
        "size": 0.25,
        "field": "tcpRST",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"SYN",
        "size": 0.25,
        "field": "tcpPUSH",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"ACK",
        "size": 0.25,
        "field": "tcpACK",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"FIN",
        "size": 0.25,
        "field": "tcpFIN",
        "texture": tcpTexture("#DADFE1","#ABB7B7")
    },
    {
        "name":"Window Size",
        "size": 2,
        "field": "tcpWindow",
        "texture": tcpTexture("#f44336","#ffcdd2")
    }
];

module.exports.ethernetHeader = ethernetHeader;
module.exports.ipHeader = ipHeader;
module.exports.tcpHeader = tcpHeader;
