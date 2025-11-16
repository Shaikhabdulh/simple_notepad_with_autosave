// ============================================
// FILE: main.js (Electron Main Process)
// For Desktop Application Version
// ============================================

const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Disable GPU acceleration to avoid warnings
app.disableHardwareAcceleration();

let mainWindow;
let currentFilePath = null;

// Get system fonts (cross-platform)
function getSystemFonts() {
  const os = require('os');
  const platform = os.platform();
  const { execSync } = require('child_process');
  
  if (platform === 'win32') {
    // Windows: Read from registry
    try {
      const fonts = execSync('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts" /s', { encoding: 'utf8' });
      const fontList = new Set();
      fonts.split('\n').forEach(line => {
        const match = line.match(/^\s*(.*?)\s+REG_SZ\s+(.*)$/);
        if (match && match[1] && !match[1].includes('(TrueType)')) {
          const fontName = match[1].replace(/\s*\(.*?\)$/, '').trim();
          if (fontName) {
            fontList.add(fontName);
          }
        }
      });
      return Array.from(fontList).sort();
    } catch (e) {
      console.error('Error getting Windows fonts:', e);
      return getDefaultFonts();
    }
  } else if (platform === 'darwin') {
    // macOS: Use system command
    try {
      const fonts = execSync('system_profiler SPFontsDataType | grep "name:"', { encoding: 'utf8' });
      const fontList = new Set();
      fonts.split('\n').forEach(line => {
        const match = line.match(/name:\s*(.*)/);
        if (match && match[1]) {
          const fontName = match[1].trim();
          if (fontName) {
            fontList.add(fontName);
          }
        }
      });
      return Array.from(fontList).sort();
    } catch (e) {
      console.error('Error getting macOS fonts:', e);
      return getDefaultFonts();
    }
  } else {
    // Linux: Use fontconfig
    try {
      const fonts = execSync('fc-list :family', { encoding: 'utf8' });
      const fontList = new Set();
      fonts.split('\n').forEach(line => {
        const match = line.match(/^([^:]+):/);
        if (match && match[1]) {
          const fontName = match[1].trim();
          if (fontName) {
            fontList.add(fontName);
          }
        }
      });
      return Array.from(fontList).sort();
    } catch (e) {
      console.error('Error getting Linux fonts:', e);
      return getDefaultFonts();
    }
  }
}

// Default fonts for all systems
function getDefaultFonts() {
  return [
    'Arial',
    'Calibri',
    'Comic Sans MS',
    'Consolas',
    'Courier New',
    'Fira Code',
    'Georgia',
    'Helvetica',
    'Impact',
    'JetBrains Mono',
    'Lato',
    'Lucida Console',
    'Menlo',
    'Microsoft Sans Serif',
    'Monaco',
    'Montserrat',
    'Open Sans',
    'Palatino',
    'Playfair Display',
    'Roboto',
    'Source Code Pro',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Ubuntu',
    'Verdana'
  ];
}

// Create the main application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false, // Custom frameless window
    titleBarStyle: 'hidden',
    backgroundColor: '#ffffff',
    show: false
  });

  mainWindow.loadFile('index.html');
  
  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  
  // Send system fonts to renderer when ready
  mainWindow.webContents.once('did-finish-load', () => {
    const systemFonts = getSystemFonts();
    mainWindow.webContents.send('system-fonts', systemFonts);
  });

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Initialize the application when Electron is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Handle application closing
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers

// Open file dialog
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt', 'md', 'note'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (canceled) {
    return null;
  }

  const filePath = filePaths[0];
  const content = fs.readFileSync(filePath, 'utf8');
  currentFilePath = filePath;
  
  return {
    path: filePath,
    name: path.basename(filePath),
    content
  };
});

// Save file
ipcMain.handle('dialog:saveFile', async (event, content) => {
  if (currentFilePath) {
    fs.writeFileSync(currentFilePath, content, 'utf8');
    return {
      success: true,
      path: currentFilePath,
      name: path.basename(currentFilePath)
    };
  } else {
    return await saveFileAs(content);
  }
});

// Save file as
ipcMain.handle('dialog:saveFileAs', async (event, content) => {
  return await saveFileAs(content);
});

// Helper function for "Save As" dialog
async function saveFileAs(content) {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    defaultPath: 'untitled.txt',
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'Note Files', extensions: ['note'] }
    ]
  });

  if (canceled) {
    return { success: false };
  }

  fs.writeFileSync(filePath, content, 'utf8');
  currentFilePath = filePath;
  
  return {
    success: true,
    path: filePath,
    name: path.basename(filePath)
  };
}

// Window controls
ipcMain.on('window:minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window:close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

// Get app version
ipcMain.handle('app:getVersion', () => {
  return app.getVersion();
});

// Development tools
if (process.env.NODE_ENV === 'development') {
  ipcMain.on('devtools:toggle', () => {
    if (mainWindow) {
      mainWindow.webContents.toggleDevTools();
    }
  });
}
