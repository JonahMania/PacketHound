const {app, BrowserWindow} = require('electron')

let win

function createWindow() {
    win = new BrowserWindow({width: 1024, height: 768})

    win.loadURL(`file://${__dirname}/../html/index.html`);
    win.on('closed', function(){
        win = null
    });
};

app.on('ready', function(){
    createWindow();
});

app.on('window-all-closed', function(){
    app.quit()
});
