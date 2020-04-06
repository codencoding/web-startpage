var clockDate = document.getElementById("clockDate");
var clockTime = document.getElementById("clockTime");
var iconElems = document.getElementsByClassName("iconRow");
var launch_icons_div = document.getElementById("launchIcons");

updateDate();
runClock();
var myVar = setInterval(runClock, 1000);

create_icons_table(launch_icons_div, icon_cfg["ROWS"], icon_cfg["COLUMNS"])

if(isOnline){
    loadHeavyElems();
}
