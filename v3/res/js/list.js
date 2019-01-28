function countBinary(array) {
  var counter = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i]) {
      counter++;
    }
  }
  return counter;
}

function generateTeam(tid, json) {
  // tid = team number
  let team = document.createElement('div');
  team.classList.add('list-group', 'col-12');
    let link = document.createElement('a');
    link.href = "team?t=frc" + tid;
    link.classList.add('list-group-item', 'list-group-item-action', 'container');
      let header = document.createElement('div');
      header.classList.add('row');
        let headerText = document.createElement('h1');
        if (json.general.rookieYear == 2019) {
          let badge = document.createElement('span');
          badge.classList.add('badge', 'badge-info');
          badge.innerText = 'Rookie';
        headerText.appendChild(badge);
        headerText.innerHTML += "&nbsp;";
        }
        headerText.innerHTML += "Team " + tid + " - " + json.general.name;
      header.appendChild(headerText);
    link.appendChild(header);
      let matches = document.createElement('div');
      matches.classList.add('row', 'matches');
        let matchesWith = document.createElement('span');
        matchesWith.classList.add('matches-with');
        matchesWith.innerText = "Matches With: ";
        for (var i = 0; i < json.general.matchesTogether.length; i++) {
          let matchBadge = document.createElement('span');
          matchBadge.classList.add('badge', 'badge-secondary'); // No system implemented for match color
          matchBadge.innerText = json.general.matchesTogether[i];
          matchesWith.appendChild(matchBadge);
          matchesWith.innerHTML += " ";
        }
      matches.appendChild(matchesWith);
      matches.innerHTML += '&nbsp;&nbsp;';
        let matchesAgainst = document.createElement('span');
        matchesAgainst.classList.add('matches-with');
        matchesAgainst.innerText = "Matches Against: ";
        for (var i = 0; i < json.general.matchesAgainst.length; i++) {
          let matchBadge = document.createElement('span');
          matchBadge.classList.add('badge', 'badge-secondary'); // No system implemented for match color
          matchBadge.innerText = json.general.matchesAgainst[i];
          matchesAgainst.appendChild(matchBadge);
          matchesAgainst.innerHTML += " ";
        }
      matches.appendChild(matchesAgainst);
    link.appendChild(matches);
      let auto = document.createElement('div');
      auto.classList.add('row', 'auto');
        let autoText = document.createElement('span');
          autoText.innerText = "Sandstorm: ";
          let autoJSON = json.autonomous;
          if (autoJSON.starting != "unknown") {
            let start = document.createElement('span');
            start.classList.add('badge', 'badge-primary');
            start.innerText = autoJSON.starting;
            autoText.appendChild(start);
            autoText.innerHTML += " ";
          }
          if (autoJSON.controlMethod != [false, false, false]) {
            let control = document.createElement('span');
            control.classList.add('badge', 'badge-primary');
            if (autoJSON.controlMethod[0] && autoJSON.controlMethod[1]) {
              control.innerText = "Auto, Teleop";
            } else if (autoJSON.controlMethod[0]) {
              control.innerText = "Auto";
            } else if (autoJSON.controlMethod[1]) {
              control.innerText = "Teleop";
            } else {
              control.innerText = "Ctrl. Unknown";
            }
            autoText.appendChild(control);
            autoText.innerHTML += " ";
          }
          if (autoJSON.autoline != 0) {
            let line = document.createElement('span');
            line.classList.add('badge', 'badge-primary');
            if (autoJSON.autoline == 2) {
              line.classList.remove('badge-primary');
              line.classList.add('badge-success');
            }
            line.innerText = "Level " + autoJSON.autoline;
            autoText.appendChild(line);
            autoText.innerHTML += " ";
          } else {
            let line = document.createElement('span');
            line.classList.add('badge', 'badge-danger');
            line.innerText = "No Line";
            autoText.appendChild(line);
            autoText.innerHTML += " ";
          }
          if (autoJSON.rocket.sides != [false, false]) {
            let rocket = document.createElement('span');
            rocket.classList.add('badge');
            if (autoJSON.rocket.sides[0] && !autoJSON.rocket.sides[1]) {
              rocket.classList.add('badge-warning');
              rocket.innerText = "R L-";
            } else if (!autoJSON.rocket.sides[0] && autoJSON.rocket.sides[1]) {
              rocket.classList.add('badge-warning');
              rocket.innerText = "R -R";
            } else {
              rocket.classList.add('badge-success');
              rocket.innerText = "R LR";
            }

            if (autoJSON.rocket.hatches != [false, false, false]) {
              // Can do rocket hatches
              rocket.innerText += " H";
              if (autoJSON.rocket.hatches[0]) {
                rocket.innerText += "3";
              }
              if (autoJSON.rocket.hatches[1]) {
                rocket.innerText += "2";
              }
              if (autoJSON.rocket.hatches[2]) {
                rocket.innerText += "1";
              }
            }

            if (autoJSON.rocket.cargo != [false, false, false]) {
              // Can do rocket cargo
              rocket.innerText += " C";
              if (autoJSON.rocket.cargo[0]) {
                rocket.innerText += "3";
              }
              if (autoJSON.rocket.cargo[1]) {
                rocket.innerText += "2";
              }
              if (autoJSON.rocket.cargo[2]) {
                rocket.innerText += "1";
              }
            }
            autoText.appendChild(rocket);
            autoText.innerHTML += " ";
          }
          if (autoJSON.ship != [false, false]) {
            let ship = document.createElement('span');
            ship.classList.add('badge');
            ship.innerText = "S";
            if (autoJSON.ship[0]) {
              ship.classList.add('badge-warning');
              ship.innerText += " H";
            }
            if (autoJSON.ship[1]) {
              ship.classList.add('badge-warning');
              ship.innerText += " C"
            }
            if (autoJSON.ship[0] && autoJSON.ship[1]) {
              ship.classList.replace('badge-warning', 'badge-success')
            }
            autoText.appendChild(ship);
            autoText.innerHTML += " ";
          }
          if (autoJSON.score.hatches != "unknown") {
            let hatches = document.createElement('span');
            hatches.classList.add('badge');
            if (autoJSON.score.hatches != 1) {
              if (autoJSON.score.hatches < 1) {
                hatches.classList.add('badge-warning');
              } else {
                hatches.classList.add('badge-success');
              }
              hatches.innerText = autoJSON.score.hatches + " Hatches";
            } else {
              hatches.classList.add('badge-success');
              hatches.innerText = "1 Hatch";
            }
            autoText.appendChild(hatches);
            autoText.innerHTML += " ";
          }
          if (autoJSON.score.cargo != "unknown") {
            let cargo = document.createElement('span');
            cargo.classList.add('badge');
            if (autoJSON.score.cargo != 1) {
              cargo.innerText = autoJSON.score.cargo + " Cargo";
              if (autoJSON.score.cargo == 0) {
                cargo.classList.add('badge-warning');
              } else {
                cargo.classList.add('badge-success');
              }
            } else {
              cargo.innerText = "1 Hatch";
              cargo.classList.add('badge-success');
            }
            autoText.appendChild(cargo);
            autoText.innerHTML += " ";
          }
          if (autoJSON.reload || autoJSON.remarks != "") {
            let extra = document.createElement('span');
            extra.classList.add('badge', 'badge-primary', 'material-icon');
            if (autoJSON.reload) {
              extra.innerText = "autorenew";
              extra.classList.replace('badge-primary', 'badge-success');
            }
            if (autoJSON.remarks != "") {
              extra.innerText += "more_horiz";
            }
            autoText.appendChild(extra);
          }
          auto.appendChild(autoText);
        link.appendChild(auto);

        let teleop = document.createElement('div');
        teleop.classList.add('row', 'teleop');
          let teleopText = document.createElement('span');
            teleopText.innerText = "Teleop: ";
            let teleopJSON = json.teleoperated;
            if (teleopJSON.rocket.sides != [false, false]) {
              let rocket = document.createElement('span');
              rocket.classList.add('badge');
              if (teleopJSON.rocket.sides[0] && !teleopJSON.rocket.sides[1]) {
                rocket.classList.add('badge-warning');
                rocket.innerText = "R L-";
              } else if (!teleopJSON.rocket.sides[0] && teleopJSON.rocket.sides[1]) {
                rocket.classList.add('badge-warning');
                rocket.innerText = "R -R";
              } else {
                rocket.classList.add('badge-success');
                rocket.innerText = "R LR";
              }

              if (teleopJSON.rocket.hatches != [false, false, false]) {
                // Can do rocket hatches
                rocket.innerText += " H";
                if (teleopJSON.rocket.hatches[0]) {
                  rocket.innerText += "3";
                }
                if (teleopJSON.rocket.hatches[1]) {
                  rocket.innerText += "2";
                }
                if (teleopJSON.rocket.hatches[2]) {
                  rocket.innerText += "1";
                }
              }

              if (teleopJSON.rocket.cargo != [false, false, false]) {
                // Can do rocket cargo
                rocket.innerText += " C";
                if (teleopJSON.rocket.cargo[0]) {
                  rocket.innerText += "3";
                }
                if (teleopJSON.rocket.cargo[1]) {
                  rocket.innerText += "2";
                }
                if (teleopJSON.rocket.cargo[2]) {
                  rocket.innerText += "1";
                }
              }
              teleopText.appendChild(rocket);
              teleopText.innerHTML += " ";
            }
            if (teleopJSON.ship != [false, false]) {
              let ship = document.createElement('span');
              ship.classList.add('badge');
              ship.innerText = "S";
              if (teleopJSON.ship[0]) {
                ship.classList.add('badge-warning');
                ship.innerText += " H";
              }
              if (teleopJSON.ship[1]) {
                ship.classList.add('badge-warning');
                ship.innerText += " C"
              }
              if (teleopJSON.ship[0] && teleopJSON.ship[1]) {
                ship.classList.replace('badge-warning', 'badge-success')
              }
              teleopText.appendChild(ship);
              teleopText.innerHTML += " ";
            }
            if (teleopJSON.score.hatches != "unknown") {
              let hatches = document.createElement('span');
              hatches.classList.add('badge');
              if (teleopJSON.score.hatches != 1) {
                if (teleopJSON.score.hatches < 1) {
                  hatches.classList.add('badge-warning');
                } else {
                  hatches.classList.add('badge-success');
                }
                hatches.innerText = teleopJSON.score.hatches + " Hatches";
              } else {
                hatches.classList.add('badge-success');
                hatches.innerText = "1 Hatch";
              }
              teleopText.appendChild(hatches);
              teleopText.innerHTML += " ";
            }
            if (teleopJSON.score.cargo != "unknown") {
              let cargo = document.createElement('span');
              cargo.classList.add('badge');
              if (teleopJSON.score.cargo != 1) {
                cargo.innerText = teleopJSON.score.cargo + " Cargo";
                if (teleopJSON.score.cargo == 0) {
                  cargo.classList.add('badge-warning');
                } else {
                  cargo.classList.add('badge-success');
                }
              } else {
                cargo.innerText = "1 Hatch";
                cargo.classList.add('badge-success');
              }
              teleopText.appendChild(cargo);
              teleopText.innerHTML += " ";
            }
            if (teleopJSON.loading[0] || teleopJSON.loading[1] || teleopJSON.remarks != "") {
              let extra = document.createElement('span');
              extra.classList.add('badge', 'badge-primary', 'material-icon');
              if (teleopJSON.loading[0] || teleopJSON.loading[1]) {
                extra.innerText = "autorenew";
                if (!(teleopJSON.loading[0] && teleopJSON.loading[1])) {
                  extra.classList.replace('badge-primary', 'badge-warning');
                } else {
                  extra.classList.replace('badge-primary', 'badge-success');
                }
              }
              if (teleopJSON.remarks != "") {
                extra.innerText += "more_horiz";
              }
              teleopText.appendChild(extra);
            }
          teleop.appendChild(teleopText);
      link.appendChild(teleop);

        let endgame = document.createElement('div');
        endgame.classList.add('row', 'endgame');
          let endgameText = document.createElement('span');
            endgameText.innerText = "Endgame: ";
            let endgameJSON = json.endgame;
              let climb = document.createElement('span');
              climb.classList.add('badge');
              switch (countBinary(endgameJSON.climb)) {
                case 3:
                  climb.classList.add('badge-success');
                  climb.innerText = "Any Level";
                  break;

                case 2:
                  climb.classList.add('badge-primary');
                  climb.innerText = "Levels "
                  if (endgameJSON.climb[0]) {
                    climb.innerText += "1 & ";
                    if (endgameJSON.climb[1]) {
                      climb.innerText += "2";
                    } else {
                      climb.innerText += "3";
                    }
                  } else {
                    climb.innerText += "2 & 3";
                  }
                  break;

                case 1:
                  climb.classList.add('badge-warning');
                  climb.innerText = "Level ";
                  if (endgameJSON.climb[0]) {
                    climb.innerText += "1";
                  } else if (endgameJSON.climb[1]) {
                    climb.innerText += "2";
                  } else {
                    climb.innerText += "3";
                  }
                  break;

                default:
                  climb.classList.add('badge-danger');
                  climb.innerText = "Park on field";
              }
            endgameText.appendChild(climb);
            endgameText.innerHTML += " ";

            if (endgameJSON.remarks != "") {
              let extra = document.createElement('span');
              extra.classList.add('badge', 'badge-primary', 'material-icon');
              extra.innerText = "more_horiz";
              endgameText.appendChild(extra);
            }
        endgame.appendChild(endgameText);
      link.appendChild(endgame);

      let overall = document.createElement('div');
      overall.classList.add('row', 'overall');
        let overallText = document.createElement('span');
          overallText.innerText = "Overall: ";
          let rating = document.createElement('span');
          rating.classList.add('badge');
            switch (json.overall.rating) {
              case 1:
                rating.classList.add('badge-danger');
                rating.innerText = "1/4";
                break;

              case 2:
                rating.classList.add('badge-warning');
                rating.innerText = "2/4";
                break;

              case 3:
                rating.classList.add('badge-primary');
                rating.innerText = "3/4";
                break;

              case 4:
                rating.classList.add('badge-success');
                rating.innerText = "4/4";
                break;

              default:
                rating.classList.add('badge-secondary');
                rating.innerText = "?/4";
            }
          overallText.appendChild(rating);
          overallText.innerHTML += " ";
          if (json.overall.remarks != "") {
            let extra = document.createElement('span');
            extra.classList.add('badge', 'badge-primary', 'material-icon');
            extra.innerText = "more_horiz";
            overallText.appendChild(extra);
          }
        overall.appendChild(overallText);
      link.appendChild(overall);

    team.appendChild(link);
  $('#team-list')[0].appendChild(team);
}

