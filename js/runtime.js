var clockDate = document.getElementById("clockDate");
var clockTime = document.getElementById("clockTime");
var iconElems = document.getElementsByClassName("iconRow");
var launch_icons_div = document.getElementById("launchIcons");
var searchBar = document.getElementById("searchBar");
searchBar.value = '';

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
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      googleSearch(searchBar.value);
    }
  }); 