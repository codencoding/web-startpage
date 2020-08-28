var clockDate = document.getElementById("clockDate");
var clockTime = document.getElementById("clockTime");
var iconElems = document.getElementsByClassName("iconRow");
var launch_icons_div = document.getElementById("launchIcons");
let themePicker = document.getElementById("themePicker");
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

updateDate();
runClock();
var myVar = setInterval(runClock, 1000);

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