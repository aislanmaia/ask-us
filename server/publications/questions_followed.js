Meteor.publish('user_questions_followed', function (user_id) {
  return QuestionsFollowed.find({user_id: user_id});
});
