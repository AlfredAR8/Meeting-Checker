# Meeting-Checker
Use NPM i to intall modules
The app check if there is a new version comparing tthe build version with the json that is on [this repository](https://github.com/AlfredAR8/MeetingCheckerAPI)

## What does the app do?
The app was intended for students and people that used Google Meet to take meetings and that them didnt had to check every time if a meeting started when it gave an error because you had to reload the page, the app checked for you if a meeting started and it send you a message through Discord to tell you that the class started.
The app worked checking for an url of the meeting that had the word "whoops" on he URL (The app only worked if the student or person didnt had access to create meetings and only join to them, but that was the case on almost all schools, sadly on October 6th of 2021 Google updated Google meet allowing people to wait inside the meeting until it started, not only making look useless this app due you didnt had to refresh the website anymore, also them removed the "whoops" word from the URL because it didnt have that error anymore, so the app does not work anymore until i make an udate to it but it will take some time because it needs too many changes because I will need to read Web Sockets to know if the meeting started and how many people is on the meeting call.

## Example of how the error looked like before Google Removed that error
<img src="https://github.com/AlfredAR8/Meeting-Checker/blob/main/Error_Example.png?raw=true" width="310" height="116">
