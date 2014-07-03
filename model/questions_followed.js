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

QuestionsFollowed.followNotification = function (follow) {
  var attributes = {
    type: "follow_question",
    content: {
      _id: follow._id,
      author_id: follow.user_id,
      author_avatar_url: Meteor.user().profile.avatar_url,
      author_name: Meteor.user().profile.name,
      question_id: follow.question._id,
      question_title: follow.question.title
    },
    submitted: follow.submitted,
    user_id: follow.question.author._id
  };
  Meteor.call('createNotification', attributes);
};

Meteor.methods({
  question_follow: function (attributes) {
    var follow = _.extend(_.pick(attributes, 'user_id', 'question_id'), {
      submitted: new Date().getTime()
    });

    var follow_id = QuestionsFollowed.insert(follow);

    if (follow_id) {
      attributes._id = follow_id;
      attributes.submitted = follow.submitted;
      QuestionsFollowed.followNotification(attributes);
    }

    return follow_id;
  },

  question_unfollow: function (question_id) {
    var user = Meteor.user();
    follow_id = QuestionsFollowed.remove({$and: [ {question_id: question_id}, {user_id: user._id} ]});

    //QuestionsFollowed.removeNotification(follow_id, user._id, "follow_question");

    return follow_id;
  }
});
