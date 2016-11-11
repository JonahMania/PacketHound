const router = require("express").Router();
const packetDatabase = require("../../database/packetDatabase");
const path = require("path");
const file = require("../utils/file");
//Request for /database
router.get("/",function(req,res){
    res.status(200).sendFile(path.join(__dirname+'/../../public/database/database.html'));
});
//Request for /database/packet?id=
router.get("/packet",function(req,res){
    res.status(200).sendFile(path.join(__dirname+'/../../public/database/packet.html'));
});
//Request for /database/packet/json?id=
router.get("/packet.json",function(req,res){
    packetDatabase.getPacketById( req.query.id, function(error,packet){
        if( error ){
            res.status(500).json({"error":error.message});
        }else{
            res.status(200).json(packet);
        }
    });
});
//Request for /database/packets
router.get("/packets",function(req,res){
    res.status(200).sendFile(path.join(__dirname+'/../../public/database/packets.html'));
});
//Request for /database/packets/json?num=
router.get("/packets.json",function(req,res){
    if( req.query.count === undefined ){
        res.status(500).json({"error":"parameter count is required"});
    }
    else if( isNaN( req.query.count ) ){
        res.status(500).json({"error":"count must be of type number"});
    }else{
        packetDatabase.getPackets( req.query.count, function(error,packets){
            if( error ){
                res.status(500).json({"error":error.message});
            }else{
                res.status(200).json(packets);
            }
        });
    }
});
//Request for /database/metadata.json
router.get("/metadata.json",function(req,res){
    packetDatabase.getNumPackets( function(error,count){
        if( error ){
            res.status(500).json({"error":error.message});
        }else{
            res.status(200).json({
                "packetDatabaseSize":file.getSize(path.join(__dirname+'/../../../databases/packets.db')),
                "totalPackets":count
            });
        }
    });
});

module.exports = router;
