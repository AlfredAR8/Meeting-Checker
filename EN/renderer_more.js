(async () => {
    document.getElementById("FAQ").addEventListener('click', async () => {
        await window.AppApi.openurlbrowser(`https://github.com/AlfredAR8/MeetingCheckerAPI/blob/main/FAQ/FAQ_EN.md`)
        })
        document.getElementById("Licenses").addEventListener('click', async () => {
            await window.AppApi.openurlbrowser(`https://github.com/AlfredAR8/MeetingCheckerAPI/blob/main/Meeting-Checker-Licenses-EN.md`)
            })
})()