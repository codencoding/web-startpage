// @ts-check

var today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var date;
var clockDate;
var clockTime;
var iconElems;
var enableSeconds = false;
var isOnline = navigator.onLine;
var searchBar = document.getElementById("searchBar");

// window.onload = function () {
clockDate = document.getElementById("clockDate");
clockTime = document.getElementById("clockTime");
iconElems = document.getElementsByClassName("iconRow");
updateDate();
runClock();
var myVar = setInterval(runClock, 1000);
updateLogoLinks();
if(isOnline){
    loadHeavyElems();
}
// }


function loadHeavyElems() {
    let discordWidget = document.getElementById("discordWidget");
    let googleCalendar = document.getElementById("googleCalendar");

    let tempDiscordWidget = document.createElement("iframe");
    tempDiscordWidget.src = "https://discordapp.com/widget?id=106615501169377280&theme=dark"
    tempDiscordWidget.width = "350"
    tempDiscordWidget.height = "500"
    tempDiscordWidget.allowtransparency = "true"
    tempDiscordWidget.frameBorder = "0"
    discordWidget.appendChild(tempDiscordWidget);

    // let tempCal = document.createElement("iframe");
    // tempCal.src = "https://calendar.google.com/calendar/embed?height=500&amp;wkst=1&amp;bgcolor=%23202225&amp;ctz=America%2FLos_Angeles&amp;src=Y29kZW5AdWNzZC5lZHU&amp;src=dWNzZC5lZHVfc2E0MWNlNXU3ZGFiamp2aGg3azlmdXBwN3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfY2g4bG9yaW80bjBubXQ1YTZ0OXBnbDBqazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=dWNzZC5lZHVfcDJyMHFwdjRhcXFyc2Q3aXR2OGFzaW1hbnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfMWo3dmx1cnQwbmMwZDhsZGVsdmQxZ2NqbjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfZ2FrMHJuMG84czFwdG1pZXV0ZHQzajR2cmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfZnVwZnZodDRrY2NkbGY1cGVrMWRwMzdxNm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfZ2RwZjBmcTdoNzZnYTM3OGdkYmVxdjk2YXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfdGJ0dHRoOG5hMDg1cG5ybHF2M3J2YXVnODRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW5nLnVjc2QuZWR1XzlzYThzMHZvY2duMGptZG50amk2aGlpN2VnQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23039BE5&amp;color=%239E69AF&amp;color=%23616161&amp;color=%2333B679&amp;color=%23cc00c9&amp;color=%23F09300&amp;color=%230B8043&amp;color=%237CB342&amp;color=%23D50000&amp;color=%2300ccc6&amp;color=%23E4C441&amp;showTitle=0&amp;showNav=1&amp;showDate=0&amp;showPrint=0&amp;mode=AGENDA&amp;showTz=0&amp;showCalendars=1&amp;showTabs=0"
    // tempCal.style = "border:solid 1px #777"
    // tempCal.width = "320"
    // tempCal.height = "500"
    // tempCal.frameBorder = "0"
    // tempCal.scrolling = "no"
    // googleCalendar.appendChild(tempCal);
}

function runClock() {
    let today = new Date();

    let seconds = String(today.getSeconds());
    if (parseInt(seconds) < 10) {
        seconds = '0' + seconds;
    }

    let minutes = String(today.getMinutes());
    if (parseInt(minutes) < 10) {
        minutes = '0' + minutes;
    }

    let hours = String(today.getHours());
    let meridiem = "AM";
    if (parseInt(hours) >= 12) {
        meridiem = "PM";
    }
    hours = String(parseInt(hours) % 12);
    if (parseInt(hours) == 0) {
        hours = "12";
    }

    if (meridiem == "AM" && parseInt(hours) == 12) {
        updateDate();
    }

    let time;
    if (enableSeconds) {
        time = hours + ":" + minutes + ":" + seconds + ' ' + meridiem;
    } else {
        time = hours + ":" + minutes + ' ' + meridiem;
    }

    clockTime.innerHTML = time;
}

function updateDate() {
    today = new Date();
    let day = today.getDate();
    let dayModifier;
    if (day % 10 == 1) {
        dayModifier = "st";
    } else if (day % 10 == 2) {
        dayModifier = "nd";
    } else if (day % 10 == 3) {
        dayModifier = "rd";
    } else {
        dayModifier = "th";
    }
    date = dayNames[today.getDay()] + ", " + monthNames[today.getMonth()] + ' ' + day + dayModifier + ' ' + today.getFullYear();

    clockDate.innerHTML = date;
}

function updateLogoLinks() {
    let linkNode;
    let imgNode;
    let cellValue;
    let siteName;
    let siteDomain;

    for (let row of iconElems) {
        for (let elem of row.cells) {
            cellValue = elem.innerHTML;
            if (cellValue == '') {
                cellValue = "placeHolder.com";
                elem.className = "inactiveIcon";
            } else {
                elem.className = "activeIcon";
            }
            siteName = cellValue.split('.')[0];
            siteDomain = cellValue.split('.').slice(1);

            linkNode = document.createElement("a");
            imgNode = document.createElement("img");
            imgNode.className = "grow";

            linkNode.href = "https://" + siteName + "." + siteDomain.join('.');
            imgNode.src = "include/icons/" + siteName + ".png"

            elem.innerHTML = '';
            elem.appendChild(linkNode);
            linkNode.appendChild(imgNode);
        }
    }
}

function googleSearch(searchInput) {
    window.location.href = "https://www.google.com/search?q=" + searchInput;
}

searchBar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      googleSearch(searchBar.value);
    }
  }); 