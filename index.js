const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

app.on('ready', () => {
    splashWindow = new BrowserWindow({
        width: 500,
        height: 850,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    splashWindow.loadFile('loading.html'); // pantalla de carga

    mainWindow = new BrowserWindow({
        width: 500,
        height: 850,
        icon: path.join(__dirname, 'calc.ico'),
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'licenseMIT.js'),
            nodeIntegration: true,
            devTools: false,
        },
        resizable: false,
    });

    mainWindow.loadFile('index.html');

    const { Menu } = require('electron');
    Menu.setApplicationMenu(null);

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (
            input.key === 'F12' || 
            (input.control && input.shift && input.key.toLowerCase() === 'i') || 
            (input.key.toLowerCase() === 'f4' && input.alt)
        ) {
            event.preventDefault();
        }
    });

    setTimeout(() => {
        splashWindow.webContents.executeJavaScript(`
            document.body.style.transition = 'opacity 1s';
            document.body.style.opacity = '0';
        `);

        setTimeout(() => {
            splashWindow.close();
            mainWindow.show();
        }, 1000);
    }, 4000);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
