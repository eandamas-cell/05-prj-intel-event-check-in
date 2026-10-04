// Select the HTML elements
const checkInForm = document.querySelector("#checkInForm");
const attendeeName = document.querySelector("#attendeeName");
const teamSelect = document.querySelector("#teamSelect");
const greeting = document.querySelector("#greeting");

const attendeeCount = document.querySelector("#attendeeCount");
const waterCount = document.querySelector("#waterCount");
const zeroCount = document.querySelector("#zeroCount");
const powerCount = document.querySelector("#powerCount");
const progressBar = document.querySelector("#progressBar");

const attendanceGoal = 50;

// Load saved information or begin at zero
let totalAttendees = Number(localStorage.getItem("totalAttendees")) || 0;

let waterTeam = Number(localStorage.getItem("waterTeam")) || 0;

let zeroTeam = Number(localStorage.getItem("zeroTeam")) || 0;

let powerTeam = Number(localStorage.getItem("powerTeam")) || 0;

let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

// Full names for each team
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

// Create the attendee-list section
const attendeeSection = document.createElement("div");
attendeeSection.style.marginTop = "30px";
attendeeSection.style.paddingTop = "30px";
attendeeSection.style.borderTop = "2px solid #f1f5f9";

const attendeeHeading = document.createElement("h3");
attendeeHeading.textContent = "Checked-In Attendees";
attendeeHeading.style.color = "#64748b";
attendeeHeading.style.marginBottom = "15px";

const attendeeList = document.createElement("ul");
attendeeList.style.listStyle = "none";
attendeeList.style.padding = "0";

attendeeSection.appendChild(attendeeHeading);
attendeeSection.appendChild(attendeeList);

document.querySelector(".team-stats").after(attendeeSection);

// Update everything shown on the page
function updateDisplay() {
  attendeeCount.textContent = totalAttendees;
  waterCount.textContent = waterTeam;
  zeroCount.textContent = zeroTeam;
  powerCount.textContent = powerTeam;

  const progressPercent = (totalAttendees / attendanceGoal) * 100;

  progressBar.style.width = `${Math.min(progressPercent, 100)}%`;

  attendeeList.innerHTML = "";

  attendees.forEach(function (attendee) {
    const listItem = document.createElement("li");

    listItem.textContent = `${attendee.name} — ${attendee.team}`;

    listItem.style.padding = "10px";
    listItem.style.marginBottom = "8px";
    listItem.style.backgroundColor = "#f8fafc";
    listItem.style.borderRadius = "8px";

    attendeeList.appendChild(listItem);
  });
}

// Save information in the browser
function saveProgress() {
  localStorage.setItem("totalAttendees", totalAttendees);

  localStorage.setItem("waterTeam", waterTeam);
  localStorage.setItem("zeroTeam", zeroTeam);
  localStorage.setItem("powerTeam", powerTeam);

  localStorage.setItem("attendees", JSON.stringify(attendees));
}

// Highlight the winning team
function celebrateWinner() {
  const waterCard = document.querySelector(".team-card.water");

  const zeroCard = document.querySelector(".team-card.zero");

  const powerCard = document.querySelector(".team-card.power");

  waterCard.style.border = "none";
  zeroCard.style.border = "none";
  powerCard.style.border = "none";

  const highestCount = Math.max(waterTeam, zeroTeam, powerTeam);

  let winningTeam = "";

  if (waterTeam === highestCount) {
    winningTeam = "Team Water Wise";
    waterCard.style.border = "4px solid #0071c5";
  } else if (zeroTeam === highestCount) {
    winningTeam = "Team Net Zero";
    zeroCard.style.border = "4px solid #16a34a";
  } else {
    winningTeam = "Team Renewables";
    powerCard.style.border = "4px solid #f59e0b";
  }

  greeting.textContent = `🎉 Attendance goal reached! ${winningTeam} is currently winning!`;

  greeting.classList.add("success-message");
  greeting.style.display = "block";
}

// Run when the form is submitted
checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = attendeeName.value.trim();
  const selectedTeam = teamSelect.value;
  const fullTeamName = teamNames[selectedTeam];

  totalAttendees++;

  if (selectedTeam === "water") {
    waterTeam++;
  } else if (selectedTeam === "zero") {
    zeroTeam++;
  } else if (selectedTeam === "power") {
    powerTeam++;
  }

  attendees.push({
    name: name,
    team: fullTeamName,
  });

  greeting.textContent = `Welcome to the Sustainability Summit, ${name}! You are checked in with ${fullTeamName}.`;

  greeting.classList.add("success-message");
  greeting.style.display = "block";

  updateDisplay();
  saveProgress();

  if (totalAttendees >= attendanceGoal) {
    celebrateWinner();
  }

  checkInForm.reset();
});

// Show saved information when the page opens
updateDisplay();

if (totalAttendees >= attendanceGoal) {
  celebrateWinner();
}
