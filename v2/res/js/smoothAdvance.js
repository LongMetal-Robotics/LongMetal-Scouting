function nextSection(windowWidth) {
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
}