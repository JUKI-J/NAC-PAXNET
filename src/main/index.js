import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron' // eslint-disable-line
import logger from 'electron-log';

import mainService from '../service/mainService';
import userService from '../service/userService';
import configService from '../service/configService';
import User from '../model/user';
import Config from '../model/config';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * 설정 정보 로드, 1순위 config.db 2순위 config-default.db
   * 로그인 정보 로드, id저장이 체크 되어있는경우만
   * const getTotCnt = async () => database.user.count({}, (err, count) => count);
   *  // eslint-disable-line
   */

  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  /** refresh */
  globalShortcut.register('f5', () => {
    mainWindow.reload();
  });

  /** dev tools */
  globalShortcut.register('Ctrl+Shift+i', () => {
    mainWindow.webContents.toggleDevTools();
    setImmediate(() => (mainWindow.webContents.focus()));
  });

  /** focus main view */
  mainWindow.webContents.on('devtools-opened', () => (mainWindow.webContents.focus()));
}

/** return false : primary instance */
const gotTheLock = app.makeSingleInstance(() => {
  if (mainWindow) {
    logger.info('only for single instance');
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.reload();
    mainWindow.show();
  }
});

if (gotTheLock) {
  app.quit();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/** NAC 처리 실행 */
ipcMain.on('runNAC', async (event, args) => {
  const message = await mainService.fnRunNAC(args);
  await event.sender.send('runNAC-reply', message);
  await event.sender.send('ping-reply', JSON.stringify(await mainService.fnIsConnected()));
});

/** 인터넷 연결상태 확인 */
ipcMain.on('ping', async (event) => {
  event.sender.send('ping-reply', JSON.stringify(await mainService.fnIsConnected()));
});

/** 초기 유저정보 셋팅 */
ipcMain.on('user', async (event) => {
  const user = new User(await userService.selectUser());
  const data = {
    userID: user.userID,
    userPW: user.userPW,
    isSaveID: user.isSaveID,
    isAutoRun: user.isAutoRun,
    isSystemBoot: user.isSystemBoot,
  };
  event.sender.send('user-reply', JSON.stringify(data));
});

/** 인터넷 연결상태 확인 */
ipcMain.on('config', async (event) => {
  const config = new Config(await configService.selectConfig());
  const data = {
    gwURL: config.gwURL,
    nacURL: config.nacURL,
  };
  event.sender.send('config-reply', JSON.stringify(data));
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
