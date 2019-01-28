var teamNumber, teamJSON;
function updateResponses() {
  teamNumber = parseInt($('#general-teamNumber').val());
  if (isNaN(teamNumber)) {
    $('#general-teamNumber').css('background-color', '#ef9a9a');
  } else {
    $('#general-teamNumber').css('background-color', 'initial');
  }
  teamName = $('#general-teamName').val();
  rookieYear = parseInt($('#general-rookieYear').val());
  if (isNaN(rookieYear)) {
    rookieYear = "unknown";
  }
  matchesTogether = $('#general-matches-with').val().match(/Q[0-9]*/g);   // Validate (to int []) Q1, Q2, Q3 = [1, 2, 3]
  if (matchesTogether == undefined) {
    matchesTogether = 0;
  }
  matchesAgainst = $('#general-matches-against').val().match(/Q[0-9]*/g); // Validate (to int []) Q4, Q5, Q6 = [4, 5, 6]
  if (matchesAgainst == undefined) {
    matchesAgainst = 0;
  }

  starting = "unknown";       // Validate (to String) undefined, 'cargo', 'hatch'
  if ($('#auto-load-1')[0].checked && !$('#auto-load-2')[0].checked) {
    starting = "Cargo";
  } else if (!$('#auto-load-1')[0].checked && $('#auto-load-2')[0].checked) {
    starting = "Hatch";
  }
  controlMethod = [false, false, false];  // Validate (to bool []) auto, tele = [true, true, false] undefined, [false, false, true], [false, true, false], [true, true, false], [true, false, false]
  if ($('#auto-control-mode-unknown')[0].checked) {
    controlMethod = [false, false, true];
  } else if ($('#auto-control-mode-auto')[0].checked || $('#auto-control-mode-teleop')[0].checked) {
    controlMethod = [$('#auto-control-mode-auto')[0].checked, $('#auto-control-mode-teleop')[0].checked, false];
  }
  autoline = 0;       // Validate (to int) 0, 1, 2
  if ($('#auto-autoline-1')[0].checked) {
    autoline = 1;
  } else if ($('#auto-autoline-2')[0].checked) {
    autoline = 2;
  }

  autoRocket = [$('#auto-rocket-left')[0].checked, $('#auto-rocket-right')[0].checked];     // Validate (to bool []) [false, false], [false, true], [true, false], [true, true]
  autoRocketHatches = [$('#auto-rocket-hatch-1')[0].checked, $('#auto-rocket-hatch-2')[0].checked, $('#auto-rocket-hatch-3')[0].checked];    // Validate (to bool []) 1, 2, 3 = [true, true, true]
  autoRocketCargo = [$('#auto-rocket-cargo-1')[0].checked, $('#auto-rocket-cargo-2')[0].checked, $('#auto-rocket-cargo-3')[0].checked];      // Validate (to bool []) 3, 2, 1
  autoShip = [$('#auto-ship-hatch')[0].checked, $('#auto-ship-cargo')[0].checked];             // Validate (to String) undefined, 'panel', 'cargo'
  autoHatches = parseInt($('#auto-hatches').val());
  if (isNaN(autoHatches)) {
    autoHatches = "unknown";
  }
  autoCargo = parseInt($('#auto-cargo').val());
  if (isNaN(autoCargo)) {
    autoCargo = "unknown";
  }
  autoReload = $('#auto-reload')[0].checked;
  autonomousRemarks = $('#auto-remarks').val();

  teleopRocket = [$('#teleop-rocket-left')[0].checked, $('#teleop-rocket-right')[0].checked];     // Validate (to bool []) [false, false], [false, true], [true, false], [true, true]
  teleopRocketHatches = [$('#teleop-rocket-hatch-1')[0].checked, $('#teleop-rocket-hatch-2')[0].checked, $('#teleop-rocket-hatch-3')[0].checked];    // Validate (to bool []) 1, 2, 3 = [true, true, true]
  teleopRocketCargo = [$('#teleop-rocket-cargo-1')[0].checked, $('#teleop-rocket-cargo-2')[0].checked, $('#teleop-rocket-cargo-3')[0].checked];      // Validate (to bool []) 3, 2, 1
  teleopShip = [$('#teleop-ship-hatch')[0].checked, $('#teleop-ship-cargo')[0].checked];             // Validate (to String) undefined, 'panel', 'cargo'
  teleopHatches = parseInt($('#teleop-hatches').val());
  if (isNaN(teleopHatches)) {
    teleopHatches = "unknown";
  }
  teleopCargo = parseInt($('#teleop-cargo').val());
  if (isNaN(teleopCargo)) {
    teleopCargo = "unknown";
  }
  teleopLoad = [$('#teleop-load-depot')[0].checked, $('#teleop-load-zone')[0].checked];
  teleopRemarks = $('#teleop-remarks').val();

  endgameClimb = [$('#endgame-1')[0].checked, $('#endgame-2')[0].checked, $('#endgame-3')[0].checked];
  endgameRemarks = $('#endgame-remarks').val();

  overallRating = parseInt($('#overall-rating').val());
  if (isNaN(overallRating)) {
    overallRating = "unknown";
  }
  overallRemarks = $('#overall-remarks').val();

  teamJSON = {
    "general": {
      "number": teamNumber,
      "name": teamName,
      "rookieYear": rookieYear,
      "matchesTogether": matchesTogether,
      "matchesAgainst": matchesAgainst
    },
    "autonomous": {
      "starting": starting,
      "controlMethod": controlMethod,
      "autoline": autoline,
      "rocket": {
        "sides": autoRocket,
        "hatches": autoRocketHatches,
        "cargo": autoRocketCargo
      },
      "ship": autoShip,
      "reload": autoReload,
      "score": {
        "hatches": autoHatches,
        "cargo": autoCargo
      },
      "remarks": autonomousRemarks
    },
    "teleoperated": {
      "rocket": {
        "sides": teleopRocket,
        "hatches": teleopRocketHatches,
        "cargo": teleopRocketCargo
      },
      "ship": teleopShip,
      "score": {
        "hatches": teleopHatches,
        "cargo": teleopCargo
      },
      "loading": teleopLoad,
      "remarks": teleopRemarks
    },
    "endgame": {
      "climb": endgameClimb,
      "remarks": endgameRemarks
    },
    "overall": {
      "rating": overallRating,
      "remarks": overallRemarks
    }
  };
}
updateResponses();

