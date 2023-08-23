import { app, ipcMain, shell, BrowserWindow, screen, Notification } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import useDB from './useDB'
// Custom APIs for DB
const { get, set } = useDB()

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const workArea = primaryDisplay.workAreaSize

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 260,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    transparent: true,
    toolbar: false,
    frame: false,
    alwaysOnTop: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    const bounds = {
      x: workArea.width - 400,
      y: workArea.height - 260,
      width: 400,
      height: 260
    }
    mainWindow.setBounds(bounds, true)
    mainWindow.show()
    new Notification({
      title: 'Welcome Master',
      body: 'I am ready to track your tasks.'
    }).show()
  })

  // Notification system
  ipcMain.on('notify', async (event, data) => {
    console.log()
    new Notification({
      title: data.title,
      body: data.body
    }).show()
  })

  // database get & set
  ipcMain.on('dbGet', async () => {
    const dbData = await get()
    mainWindow.webContents.send('dbData', dbData)
  })

  ipcMain.on('dbSet', async (event, data) => {
    const dbData = await set(data)
    mainWindow.webContents.send('dbData', dbData)
  })

  ipcMain.on('resize', (event, { x, y, width, height }) => {
    if (width === 0) width = 300
    if (height === 0) height = 200
    if (x === 0) x = workArea.width - width
    if (y === 0) y = workArea.height - height + 20
    mainWindow.setBounds({ x, y, width, height }, true)
  })

  ipcMain.on('taskWindow', () => {
    const bounds = {
      x: workArea.width - 400,
      width: 400,
      height: 260
    }
    mainWindow.setBounds(bounds, true)
  })

  ipcMain.on('reportWindow', () => {
    const bounds = {
      x: Math.round(workArea.width / 2 - 400),
      y: Math.round(workArea.height / 2 - 450),
      width: 650,
      height: 850
    }
    mainWindow.setBounds(bounds, true)
  })

  ipcMain.on('miniWindow', () => {
    const bounds = {
      x: workArea.width - 100,
      y: Math.round(workArea.height * 0.1),
      width: 100,
      height: 60
    }
    mainWindow.setBounds(bounds, true)
  })

  ipcMain.on('miniUnhoverWindow', () => {
    const bounds = {
      width: 100,
      height: 60
    }
    mainWindow.setBounds(bounds, true)
  })

  ipcMain.on('miniHoverWindow', () => {
    const bounds = {
      width: 100,
      height: 110
    }
    mainWindow.setBounds(bounds, true)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
