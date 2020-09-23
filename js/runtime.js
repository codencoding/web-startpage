var clockDate = document.getElementById("clockDate");
var clockTime = document.getElementById("clockTime");
var iconElems = document.getElementsByClassName("iconRow");
var launch_icons_div = document.getElementById("launchIcons");
let themePicker = document.getElementById("themePicker");
let cityIdInput = document.getElementById("cityIdInput");
let cityName = document.getElementById("cityName");
let weather_div = document.getElementById("weather").children;
var weather_city = weather_div[0];
var weather_temp = weather_div[1];
var weather_descrip = weather_div[2];
var config_overlay = document.getElementsByClassName("overlay")[0];
var weather_key_inpt = config_overlay.getElementsByTagName("input")[0];
var city_id_inpt = config_overlay.getElementsByTagName("input")[1];
var sidebar_overlay = document.getElementById("sidebar");
var new_theme_elems = document.getElementsByClassName("new_theme_elems");
var theme_color_rows = document.getElementsByClassName("theme_setting");


var searchBar = document.getElementById("searchBar");
searchBar.value = '';

var cookie_raw = document.cookie.split(';');
var cookie = {};
for (var i in cookie_raw) {
  let var_pair = cookie_raw[i].trim().split("=");
  cookie[var_pair[0]] = var_pair[1]
}

if ("theme" in cookie) {
  setTheme(cookie["theme"], cookie["theme_index"]);
}
update_theme_var_placeholders();

updateDate();
runClock();
var myVar = setInterval(runClock, 1000);

if (!("city_id" in localStorage) || !("city_id" in localStorage)) {
  show_overlay();
} else {
  // If time since last weather update > 30 seconds, update weather
  if (today.getTime() - Number(cookie["last_weather_update"]) > (30*1000)) {
    updateWeather(true);
  } else {
    updateWeather(false);
    console.info("Weather has been updated within the last 30 seconds, no need to re-update");
  }
}

create_icons_table(launch_icons_div, icon_cfg["ROWS"], icon_cfg["COLUMNS"])

if(isOnline){
    loadHeavyElems();
}

searchBar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      if (document.activeElement == searchBar) {
        // Cancel the default action, if needed
        // event.preventDefault();
        // Trigger the button element with a click
        checkSearch(searchBar.value);
      }
    }
}); 

// cityIdInput.addEventListener("keyup", function(event) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//       if (document.activeElement == cityIdInput) {
//         // Cancel the default action, if needed
//         set_local_vars(city_id=cityIdInput.value);
//       }
//     }
// }); 