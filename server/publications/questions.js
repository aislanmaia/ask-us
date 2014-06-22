Meteor.publish('question', function (id) {
  check(id, String);

  return Questions.find(id);
});

Meteor.publish('user_questions', function (user_id) {
  return Questions.find({
    "author._id": user_id
  });
});

Meteor.publish('searched_questions', function (query) {
  return Questions.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { text: { $regex: query, $options: 'i' } }
    ]
  });
});

Meteor.publish('questions_followed', function (question_ids) {
  return Questions.find({_id: { $in: question_ids }});
});
