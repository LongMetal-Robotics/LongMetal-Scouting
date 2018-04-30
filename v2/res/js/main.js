/*function nextSection(windowWidth) {
  windowWidth = windowWidth / 2;
  for (var i = 0; i < windowWidth; i++) {
    document.body.scrollLeft += 1;
  }
}

function previousSection(windowWidth) {
  windowWidth = windowWidth / 2;
  for (var i = 0; i < windowWidth; i++) {
    document.body.scrollLeft -= 1;
  }
}*/

function nextSection(windowWidth, repititions) {
  document.body.scrollLeft += 1;
  if (repititions < windowWidth / 2) {
    setTimeout(10, nextSection(windowWidth, repititions + 1));
  }
}

function previousSection(windowWidth, repititions) {
  document.body.scrollLeft -= 1;
  if (repititions < windowWidth / 2) {
    setTimeout(10, nextSection(windowWidth, repititions + 1));
  }
}