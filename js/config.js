// @ts-check
var today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var date;
var enableSeconds = false;
var isOnline = navigator.onLine;
var icon_data = JSON.parse(data);
var cfg = JSON.parse(cfg)[0];
var icon_cfg = cfg["LAUNCH_ICONS"]
var theme_cfg = cfg["THEMES"]


function loadHeavyElems() {
    let discordWidget = document.getElementById("discordWidget");
    let googleCalendar = document.getElementById("googleCalendar");

    let tempDiscordWidget = document.createElement("iframe");
    tempDiscordWidget.src = "https://discordapp.com/widget?id=106615501169377280&theme=dark"
    tempDiscordWidget.width = "350"
    tempDiscordWidget.height = "500"
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

function create_icons_table(parent_div, rows, cols) {
    let table = document.createElement("table");
    parent_div.appendChild(table);

    let icon_elems = {}
    let curr_index;
    let active_row;
    let active_icon;
    for (let row = 0; row < rows; row++) {
        if((row * cols) >= icon_data.length) {
            break;
        }
        active_row = table.insertRow(row);
        active_row.className = "iconRow";
        for (let col = 0; col < cols; col++) {
            if(curr_index >= icon_data.length) {
                break;
            }

            active_icon = active_row.insertCell(col);
            active_icon.className = "activeIcon";

            curr_index = col + cols * row
            icon_elems[curr_index] = active_icon;
        }
    }

    let link_elem;
    let img_elem;
    for (let index = 0; index < icon_data.length; index++) {
        const curr_pos = icon_data[index]["position"];
        active_icon = icon_elems[curr_pos]

        link_elem = document.createElement("a");
        link_elem.href = "https://" + icon_data[index]["url"];
        active_icon.appendChild(link_elem);
        
        img_elem = document.createElement("img");
        img_elem.className = "grow";
        img_elem.src = "include/imgs/" + icon_data[index]["img_name"];
        img_elem.alt = icon_data[index]["site_name"]
        link_elem.appendChild(img_elem);

        // Create tooltip
        let tooltip = document.createElement("span");
        tooltip.innerHTML = icon_data[index]["site_name"];
        tooltip.className = "tooltiptext";
        active_icon.appendChild(tooltip);
    }
}

function checkSearch(searchInput) {
    if (searchInput.includes('.') && !searchInput.includes(' ')) {
        if (searchInput.includes('http')) {
            window.location.href = searchInput;
        } else {
            window.location.href = "https://" + searchInput;
        }
    } else {
        duckduckgoSearch(searchInput);
    }
}

function googleSearch(searchInput) {
    window.location.href = "https://www.google.com/search?q=" + searchInput;
}

function duckduckgoSearch(searchInput) {
    window.location.href = "https://duckduckgo.com/?q=" + searchInput + "&ia=web";
}

function changeTheme() {
    let selected_index = themePicker.options.selectedIndex;
    let selected_theme = themePicker[selected_index].value.toUpperCase();
    
    setTheme(selected_theme, selected_index);
}

function setTheme(theme, theme_index) {
    let root = document.documentElement;
        
    document.cookie = "theme=" + theme + ';';
    document.cookie = "theme_index=" + theme_index + ';';

    themePicker.options.selectedIndex = theme_index;

    for (const key in theme_cfg[theme]) {
        if (theme_cfg[theme].hasOwnProperty(key)) {
            const element = theme_cfg[theme][key];
            root.style.setProperty(key, element);
        }
    }
}