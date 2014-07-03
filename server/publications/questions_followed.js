Meteor.publish('user_questions_followed', function (user_id) {
  return QuestionsFollowed.find({user_id: user_id});
});

Meteor.publish('user_is_following_question', function (question_id, user_id) {
  return QuestionsFollowed.isFollowing(question_id, user_id);
});

Meteor.publish('all_followed_from_question', function (question_id) {
  return QuestionsFollowed.find({question_id: question_id});
});

Meteor.publish('all_follows_question_from_others', function (questions_id) {
  return QuestionsFollowed.find({question_id: {$in: questions_id}});
});
