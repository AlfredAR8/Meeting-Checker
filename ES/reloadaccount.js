var locationprocess = process.argv[2]
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const AppConfigSetup = require(locationprocess + '/UserConfig/AppConfigSetup.json');
const puppeteer = require('puppeteer');

var BotStatusCurrent1 = fs.readFileSync(`${locationprocess}/UserConfig/Cache/BotStatus.json`)
var BotStatusCurrent = JSON.parse(BotStatusCurrent1)
if (BotStatusCurrent.IsBotEnabled != true) {
    AppConfigSetup.AccountSetup = true
    fs.writeFile(`${locationprocess}/UserConfig/AppConfigSetup.json`, JSON.stringify(AppConfigSetup), function (err) {});

    spawnSync("powershell.exe", [`
    Add-Type -AssemblyName PresentationCore,PresentationFramework;
    [System.Windows.MessageBox]::Show('Cierra la ventana cuando haya iniciado sesión en su cuenta, (solo inicie sesión en una cuenta)','Recargar cuenta','OK','Warning');
    `]);
      SignInAccount();
    } else {
      spawnSync("powershell.exe", [`
      Add-Type -AssemblyName PresentationCore,PresentationFramework;
      [System.Windows.MessageBox]::Show('Por favor detenga el bot e intente de nuevo','Bot Conectado','OK','Error');
      `]);
      }

      async function SignInAccount() {
        try {
        const chromefilename = path.resolve(__dirname, '..\\node_modules\\puppeteer\\.local-chromium\\win64-901912\\chrome-win\\chrome.exe')
        const browser = await puppeteer.launch({headless: false, executablePath: chromefilename, userDataDir: locationprocess + "/UserConfig/UserData"});
    const page = await browser.newPage();
    await page.goto('https://accounts.google.com/signin/v2/identifier');
    browser.on('disconnected', async target => {
          SetupTrue();
        });
      } catch (error) {
          
      }
      };

  function SetupTrue() {
      if (AppConfigSetup.AccountSetup = true) {
          
      } else {
        AppConfigSetup.AccountSetup = true
        fs.writeFile(`${locationprocess}/UserConfig/AppConfigSetup.json`, JSON.stringify(AppConfigSetup), function (err) {});
      }
  }