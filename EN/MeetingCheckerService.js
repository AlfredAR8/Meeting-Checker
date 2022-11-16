var locationprocess = process.argv[2]
process.stdout.on('end', function() {
  process.exit();
});
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
var moment = require('moment');
const exec = require('child_process').exec;
const puppeteer = require('puppeteer');
const MeetingsList = require(locationprocess + '/UserConfig/MeetingsList.json');
const AppConfig = require(locationprocess + '/UserConfig/AppConfig.json');
const AppConfigSetup = require(locationprocess + '/UserConfig/AppConfigSetup.json');

  if (AppConfigSetup.AccountSetup != true) {
    spawnSync("powershell.exe", [`
    Add-Type -AssemblyName PresentationCore,PresentationFramework;
    [System.Windows.MessageBox]::Show('You havent set up your google account for first time yet go to settings and click Load Account','Account','OK','Error');
    `]);
    } else {
      startaccountcheck();
    }

async function startaccountcheck() {
  try {
    const chromefilename = path.resolve(__dirname, '..\\node_modules\\puppeteer\\.local-chromium\\win64-901912\\chrome-win\\chrome.exe')
    const browser = await puppeteer.launch({args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--js-flags="--max-old-space-size=1024"'
    ], headless: true, executablePath: chromefilename, userDataDir: locationprocess + "/UserConfig/UserData"});

    MeetingsList.forEach(async function (element, i) {
    const page = await browser.newPage();
    setInterval(async() => {
  await page.goto(`https://meet.google.com/lookup/${element.code}`);
  try {
    await page.waitForSelector('#yDmH0d', {
      visible: true,
    });
  } catch (e) {
    spawnSync("powershell.exe", [`
    Add-Type -AssemblyName PresentationCore,PresentationFramework;
    [System.Windows.MessageBox]::Show('The bot had an error and it will no continue checking your meetings, please stop the bot and start it again','Bot Error','OK','Error');
    `]);
    process.exit()
  }
  if (!await page.url().includes("accounts.google.com")) {
  if (await page.url().includes("whoops")) {
    //if meeting stoppped
    if (MeetingsList[i].Active == "true") {
      MeetingsList[i].Active = "false"
      fs.writeFileSync(`${locationprocess}/UserConfig/Cache/MeetingsListCache.json`, JSON.stringify(MeetingsList));
      var VersionCheck1 = fs.readFileSync(`${locationprocess}/UserConfig/Cache/MeetingsTimeline.json`)
      var VersionCheckfalse = JSON.parse(VersionCheck1)
      var dateactualmachine = moment().format('YYYY-MM-DD HH:mm:ss');
      VersionCheckfalse.push({meetingisenabled:false, dateago:new Date(), date:dateactualmachine, name:element.name, code:element.code, color:element.color});
  fs.writeFileSync(`${locationprocess}/UserConfig/Cache/MeetingsTimeline.json`, JSON.stringify(VersionCheckfalse));
    }
  } else {
//if meeting started
if (MeetingsList[i].Active == "false") {
  MeetingsList[i].Active = "true"
  fs.writeFileSync(`${locationprocess}/UserConfig/Cache/MeetingsListCache.json`, JSON.stringify(MeetingsList));
  var VersionCheck1 = fs.readFileSync(`${locationprocess}/UserConfig/Cache/MeetingsTimeline.json`)
  var VersionCheckfalse = JSON.parse(VersionCheck1)
  var dateactualmachine = moment().format('YYYY-MM-DD HH:mm:ss');
  VersionCheckfalse.push({meetingisenabled:true, dateago:new Date(), date:dateactualmachine, name:element.name, code:element.code, color:element.color});
fs.writeFileSync(`${locationprocess}/UserConfig/Cache/MeetingsTimeline.json`, JSON.stringify(VersionCheckfalse));
}
}
} else {
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('Your account needs you to verify your password, please go to settings and click load Account','Account Verification','OK','Error');
  `]);
  process.exit()
}
await page.goto('about:blank');
}, AppConfig[0].TimeCheck*1000);
});
} catch (error) {
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('The bot had an error and it will no continue checking your meetings, please stop the bot and start it again','Bot Error','OK','Error');
  `]);
  process.exit()
}
};