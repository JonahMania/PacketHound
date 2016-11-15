const router = require("express").Router();
const network = require("../utils/network");
const sessionDatabase = require("../../database/sessionDatabase");

router.get("/interfaces",function(req,res){
    res.status(200).json(network.getInterfaces());
});

router.get("/session",function(req,res){
    if( req.query.id === undefined ){
        res.status(500).json({"error":"parameter id is required"});
    }else{
        sessionDatabase.getSession( req.query.id, function(error,session){
            if( error ){
                res.status(500).json({"error":error.message});
            }else{
                res.status(200).json(session);
            }
        });
    }
});

module.exports = router;
