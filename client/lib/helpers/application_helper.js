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

UI.registerHelper('current_user_own_item', function (item_author_id) {
  return item_author_id === Meteor.userId();
});

UI.registerHelper('numberNotifications', function (type) {
  return Notifications.find({type: type}).count();
});

UI.registerHelper('notifications', function (type) {
  return Notifications.find({type: type});
});

scrollTo = function (element, speed) {
  $(document.body).animate({
    'scrollTop': element.offset().top
  }, speed);
};

