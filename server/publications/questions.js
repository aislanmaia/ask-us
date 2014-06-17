Meteor.publish('question', function (id) {
  check(id, String);

  return Questions.find(id);
});
