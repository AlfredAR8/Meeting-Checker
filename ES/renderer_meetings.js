(async () => {
    $(document).ready(function() {
        var t = $('#meetingsstatustable').DataTable({
            language: {
           emptyTable: `No hay reuniones establecidas, Vaya a "Establecer" desde el menu y añada reuniones`
         },
           responsive: true,
         searching: false, 
           paging: false, 
           info: false
     });
    async function addall () {
        var datafromjson = await window.AppApi.getclassoriginallist()
        datafromjson.forEach(async(element, i) => {
            const getupdatedmeeting = await window.AppApi.getclassupdatedlist()
            if (getupdatedmeeting[i].Active == "false") {
                t.row.add( [
                    `<td> <span id="dot4" class="${element.code}"; style="background-color: #C85757; cursor: pointer;"></span> </td>`,
                    `<td>${element.name}</td>`,
                ] ).draw( false );
            }else if (getupdatedmeeting[i].Active == "true") {
                t.row.add( [
                    `<td> <span id="dot4" class="${element.code}"; style="background-color: #57C867; cursor: pointer;"></span> </td>`,
                    `<td>${element.name}</td>`,
                ] ).draw( false );
            }
            document.getElementsByClassName(element.code)[0].addEventListener('click', async () => {
                await window.AppApi.openurlbrowser(`https://meet.google.com/lookup/${element.code}`)
                })
    });
    };

    setInterval(async() => {
        const getupdatedmeeting = await window.AppApi.getclassupdatedlist()
        getupdatedmeeting.forEach(element => {
            if (element.Active == "false") {
                document.getElementsByClassName(element.code)[0].style.backgroundColor = "#C85757";
            }else if (element.Active == "true") {
                document.getElementsByClassName(element.code)[0].style.backgroundColor = "#57C867";
            }
        });
    }, 5000);
    
    addall()
} );
})()