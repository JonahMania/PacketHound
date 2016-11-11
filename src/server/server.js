const express = require("express");
const bodyParser = require("body-parser");
const setRoutes = require("./routes");

let app = express();
//Port to run the server on
let port = 3000;
//Set server to parse data as json
app.use(bodyParser.json());
//Serve up static files
app.use(express.static('src/public'));
//Set routes
setRoutes(app);
//Start server
app.listen(port, function(){
    console.log("server listening on http://localhost:" + port );
});
