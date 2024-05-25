const {
    contextBridge,
    ipcRenderer
  } = require("electron");
  
  window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })
  
  contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => {
      let validChannels = [] // <-- Array of all ipcRenderer Channels used in the client
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data)
      }
    },
    receive: (channel, func) => {
      let validChannels = [] // <-- Array of all ipcMain Channels used in the electron
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
    once: (channel, func) => {
      let validChannels = [] // <-- Array of all ipcMain Channels used in the electron
      if (validChannels.includes(channel)) {
        ipcRenderer.once(channel, (event, ...args) => func(...args))
      }
    },
    invoke: (channel, data) => {
      let validChannels = [];  // <-- Array of all ipcMain Channels used in the electron
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
    }
  })
  
  contextBridge.exposeInMainWorld('envVars', {
    isDev: process.env.IS_DEV == "true" ? true : false
  });