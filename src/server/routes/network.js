const router = require("express").Router();
const network = require("../utils/network");

router.get("/interfaces",function(req,res){
    res.status(200).json(network.getInterfaces());
});

module.exports = router;