document.addEventListener('click', updateResponses);
document.addEventListener('keyup', updateResponses);
$('#auto-control-mode-unknown').click(function() {
  if ($('#auto-control-mode-unknown')[0].checked && $('#auto-control-mode-auto')[0].checked) {
    $('#auto-control-mode-auto').click();
  }
  if ($('#auto-control-mode-unknown')[0].checked && $('#auto-control-mode-teleop')[0].checked) {
    $('#auto-control-mode-teleop').click();
  }
});
$('#auto-control-mode-auto').click(function() {
  if ($('#auto-control-mode-auto')[0].checked && $('#auto-control-mode-unknown')[0].checked) {
    $('#auto-control-mode-unknown').click();
  }
});
$('#auto-control-mode-teleop').click(function() {
  if ($('#auto-control-mode-teleop')[0].checked && $('#auto-control-mode-unknown')[0].checked) {
    $('#auto-control-mode-unknown').click();
  }
});
// TODO: team number onblur: search for scouted teams
$('#general-teamNumber').blur(function(event) {
  firebase.database().ref('/teams/data/frc' + teamNumber).once('value').then(function(snapshot) {
    let team = snapshot.val();

    if (team != null) {
      $('.toast').toast('show');
    }
  });
});

function autofill() {
  $('.toast').toast('hide');
}

$('#submit').click(function(event) {
  event.preventDefault();
  firebaseUpload();
});

function firebaseUpload() {
  if (!isNaN(teamNumber)) {
    var scoutedTeams;
    firebase.database().ref('/teams/numbers/').once('value').then(function(snapshot) {
      scoutedTeams = snapshot.val();
      if (scoutedTeams != null) {
        if (!scoutedTeams.includes(teamNumber)) {
          scoutedTeams[scoutedTeams.length + 1] = teamNumber;
          firebase.database().ref('/teams/numbers/').set(scoutedTeams);
        }
      } else {
        scoutedTeams = [teamNumber];
        firebase.database().ref('/teams/numbers/').set(scoutedTeams);
      }
    });
    firebase.database().ref('/teams/names/frc' + teamNumber).set(teamJSON.general.name);
    firebase.database().ref('/teams/data/frc' + teamNumber).set(teamJSON);
    $('.mr-auto').text('Success');
    $('#toast-body').html('Successfully added team. <a href="team?t=frc' + teamNumber + '">Go To Team Page</a>');
    $('button[data-dismiss="toast"]').hide();
    $('button[onclick="javascript:autofill()"]').hide();
    $('.toast').toast('show');
  } else {
    $('#modal-body').text("You must specify a team number before submitting.");
    $('#modal').modal('show');
  }
}
