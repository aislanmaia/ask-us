QuestionsFollowed = new Meteor.Collection('questions_followed');

QuestionsFollowed.questionIds = function (user_id) {
  var questionIds = this.find({
    user_id: user_id}).map(function (q) {
      return q.question_id;
    });

  return questionIds;
};

QuestionsFollowed.isFollowing = function (question_id, user_id) {
  return this.find({
    $and: [
      { question_id: question_id },
      { user_id: user_id }
    ]
  });
};

Meteor.methods({
  question_follow: function (attributes) {
    var follow = _.extend(_.pick(attributes, 'user_id', 'question_id'), {
      created_at: new Date().getTime()
    });

    follow_id = QuestionsFollowed.insert(follow);

    return follow_id;
  },

  question_unfollow: function (question_id) {
    var user = Meteor.user();
    follow_id = QuestionsFollowed.remove({$and: [ {question_id: question_id}, {user_id: user._id} ]});

    return follow_id;
  }
});
