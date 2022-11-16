const {app, BrowserWindow, Menu, Tray} = require('electron')
let appData = require('app-data-folder');

//create files appdata
const path = require('path');
const fs = require('fs');
const jquery = require('jquery')
const appdatalocation = appData("meeting-checker");

let myWindow = null
    
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })
    
  // Create myWindow, load the rest of the app, etc...
try {
  if (fs.existsSync(`${appdatalocation}/setupfiles.txt`)) {
  } else {
fs.writeFile(`${appdatalocation}/setupfiles.txt`, 'The App Data files are ready, DO NOT DELETE THIS FILE', function (err) {});
if (!fs.existsSync(`${appdatalocation}/UserConfig`)){
  fs.mkdirSync(`${appdatalocation}/UserConfig`, { recursive: true });
}
if (fs.existsSync(`${appdatalocation}/UserConfig`)){
  fs.writeFile(`${appdatalocation}/UserConfig/MeetingsList.json`, '[]', function (err) {});
}
if (fs.existsSync(`${appdatalocation}/UserConfig`)){
  fs.writeFile(`${appdatalocation}/UserConfig/AppConfig.json`, `[{"TimeCheck":"60", "Language":"EN", "SistemTray":"false", "DiscordIntegration":"false", "DiscordBotToken":"", "DiscordUserID":""}]`, function (err) {});
}
if (fs.existsSync(`${appdatalocation}/UserConfig`)){
  fs.writeFile(`${appdatalocation}/UserConfig/AppConfigSetup.json`, `{"AccountSetup":false}`, function (err) {});
}
if (fs.existsSync(`${appdatalocation}/UserConfig`)){
  if (!fs.existsSync(`${appdatalocation}/UserConfig/UserData`)){
    fs.mkdirSync(`${appdatalocation}/UserConfig/UserData`, { recursive: true });
}
}
if (fs.existsSync(`${appdatalocation}/UserConfig`)){
  if (!fs.existsSync(`${appdatalocation}/UserConfig/Cache`)){
    fs.mkdirSync(`${appdatalocation}/UserConfig/Cache`, { recursive: true });
}
}
if (fs.existsSync(`${appdatalocation}/UserConfig`)){
  fs.writeFile(`${appdatalocation}/UserConfig/Cache/MeetingsListCache.json`, `[]`, function (err) {});
  fs.writeFileSync(`${appdatalocation}/UserConfig/Cache/MeetingsListCache.json`, `[]`, function (err) {});
}
  }
} catch(err) {
}
async function resetcache () {
  try {
    var writejsonfile = await require(`${appdatalocation}/UserConfig/MeetingsList.json`);
fs.writeFileSync(`${appdatalocation}/UserConfig/Cache/MeetingsListCache.json`, JSON.stringify(writejsonfile));
  } catch (error) {
    fs.writeFileSync(`${appdatalocation}/UserConfig/Cache/MeetingsListCache.json`, `[]`);
  }
fs.writeFileSync(`${appdatalocation}/UserConfig/Cache/MeetingsTimeline.json`, `[]`);
fs.writeFileSync(`${appdatalocation}/UserConfig/Cache/BotStatus.json`, `{"IsBotEnabled":false, "PID":""}`);
}
resetcache()
var traylogo = path.join(__dirname, './resources/AppIcon.png');
try {
var config1 = fs.readFileSync(`${appdatalocation}/UserConfig/AppConfig.json`)
var config = JSON.parse(config1)
} catch (error) {
  var config1 = `[{"TimeCheck":"60", "Language":"EN", "SistemTray":"false", "DiscordIntegration":"false", "DiscordBotToken":"", "DiscordUserID":""}]`
  var config = JSON.parse(config1)
}
function createWindowEN () {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
      preload: path.join(__dirname, 'preload_EN.js')
    },
    resizable: false,
    title: "Meeting Checker",
    icon:traylogo,
    removeMenu: true
  })
  mainWindow.loadFile('EN/index.html')

  // Open the DevTools.
 //  mainWindow.webContents.openDevTools()
 Menu.setApplicationMenu(null); 
if (config[0].SistemTray == "true") {
mainWindow.on('minimize',function(event){
  event.preventDefault();
  mainWindow.hide();
});
  tray = new Tray(traylogo)
var contextMenu = Menu.buildFromTemplate([
  { label: 'Show App', click:  function(){
      mainWindow.show();
  } },
  { label: 'Hide', click:  function(){
    mainWindow.hide();
  } },
  { label: 'Quit', click:  function(){
      app.isQuiting = true;
      app.quit();
      tray.destroy()
  } }
]);
tray.on('click', () => {
  mainWindow.show();
});
tray.setContextMenu(contextMenu)
}
}
function createWindowES () {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
      preload: path.join(__dirname, 'preload_ES.js')
    },
    resizable: false,
    title: "Meeting Checker",
    icon:traylogo,
    removeMenu: true
  })
  mainWindow.loadFile('ES/index.html')

  // Open the DevTools.
 //  mainWindow.webContents.openDevTools()
 Menu.setApplicationMenu(null); 
if (config[0].SistemTray == "true") {
mainWindow.on('minimize',function(event){
  event.preventDefault();
  mainWindow.hide();
});
  tray = new Tray(traylogo)
var contextMenu = Menu.buildFromTemplate([
  { label: 'Show App', click:  function(){
      mainWindow.show();
  } },
  { label: 'Hide', click:  function(){
    mainWindow.hide();
  } },
  { label: 'Quit', click:  function(){
      app.isQuiting = true;
      app.quit();
      tray.destroy()
  } }
]);
tray.on('click', () => {
  mainWindow.show();
});
tray.setContextMenu(contextMenu)
}
}
if (fs.existsSync(`${appdatalocation}/UserConfig/AppConfig.json`)){
  try {
    var BotStatusCurrent1 = fs.readFileSync(`${appdatalocation}/UserConfig/AppConfig.json`)
    var BotStatusCurrent = JSON.parse(BotStatusCurrent1)
  } catch (error) {
    var BotStatusCurrent1 = `[{"TimeCheck":"60","DiscordIntegration":"false","DiscordUserID":"","DiscordBotToken":"","Language":"EN"}]`
    var BotStatusCurrent = JSON.parse(BotStatusCurrent1)
  }
} else {
  var BotStatusCurrent1 = `[{"TimeCheck":"60","DiscordIntegration":"false","DiscordUserID":"","DiscordBotToken":"","Language":"EN"}]`
var BotStatusCurrent = JSON.parse(BotStatusCurrent1)
}
let tray = null
app.whenReady().then(() => {
  if (BotStatusCurrent[0].Language == "EN") {
    createWindowEN()
  } else if (BotStatusCurrent[0].Language == "ES") {
    createWindowES()
  }

  app.on('activate', function () {
    if (BotStatusCurrent[0].Language == "EN") {
      if (BrowserWindow.getAllWindows().length === 0) createWindowEN()
    } else if (BotStatusCurrent[0].Language == "ES") {
      if (BrowserWindow.getAllWindows().length === 0) createWindowES()
    }
  })
})

app.on('close', function () {
  if (process.platform !== 'darwin') app.quit()
  if (process.platform !== 'darwin') tray.destroy()
})
}