// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const { contextBridge } = require('electron')
const fs = require('fs');
var ta = require('time-ago')
const path = require('path')
const axios = require('axios').default
const fork = require('child_process').fork;
const { spawnSync } = require('child_process');
const exec = require('child_process').exec;
let appData = require('app-data-folder');
const appdatalocation = appData("meeting-checker");
const AppConfig = require(appdatalocation + '/UserConfig/AppConfig.json');
const meetinglist = require(appdatalocation + '/UserConfig/MeetingsList.json');


const api = axios.create({
  baseURL: 'https://raw.githubusercontent.com/AlfredAR8/MeetingCheckerAPI/main'
})

const getCurrentVersion = async () => {
  try {
    const { data: result } = await api.get('/LastVersion.json')
    return result
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}


const gettimesetup = async () => {
  try {
    return AppConfig[0].TimeCheck*1000
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}

const getbotstatus = async () => {
  try {
    var BotStatusCurrent1 = fs.readFileSync(`${appdatalocation}/UserConfig/Cache/BotStatus.json`)
    var BotStatusCurrent = JSON.parse(BotStatusCurrent1)
    return BotStatusCurrent
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}

const spawnservicechild = async () => {
  if (AppConfig[0].DiscordIntegration == "true") {
    const jsfilename = path.resolve(__dirname, './ES/MeetingCheckerServiceDiscord.js')
    var child = fork(jsfilename, [`${appdatalocation}`], { silent: false });
  } else {
    const jsfilename = path.resolve(__dirname, './ES/MeetingCheckerService.js')
    var child = fork(jsfilename, [`${appdatalocation}`], { silent: false });
  }
  fs.writeFile(`${appdatalocation}/UserConfig/Cache/BotStatus.json`, `{"IsBotEnabled":true, "PID":"${child.pid}"}`, function (err) {});
  }

  const spawnservicechildreload = async () => {
    const jsfilename = path.resolve(__dirname, './ES/reloadaccount.js')
    fork(jsfilename, [`${appdatalocation}`], { silent: false });
    }

  const spawnservicechildkill = async () => {
    var BotStatusCurrent1 = fs.readFileSync(`${appdatalocation}/UserConfig/Cache/BotStatus.json`)
    var BotStatusCurrent = JSON.parse(BotStatusCurrent1)
    exec(`taskkill /PID ${BotStatusCurrent.PID} /T /F `,(error, stdout, stderr) => {
      fs.writeFile(`${appdatalocation}/UserConfig/Cache/BotStatus.json`, `{"IsBotEnabled":false, "PID":""}`, function (err) {});
});
    }
    
const getclasslist = async () => {
  try {
    return meetinglist
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}

const getupdatedclasslist = async () => {
  try {
    const meetinglistupdated = fs.readFileSync(appdatalocation + '/UserConfig/Cache/MeetingsListCache.json');
    return JSON.parse(meetinglistupdated)
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}

const getclasstimelinecache = async () => {
  try {
    const meetinglistupdated = fs.readFileSync(appdatalocation + '/UserConfig/Cache/MeetingsTimeline.json');
    return JSON.parse(meetinglistupdated)
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}

const getappconfig = async () => {
  try {
    return AppConfig
  } catch (err) {
    console.log(err)

    return {
      message: err.message,
    }
  }
}

const saveclasslist = async (jsonfile) => {
  fs.writeFileSync(`${appdatalocation}/UserConfig/MeetingsList.json`, jsonfile);
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('¡Tus cambios se han guardado! 
(Reinicia la app para ver los cambios)','¡Guardado!','OK','Asterisk');
  `]);
}

const savesettingslist = async (jsonfile) => {
  fs.writeFileSync(`${appdatalocation}/UserConfig/AppConfig.json`, jsonfile);
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('¡Tus cambios se han guardado! 
(Reinicia la app para ver los cambios)','Saved!','OK','Asterisk');
  `]);
}

const openurlonbrowser = async (URLforbrowser) => {
  require("electron").shell.openExternal(URLforbrowser);
}
const timeagofromdate = async (firsttime) => {
  return ta.ago(firsttime)

}

contextBridge.exposeInMainWorld('AppApi', {
  getVersion: async () => await getCurrentVersion(),
  SpawnSChild: async () => await spawnservicechild(),
  spawnserviceCkill: async () => await spawnservicechildkill(),
  gettimesetupU: async () => await gettimesetup(),
  getclassoriginallist: async () => await getclasslist(),
  getappconfiglist: async () => await getappconfig(),
  saveupdateclasslist: async (data) => await saveclasslist(data),
  saveupdatesettingslist: async (data) => await savesettingslist(data),
  openurlbrowser: async (data) => await openurlonbrowser(data),
  timeago: async (data) => await timeagofromdate(data),
  botstatus: async () => await getbotstatus(),
  getclassupdatedlist: async () => await getupdatedclasslist(),
  getclasstimeline: async () => await getclasstimelinecache(),
  spawnservicereload: async () => await spawnservicechildreload()
})