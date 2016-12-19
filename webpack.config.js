const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        packet:'./src/app/js/packet/packet.js',
        packets:'./src/app/js/packets/packets.js'
    },
    output: {
        path: 'src/public',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
           d3: './node_modules/d3/build/d3'
       })
    ],
    resolve: {
        root: path.resolve(__dirname),
            alias: {
            //Use this to point d3 requires to the correct d3 file
            d3: 'node_modules/d3/build/d3',
        }
    },
    target: 'node'
};
