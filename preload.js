// ============================================
// FILE: preload.js (Electron Preload Script)
// Secure bridge between main and renderer process
// ============================================

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // File operations
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content) => ipcRenderer.invoke('dialog:saveFile', content),
  saveFileAs: (content) => ipcRenderer.invoke('dialog:saveFileAs', content),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  
  // App info
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  
  // Receive system fonts
  onSystemFonts: (callback) => {
    ipcRenderer.on('system-fonts', (event, fonts) => callback(fonts));
  },
  
  // Development
  toggleDevTools: () => ipcRenderer.send('devtools:toggle'),
  
  // Check if running in Electron
  isElectron: true
});
