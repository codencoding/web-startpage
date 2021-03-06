// @ts-check
var today;
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
    // let googleCalendar = document.getElementById("googleCalendar");

    let tempDiscordWidget = document.createElement("iframe");
    tempDiscordWidget.src = "https://discordapp.com/widget?id=106615501169377280&theme=dark"
    tempDiscordWidget.width = "350"
    tempDiscordWidget.height = "500"
    tempDiscordWidget.frameBorder = "0"
    discordWidget.appendChild(tempDiscordWidget);
}

function runClock() {
    today = new Date();

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
    // date = dayNames[today.getDay()] + "<br/>" + monthNames[today.getMonth()] + ' ' + day + dayModifier + ' ' + today.getFullYear();
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

function ecosiaSearch(searchInput) {
    window.location.href = "https://ecosia.org/search?q=" + searchInput;
}

function changeTheme() {
    let selected_index = themePicker.options.selectedIndex;
    let selected_theme = themePicker[selected_index].value.toUpperCase();
    
    setTheme(selected_theme, selected_index);
    update_theme_var_placeholders();
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

function _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateWeather(update) {
    if (update) {
        document.cookie = "last_weather_update=" + today.getTime() + ';'
    }

    let key = localStorage.getItem("weather_key");
    let city_id = localStorage.getItem("city_id");
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // Work with JSON data here
            let city_name = data["name"];
            // Find a way to have option for either Celcius or Fahrenheit conversion
            let temp = Math.round(((data["main"]["temp"]-273.15)*1.8)+32) + "°F";
            let weather_text = _capitalizeFirstLetter(data["weather"]["0"]["description"]);
            
            weather_city.innerHTML = city_name;
            weather_temp.innerHTML = temp;
            weather_descrip.innerHTML = weather_text;
            // Set attribute for settings sidebar information
            cityName.innerHTML=city_name;

            localStorage.setItem("city_name", city_name);
        })
        .catch((err) => {
            // Do something for an error here
        })

    // Set attribute for settings sidebar information
    cityIdInput.setAttribute("placeholder", localStorage.getItem("city_id"));
}

function show_overlay() {
    config_overlay.style.width = "100%";
}

function hide_overlay() {
    config_overlay.style.width = "0%";
}

function show_sidebar() {
    // sidebar_overlay.style.width = "30%";
    sidebar_overlay.style.visibility = "visible"
}

function hide_sidebar() {
    // sidebar_overlay.style.width = "0%";
    sidebar_overlay.style.visibility = "hidden"
}

function set_local_vars(weather_key='', city_id='') {
    // let weather_key = weather_key_inpt.value;
    // let city_id = city_id_inpt.value;
    if(weather_key != '') {
        localStorage.setItem("weather_key", weather_key);
    }
    if(city_id != '') {
        localStorage.setItem("city_id", city_id);
    }
    updateWeather(true);
}

function show_new_theme() {
    for (const key in new_theme_elems) {
        if (new_theme_elems.hasOwnProperty(key)) {
            const element = new_theme_elems[key];
            element.hidden = false
        }
    }
}

function hide_new_theme() {
    for (const key in new_theme_elems) {
        if (new_theme_elems.hasOwnProperty(key)) {
            const element = new_theme_elems[key];
            element.hidden = true
        }
    }
}

function update_theme_var_placeholders() {
    for (const key in theme_color_rows) {
        if (theme_color_rows.hasOwnProperty(key)) {
            const element = theme_color_rows[key].children;
            let var_name = element[0].innerHTML.trim().slice(0, -1);
            let input_elem = element[1].children[0];

            let var_value = getComputedStyle(element[0]).getPropertyValue(var_name);

            input_elem.setAttribute("placeholder", var_value);
        }
    }
}

function upload_new_theme() {
    // TODO
}