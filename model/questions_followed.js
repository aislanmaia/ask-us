QuestionsFollowed = new Meteor.Collection('questions_followed');

Meteor.methods({
  question_follow: function (attributes) {
    var follow = _.extend(_.pick(attributes, 'user_id', 'question_id'), {
      created_at: new Date().getTime()
    });

    follow_id = QuestionsFollowed.insert(follow);

    return follow_id;
  }
});
