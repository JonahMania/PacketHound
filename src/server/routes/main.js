const router = require("express").Router();
const packetDatabase = require("../../database/packetDatabase");
const network = require("../utils/network");
const sessionDatabase = require("../../database/sessionDatabase");
const path = require("path");
const file = require("../utils/file");
//Request for /database
router.get("/",function(req,res){
    res.redirect("/packets");
});
//Request for /database/packet?id=
router.get("/packet",function(req,res){
    res.status(200).sendFile(path.join(__dirname+'/../../public/packet.html'));
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
    res.status(200).sendFile(path.join(__dirname+'/../../public/packets.html'));
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
//Request for /database/database.json
router.get("/database.json",function(req,res){
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

router.get("/interfaces.json",function(req,res){
    res.status(200).json(network.getInterfaces());
});

router.get("/session.json",function(req,res){
    sessionDatabase.getSession( req.query.id, function(error,session){
        if( error ){
            res.status(500).json({"error":error.message});
        }else{
            res.status(200).json(session);
        }
    });
});

module.exports = router;
