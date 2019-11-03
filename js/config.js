var today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var date;
var clockDate;
var clockTime;
var iconElems;

window.onload = function() {
    clockDate = document.getElementById("clockDate");
    clockTime = document.getElementById("clockTime");
    iconElems = document.getElementsByClassName("iconRow");
    // console.log(iconElems[0].cells);
    updateDate();
    runClock();
    var myVar = setInterval(runClock, 1000);
    updateLogoLinks();
<<<<<<< HEAD
    loadHeavyElems();
}

function loadHeavyElems() {
    let discordWidget = document.getElementById("discordWidget");
    let googleCalendar = document.getElementById("googleCalendar");
    
    discordWidget.src="https://discordapp.com/widget?id=106615501169377280&theme=dark" 
    discordWidget.width="350"
    discordWidget.height="500"
    discordWidget.allowtransparency="true"
    discordWidget.frameborder="0"
    
    googleCalendar.src="https://calendar.google.com/calendar/embed?height=500&amp;wkst=1&amp;bgcolor=%23202225&amp;ctz=America%2FLos_Angeles&amp;src=Y29kZW5AdWNzZC5lZHU&amp;src=dWNzZC5lZHVfc2E0MWNlNXU3ZGFiamp2aGg3azlmdXBwN3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfY2g4bG9yaW80bjBubXQ1YTZ0OXBnbDBqazBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=dWNzZC5lZHVfcDJyMHFwdjRhcXFyc2Q3aXR2OGFzaW1hbnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfMWo3dmx1cnQwbmMwZDhsZGVsdmQxZ2NqbjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfZ2FrMHJuMG84czFwdG1pZXV0ZHQzajR2cmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfZnVwZnZodDRrY2NkbGY1cGVrMWRwMzdxNm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfZ2RwZjBmcTdoNzZnYTM3OGdkYmVxdjk2YXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=dWNzZC5lZHVfdGJ0dHRoOG5hMDg1cG5ybHF2M3J2YXVnODRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW5nLnVjc2QuZWR1XzlzYThzMHZvY2duMGptZG50amk2aGlpN2VnQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23039BE5&amp;color=%239E69AF&amp;color=%23616161&amp;color=%2333B679&amp;color=%23cc00c9&amp;color=%23F09300&amp;color=%230B8043&amp;color=%237CB342&amp;color=%23D50000&amp;color=%2300ccc6&amp;color=%23E4C441&amp;showTitle=0&amp;showNav=1&amp;showDate=0&amp;showPrint=0&amp;mode=AGENDA&amp;showTz=0&amp;showCalendars=1&amp;showTabs=0"
    googleCalendar.style="border:solid 1px #777"
    googleCalendar.width="320"
    googleCalendar.height="500"
    googleCalendar.frameborder="0"
    googleCalendar.scrolling="no"
}
=======
}

>>>>>>> 773240e8a438f6d0da45ab8cc05cafd5b249eefd

function runClock() {
    let today = new Date();

    let seconds = today.getSeconds();
    if(parseInt(seconds) < 10) {
        seconds = '0' + seconds;
    }

    let minutes = today.getMinutes();
    if(parseInt(minutes) < 10) {
        minutes = '0' + minutes;
    }

    let hours = today.getHours();
    let meridiem = "AM";
    if(hours >=12) {
        meridiem = "PM";
    }
    hours %= 12;
    if(hours == 0) {
        hours = "12";
    }

    if(meridiem == "AM" && hours == 12) {
        updateDate();
    }

    let time = hours + ":" + minutes + ' ' + meridiem;
    // In case I ever want to have live seconds again.
    // let time = hours + ":" + minutes + ":" + seconds + ' ' + meridiem;
    
    clockTime.innerHTML = time;
}

function updateDate() {
    today = new Date();
    let day = today.getDate();
    let dayModifier;
    if(day % 10 == 1){
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

    for(row of iconElems) {
        for(elem of row.cells) {
            cellValue = elem.innerHTML;
            if(cellValue == '') {
                cellValue = "placeHolder.com";
                elem.className = "inactiveIcon";
            } else {
                elem.className = "activeIcon";
            }
            siteName = cellValue.split('.')[0];
            siteDomain = cellValue.split('.').slice(1,);

            linkNode = document.createElement("a");
            imgNode = document.createElement("img");
            imgNode.className = "grow";

            linkNode.href="https://" + siteName + "." + siteDomain.join('.');
            imgNode.src="include/icons/" + siteName + ".png"

            elem.innerHTML = '';
            elem.appendChild(linkNode);
            linkNode.appendChild(imgNode);
        }
    }
}
