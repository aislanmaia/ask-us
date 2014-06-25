UI.registerHelper('pluralize', function(n, thing) {
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

UI.registerHelper('truncateText', function (text) {
  return text.trunc(125, true);
});

scrollTo = function (element, speed) {
  $(document.body).animate({
    'scrollTop': element.offset().top
  }, speed);
};
