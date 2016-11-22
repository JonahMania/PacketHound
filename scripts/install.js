const webpack = require("webpack");
const nodeGyp = require("node-gyp");
const exec = require('child_process').exec;
const config = require("../webpack.config.js");

//Set webpack compiler config to root config for webpack
var compiler = webpack(config);
//Run node-gyp configure for pacCap
console.log("Configuring pacCap...");
exec('node-gyp configure',{cwd:"src/pacCap"}, function(error, stdout, stderr){
    if (error) {
        console.error(error);
    }else{
        console.log(stdout);
        console.log(stderr);
        console.log("Configure finished");
        console.log("Building pacCap...");
        //Run node-gyp build for pacCap
        exec('node-gyp build',{cwd:"src/pacCap"}, function(error, stdout, stderr){
            if (error) {
                console.error(error);
            }else{
                console.log(stdout);
                console.log(stderr);
                console.log("Build finished");
                // Run webpack compiler
                console.log("Building app...");
                compiler.run(function(error, stats) {
                    if(error){
                        console.error(error);
                    }else{
                        console.log("Build finished");
                    }
                });
            }
        });
    }
});

