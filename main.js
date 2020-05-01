const electron = require("electron");
const url = require("url");
const path = require("path");
const axios = require("axios");

const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = electron;

let mainWindow;

//Listen for app to be ready
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  globalShortcut.register(
    process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
    () => app.quit()
  );

  //Load Html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //Build Menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => {
    win = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // macOS specific close process
  if (mainWindow === null) {
    createWindow();
  }
});

// catch item add
ipcMain.on("item:add", async (e, item) => {
  encryptedCredentials = await axios.post(
    "https://bme-encdec-server.herokuapp.com/encrypt",
    item
  );
  console.log(encryptedCredentials.data);
  console.log("Storing into local db");
});

//Create Menu Template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click() {
          app.quit();
        },
      },
    ],
  },
];

//Add developer tools if not in production

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push(
    {
      label: "Developer Tools",
      submenu: [
        {
          label: "Toggle DevTools",
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
        },
      ],
    },
    {
      role: "reload",
    }
  );
}
