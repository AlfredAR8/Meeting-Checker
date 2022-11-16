// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//counter
(async () => {
  const currentbotsatus = await window.AppApi.botstatus()
  if (currentbotsatus.IsBotEnabled == true) {
    document.getElementById('StatusOffline').style.display = "none";
    document.getElementById('StatusOnline').style.display = "block";
    document.getElementById('countdownbox').style.display = "none";
    document.getElementById('countdownbox2').style.display = "block";
  }
var $circleBorder = $(".countdown__icon__circle").get(0);
var $countdown = $(".countdown");

var length = $circleBorder.getTotalLength();
  const timesetupUse = await window.AppApi.gettimesetupU();
  var time = timesetupUse/1000
var counter = {
  var: time
};

var tl = new TimelineMax({
  delay: 0,
  repeatDelay: 0,
  repeat: -1
});
tl.pause();
//counter

document.addEventListener('DOMContentLoaded', async () => {
const Lastversion = await window.AppApi.getVersion()
  if (Lastversion.Version == "1.0.0") {
    document.getElementById('hiddentupdateneeded').style.display = "none";
    document.getElementById('hiddentupdatelast').style.display = "block";
  } else {
    document.getElementById('hiddentupdatelast').style.display = "none";
    document.getElementById('hiddentupdateneeded').style.display = "block";
  }
  document.getElementById("MSLink").href = `ms-windows-store://pdp/?productid=9PBRFC6L0S8X`; 
})
var truecooldown = false

  document.getElementById("StatusOffline").addEventListener('click', async () => {
    if (truecooldown == false) {
      document.getElementById('StatusOffline').style.display = "none";
      document.getElementById('StatusOnline').style.display = "block";
      await window.AppApi.SpawnSChild()
      tl.restart()
    }
    })

    document.getElementById("StatusOnline").addEventListener('click', async () => {
      setTimeout(() => {
        truecooldown = false
        document.getElementById('dot3').style.display = "none";
      }, 1000);
      document.getElementById('dot3').style.display = "block";
      truecooldown = true
      document.getElementById('countdownbox').style.display = "block";
      document.getElementById('countdownbox2').style.display = "none";
      document.getElementById('StatusOffline').style.display = "block";
      document.getElementById('StatusOnline').style.display = "none";
      await window.AppApi.spawnserviceCkill()
      await tl.restart()
      tl.pause()
      })

      //counter

tl.set($countdown, {
  scale: 1
})
  .to($countdown, 0.5, {
    scale: 1,
    ease: Back.easeOut.config(1.4)
  })
  .to($circleBorder, time, {
    strokeDashoffset: length,
    stroke: "#c73052",
    ease: Power0.easeNone
  })
  .to(
    counter,
    time,
    {
      var: 0,
      onUpdate: function () {
        $(".countdown__number").html(Math.ceil(counter.var));
      },
      ease: Power0.easeNone
    },
    `-= ${time}`
  )
  .to($countdown, 0.5, {
    scale: 1,
    ease: Back.easeIn.config(1.4),
    onComplete: function () {
      $(".countdown__number").html(`${time}`);
    }
  });
  
  const getclasstimelineactual1 = await window.AppApi.getclasstimeline()
  var space1 = 10
  getclasstimelineactual1.forEach(async (element) => {
    var timeago1 = await window.AppApi.timeago(element.dateago)
    if (element.meetingisenabled == true) {
      document.getElementById("Timeline").insertAdjacentHTML("afterbegin",`<span id="dot5" style="background-color: ${element.color}; cursor: pointer; position: absolute;top: ${space1}px; left: 0px;" id="dot5" class="${element.code}";><img style="cursor: pointer;" src="../resources/check-mark.png" id="svgimage5"  /></span><b style="position: absolute;top: ${space1}px; left: 50px;">${element.name}</b><b style="position: absolute;top: ${space1+22}px; left: 50px; font-size:13px; text-align: left;color: #CBCBCB;">${timeago1} (${element.date})</b>`);
    } else if (element.meetingisenabled == false) {
      document.getElementById("Timeline").insertAdjacentHTML("afterbegin",`<span id="dot5" style="background-color: ${element.color}; cursor: pointer; position: absolute;top: ${space1}px; left: 0px;" id="dot5" class="${element.code}";><img style="cursor: pointer;" src="../resources/XIcon.png" id="svgimage5"  /></span><b style="position: absolute;top: ${space1}px; left: 50px;">${element.name}</b><b style="position: absolute;top: ${space1+22}px; left: 50px; font-size:13px; text-align: left;color: #CBCBCB;">${timeago1} (${element.date})</b>`);
    }
  space1 = space1 + 70
  document.getElementsByClassName(element.code)[0].addEventListener('click', async () => {
    await window.AppApi.openurlbrowser(`https://meet.google.com/lookup/${element.code}`)
    })
  });
  var getclasstimelineactual2 = await window.AppApi.getclasstimeline()
  setInterval(async() => {
    const getclasstimelineactual = await window.AppApi.getclasstimeline()
    var space = 10
    document.getElementById('Timeline').innerHTML = ('');
    getclasstimelineactual.forEach(async (element) => {
      var timeago = await window.AppApi.timeago(element.dateago)
      if (element.meetingisenabled == true) {
        document.getElementById("Timeline").insertAdjacentHTML("afterbegin",`<span id="dot5" style="background-color: ${element.color}; cursor: pointer; position: absolute;top: ${space}px; left: 0px;" id="dot5" class="${element.code}";><img style="cursor: pointer;" src="../resources/check-mark.png" id="svgimage5"  /></span><b style="position: absolute;top: ${space}px; left: 50px;">${element.name}</b><b style="position: absolute;top: ${space+22}px; left: 50px; font-size:13px; text-align: left;color: #CBCBCB;">${timeago} (${element.date})</b>`);
      } else if (element.meetingisenabled == false) {
        document.getElementById("Timeline").insertAdjacentHTML("afterbegin",`<span id="dot5" style="background-color: ${element.color}; cursor: pointer; position: absolute;top: ${space}px; left: 0px;" id="dot5" class="${element.code}";><img style="cursor: pointer;" src="../resources/XIcon.png" id="svgimage5"  /></span><b style="position: absolute;top: ${space}px; left: 50px;">${element.name}</b><b style="position: absolute;top: ${space+22}px; left: 50px; font-size:13px; text-align: left;color: #CBCBCB;">${timeago} (${element.date})</b>`);
      }
      space = space + 70
    document.getElementsByClassName(element.code)[0].addEventListener('click', async () => {
      await window.AppApi.openurlbrowser(`https://meet.google.com/lookup/${element.code}`)
      })
    });
      getclasstimelineactual2 = getclasstimelineactual;
      $(document).ready(function() {
      var tablediv = document.getElementById("Timeline");
      tablediv.scrollTop = tablediv.scrollHeight;
    } );
  }, 5000);
})()