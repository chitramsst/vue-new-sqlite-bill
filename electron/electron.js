const { app, BrowserWindow, globalShortcut, ipcMain, dialog, protocol, net } = require('electron')
const path = require('path')
let mainWindow;
global.share = { app, ipcMain }
const isDev = process.env.IS_DEV == "true" ? true : false;

let { runSeeders } = require('./database/db.js');
let db = require('./database/db.js')()
require('./database/dbHandler')


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
  await readySqlite()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        return;
    }
  })
})

async function readySqlite() {
  return new Promise(async (resolve, reject) => {
    try {
      await db.sequelize.sync({ alter: { drop: false } });
      runSeeders();
      resolve()
    }
    catch (e) {
      resolve()
    }
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('print-window', async (event, params) => {
  let printWindow = new BrowserWindow({
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  if (params.type && params.type == 'old') {
    printWindow.loadFile(path.join(__dirname, '/html/print-old.html'));
  }
  else if (params.type && params.type == 'thermal') {
    printWindow.loadFile(path.join(__dirname, '/html/print-thermal.html'));
  }
  else {
    printWindow.loadFile(path.join(__dirname, '/html/print.html'));
  }

  await printWindow.webContents.on('did-finish-load', async () => {
    printWindow.webContents.send('print-this', params)
    await delay(500)
    printWindow.webContents.print({
      silent: true,
      ...params.settings
    }, () => {
      mainWindow.webContents.send('print-complete', 'done')
      printWindow.close()
    })
    return true;
  })
})