var teamNumbers = undefined, loaded = 0, load = 10;
function loadTeams() {
  firebase.database().ref('/teams/numbers/').once('value').then(function(snapshot) {
    teamNumbers = snapshot.val();
    $('h3').text('');

    if (load > teamNumbers.length - 1) {
      load = teamNumbers.length - 1;
    }
    for (var i = loaded + 1; i <= load; i++) {
      firebase.database().ref('/teams/data/frc' + teamNumbers[i]).once('value').then(function(snapshot) {
        let team = snapshot.val();

        if (team == null) {
          $('#modal-body').html("There have been no teams scouted yet. Why don't you <a href=\"add/\">add one</a>?");
          $('#modal').modal('show');
        } else {
          generateTeam(team.general.number, team);
        }
      });
    }
    loaded = load;
    load += 10;
  });
}

if (!location.pathname.includes("/team")) {
  loadTeams();
} else if (location.search.match(/frc[0-9]*/)[0] != "") {
  firebase.database().ref('/teams/data/' + location.search.match(/frc[0-9]*/)[0]).once('value').then(function(snapshot) {
    $('h3').text('');
    let team = snapshot.val();

    generateTeam(team.general.number, team);
  }).catch(function(error) {
    console.log(error);
    $('h3').text('Uh oh. We haven\'t scouted that team yet.');
    $('a[href="javascript:presentJSON()"]')[0].classList.add('disabled');
  });
}
