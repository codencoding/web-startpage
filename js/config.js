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
}


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
