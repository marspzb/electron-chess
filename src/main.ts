const { app, BrowserWindow, Menu, ipcMain, Notification, shell } = require('electron');

const path = require('path');
const url = require('url');
app.setName('Gess');
let win;
const env = process.env.NODE_ENV || 'production';
const dev = true;
const template = [
  {
    label: 'Gess',
    submenu: [
      {
        label: 'New',
        click(item, focusedWindow) {
          if (win) {
            win.webContents.send('command', 'new');
          }
        }
      },
      { role: 'quit' }
    ]
  },
  {
    label: 'Game',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click(item, focusedWindow) {
          if (win) {
            win.webContents.send('command', 'undo');
          }
        }
      },
      { type: 'separator' },
      {
        label: 'Search',
        accelerator: 'CmdOrCtrl+F',
        click(item, focusedWindow) {
          if (win) {
            win.webContents.send('command', 'search');
          }
        }
      },
      { type: 'separator' },

      {
        label: 'Close',
        click(item, focusedWindow) {
          if (win) {
            win.webContents.send('command', 'close-game');
          }
        }
      }
    ]
  }
];
const menu = Menu.buildFromTemplate(template);
//console.log(menu);

function createWindow() {
  const { screen } = require('electron');
  const { width, height } = screen.getPrimaryDisplay().size;
  const windowSize = Math.min(width, height) - 50;
  win = new BrowserWindow({ width: windowSize, height: windowSize, center: true });
  win.loadURL(
    url.format({
      pathname: path.join(dev ? path.resolve(__dirname) : app.getAppPath(), 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
//console.log(app.getAppPath())
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
  Menu.setApplicationMenu(menu);
}
ipcMain.on('check', () => {
  if (Notification.isSupported()) {
    let checkNotification = new Notification({
      title: 'Check',
      body: `You're being attacked`
    });
    checkNotification.show();
  }
});

ipcMain.on('search', (event, searchText) => {
  shell.openExternal(`http://google.com/?q=${searchText}`);
});
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
