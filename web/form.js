// FORM AND ANIMATIONS SCRIPT
// Developed by Markus Urban for FME Datathon
// 16/11/2026 - 17/11/2024

// Let's see how much sleep I get today...


function go_to_team_form() {

    document.getElementById("dashboard").style.display = "none";
    document.body.classList = "min-h-screen bg-gradient-to-b from-white to-purple-50 p-4 flex flex-col items-center justify-center";
    document.getElementById("app").style.display = "block";

}

// Open the participant dashboard
function start_team_form() {

    document.getElementById("app").style.display = "none";

}



// FORM TITLES AND SUBTITLES
let form_section_titles = ["Participant Information", ""];
let form_section_subtitles = ["Let's start with some basic information"]