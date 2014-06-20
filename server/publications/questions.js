Meteor.publish('question', function (id) {
  check(id, String);

  return Questions.find(id);
});

Meteor.publish('user_questions', function (user_id) {
  return Questions.find({author_id: user_id});
});
