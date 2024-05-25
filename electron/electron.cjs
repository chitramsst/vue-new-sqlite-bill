const { app, BrowserWindow, globalShortcut, ipcMain, dialog, protocol, net } = require('electron')
const path = require('path')
let mainWindow;
global.share = { app, ipcMain }
const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar : true,
    width: 1500,
    height: 900,
    minHeight: 900,
    minWidth: 1200,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev ? true : false
    }
  })
  mainWindow.setMenu(null)
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  );
  if (isDev) {
    mainWindow.openDevTools()
  }
}

app.whenReady().then(async () => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        return;
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})