Meteor.publish('user_questions_followed', function (user_id) {
  return QuestionsFollowed.find({user_id: user_id});
});

Meteor.publish('user_is_following_question', function (question_id, user_id) {
  return QuestionsFollowed.isFollowing(question_id, user_id);
});

