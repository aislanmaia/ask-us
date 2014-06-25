UI.registerHelper('pluralize', function(n, thing) {
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

scrollTo = function (element, speed) {
  $(document.body).animate({
    'scrollTop': element.offset().top
  }, speed);
};
