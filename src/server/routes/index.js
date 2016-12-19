const main = require("./main");
/**
* Sets all routes on a express app
* @param {function} app The express app to set routes to
*/
const setRoutes = function(app){
    //Error checking
    if( arguments.length < 1 ){
        throw "Error setRoutes must have at least 1 argument";
    }
    if( typeof app !== 'function'){
        throw "Error argument 1 of setRoutes must be a function";
    }
    //Set routes
    app.use("/", main);

    //Set all remaining routes to return 404
    app.use("*", function(req, res){
        res.status(404).json({error: "Not found"});
    });
};

module.exports = setRoutes;
