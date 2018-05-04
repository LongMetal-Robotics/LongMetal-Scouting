var teamName = document.getElementsByName('general-teamName')[0];
var teamNumber = document.getElementsByName('general-teamNumber')[0];
var rookieYear = document.getElementsByName('general-rookieYear')[0];
var matchesTogether = document.getElementsByName('general-matchesTogether')[0];
var matchesAgainst = document.getElementsByName('general-matchesAgainst')[0];
var rating = document.getElementsByName('overall-teamRating')[0];
var comments = document.getElementsByName('overall-comments')[0];

document.getElementById('matchesTogether').addEventListener('mouseover', function() {document.getElementById('matchesTogether').innerText = "Add values as a comma-seperated list";});
document.getElementById('matchesTogether').addEventListener('mouseout', function() {document.getElementById('matchesTogether').innerText = "?";});

document.getElementById('matchesAgainst').addEventListener('mouseover', function() {document.getElementById('matchesAgainst').innerText = "Add values as a comma-seperated list";});
document.getElementById('matchesAgainst').addEventListener('mouseout', function() {document.getElementById('matchesAgainst').innerText = "?";});