var locationprocess = process.argv[2];
process.stdout.on('end', function() {
  process.exit();
});
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
var moment = require('moment');
const puppeteer = require('puppeteer');
const MeetingsList = require(locationprocess + '/UserConfig/MeetingsList.json');
fs.writeFileSync(`${locationprocess}/UserConfig/Cache/MeetingsListCache.json`, JSON.stringify(MeetingsList));
const AppConfig = require(locationprocess + '/UserConfig/AppConfig.json');
const AppConfigSetup = require(locationprocess + '/UserConfig/AppConfigSetup.json');
(async () => {
  const client = new Discord.Client();
try {
  await client.login(AppConfig[0].DiscordBotToken);
  
  client.on('ready', () => {
  });
} catch (error) {
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('El token del bot de discord es incorrecto o no tiene conexión a Internet, por favor conéctese a Internet, verifique el token o deshabilite el Discord MD en preferencias.
Después desconecte el bot y vuelvalo a conectar','Bot Token','OK','Error');
  `]);
  process.exit()
}

  if (AppConfigSetup.AccountSetup != true) {
    spawnSync("powershell.exe", [`
    Add-Type -AssemblyName PresentationCore,PresentationFramework;
    [System.Windows.MessageBox]::Show('No ha configurado su cuenta de google por primera vez vaya a configuración y de clic en Ingresar Cuenta','Cuenta','OK','Error');
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
    [System.Windows.MessageBox]::Show('El bot tuvo un error y no va a continuar revisando sus reuniones, por favor detenga el bot y vuélvalo a iniciar','Bot Error','OK','Error');
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
  try {
  const Embed = new Discord.MessageEmbed()
.setColor(element.color)
.setTitle(`¡La reunion ${element.name} ha sido habilitada!`)
.setAuthor(`Meeting Checker`, 'https://raw.githubusercontent.com/AlfredAR8/MeetingCheckerAPI/main/AppIcon.png')
.setDescription(`Enlace: https://meet.google.com/lookup/${element.code}`)
await client.users.fetch(AppConfig[0].DiscordUserID).then((user) => {
  user.send(Embed)
});
} catch (error) {
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('El id del usuario de discord es incorrecto, no compartes servidor con el bot o no tiene conexión a Internet, por favor verifique su id de usuario de Discord, añada el bot al servidor que usted ha creado o deshabilite Discord MD desde Preferencias
Después desconecte el bot y vuelvalo a conectar','ID de usuario','OK','Error');
  `]);
  process.exit()
}
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
  [System.Windows.MessageBox]::Show('Su cuenta necesita que verifique su contraseña, vaya a la configuración y haga clic en ingresar cuenta','Verificación de la Cuenta','OK','Error');
  `]);
  process.exit()
}
await page.goto('about:blank');
}, AppConfig[0].TimeCheck*1000);
});
} catch (error) {
  spawnSync("powershell.exe", [`
  Add-Type -AssemblyName PresentationCore,PresentationFramework;
  [System.Windows.MessageBox]::Show('El bot tuvo un error y no va a continuar revisando sus reuniones, por favor detenga el bot y vuélvalo a iniciar','Bot Error','OK','Error');
  `]);
  process.exit()
}
};
})()