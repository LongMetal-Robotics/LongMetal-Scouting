function updateResponses() {
  teamNumber = document.getElementsByName("general-teamNumber")[0].value;
  teamName = document.getElementsByName("general-teamName")[0].value;
  matchesAgainst = document.getElementsByName("general-matchesAgainst")[0].value;
  matchesTogether = document.getElementsByName("general-matchesTogether")[0].value;
  rookieYear = document.getElementsByName("general-rookieYear")[0].value;
  autonomousRemarks = document.getElementsByName("autonomous-remarks")[0].value;
  scalePossible1Checked = document.getElementsByName("scale-possible")[0].checked;
  scaleRemarks = document.getElementsByName("scale-remarks")[0].value;
  climbPossible1Checked = document.getElementsByName("climb-possible")[0].checked;
  climbRemarks = document.getElementsByName("climb-remarks")[0].value;
  switchPossible1Checked = document.getElementsByName("switch-possible")[0].checked;
  switchRemarks = document.getElementsByName("switch-remarks")[0].value;
  exchangePossible1Checked = document.getElementsByName("exchange-possible")[0].checked;
  exchangeRemarks = document.getElementsByName("exchange-remarks")[0].value;
  overallRating = document.getElementsByName("overall-rating")[0].value;
  overallRemarks = document.getElementsByName("overall-remarks")[0].value;
  if (teamNumber == "") {
    document.getElementsByName("general-teamNumber")[0].style.borderBottomColor = "#f44336";
  } else {
    document.getElementsByName("general-teamNumber")[0].style.borderBottomColor = "";
  }
  if (teamName == "") {
    document.getElementsByName("general-teamName")[0].style.borderBottomColor = "#f44336";
  } else {
    document.getElementsByName("general-teamName")[0].style.borderBottomColor = "";
  }
  if (matchesAgainst == "") {
    matchesAgainst = "Unknown";
  }
  if (matchesTogether == "") {
    matchesTogether = "Unknown";
  }
  if (rookieYear = "") {
    rookieYear = "Unknown";
  }
  if (autonomousRemarks == "") {
    autonomousRemarks = "None";
  }
  if (scaleRemarks == "") {
    scaleRemarks = "None";
  }
  if (climbRemarks == "") {
    climbRemarks = "None";
  }
  if (switchRemarks == "") {
    switchRemarks = "None";
  }
  if (exchangeRemarks == "") {
    exchangeRemarks = "None";
  }
  if (overallRating == "") {
    overallRating = "0";
  }
  if (overallRemarks == "") {
    overallRemarks = "None";
  }
  responses = [teamNumber, teamName, matchesAgainst, matchesTogether, rookieYear, autonomousRemarks, scalePossible1Checked, scaleRemarks, climbPossible1Checked, climbRemarks, switchPossible1Checked, switchRemarks, exchangePossible1Checked, exchangeRemarks, overallRating, overallRemarks];
  setTimeout(updateResponses, 100);
}

function firebaseUpload() {
  if (teamNumber != "" && teamName != "") {
    firebase.database().ref(teamNumber).set({
      'General': {
        'matchesAgainst': matchesAgainst,
        'matchesTogether': matchesTogether,
        'rookieYear': rookieYear
      },
      'Autonomous': {
        'autonomousRemarks': autonomousRemarks
      },
      'Scale': {
        'scalePossible': scalePossible1Checked,
        'scaleRemarks': scaleRemarks
      },
      'Climb': {
        'climbPossible': climbPossible1Checked,
        'climbRemarks': climbRemarks
      },
      'Switch': {
        'switchPossible': switchPossible1Checked,
        'switchRemarks': switchRemarks
      },
      'Exchange': {
        'exchangePossible': exchangePossible1Checked,
        'exchangeRemarks': exchangeRemarks
      },
      'Overall': {
        'overallRating': overallRating,
        'overallRemarks': overallRemarks
      }
    });
    setTimeout(resetPage, 3000);
    document.getElementsByClassName('statusBar')[0].style.backgroundColor = "#8bc34a";
    document.getElementById('submitButton').innerHTML = "DONE";
    for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
      document.getElementsByTagName('input')[i].value = "";
      document.getElementsByTagName('input')[i].checked = false;
    }
    for (var i = 0; i < document.getElementsByTagName('textarea').length; i++) {
      document.getElementsByTagName('textarea').value = "";
    }
  } else {
    var reqdFields = "";
    if (teamNumber == "" && teamName != "") {
      reqdFields = "Team Number";
    }
    if (teamName == "" && teamNumber == "") {
      reqdFields = "Team Number and Team Name";
    }
    if (teamName == "" && teamNumber != "") {
      reqdFields = "Team Name";
    }
    setTimeout(resetPage, 3000);
    document.getElementsByClassName('statusBar')[0].style.backgroundColor = "#F44336";
    document.getElementById('submitButton').innerHTML = "ERROR";
    console.log('Firebase Upload Failed: Fields ' + reqdFields + ' were not completed.');
    alert("The following fields must be completed:\n" + reqdFields);
  }
}

function resetPage() {
  document.getElementsByClassName('statusBar')[0].style.backgroundColor = "#2196F3";
  document.getElementById('submitButton').innerHTML = "SUBMIT";
}
