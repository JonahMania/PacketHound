module.exports = {
    entry:  './src/js/packetHound.js',
    output: {
        path: 'src/build',
        filename: 'bundle.js',
    },
    externals: {
        'electron': 'require("electron")',
        "../../pacCap/build/Release/pacCap":"require('../../pacCap/build/Release/pacCap');"
    },
    module: {
        loaders: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    target: 'node'
};
