const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, globalShortcut } = electron;

process.env.NODE_ENV = "production";

let mainWindow;

//Listen for app to be ready
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    title: "Credivault",
    width: 900,
    height: 600,
    icon: "src/assets/icons/png/credivault.png",
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

  //Add developer tools if not in production
  if (process.env.NODE_ENV !== "production") {
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

    mainMenuTemplate.push({
      label: "Developer Tools",
      submenu: [
        {
          label: "Toggle DevTools",
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
        },
      ],
    });

    //Build Menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
  } else {
    Menu.setApplicationMenu(null);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
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
    mainWindow = new BrowserWindow({
      title: "Credivault",
      width: 900,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
  }
});
