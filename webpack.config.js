module.exports = {
    entry:  './src/js/theHound/theHound.js',
    output: {
        path: 'src/build',
        filename: 'bundle.js',
    },
    externals: {
        "../../pacCap/build/Release/pacCap":"require('../../pacCap/build/Release/pacCap');"
    },
    module: {
        loaders: [
        ]
    }
};
