Questions = new Meteor.Collection('questions');

Questions.authorIds = function () {
  var authorIds = this.find({}).map(function (q) {
    return q.author_id;
  });

  return authorIds;
};

Questions.questionIds = function () {
  var questionIds = this.find({}).map(function (q) {
    return q._id;
  });

  return questionIds;
};

Meteor.methods({
  insertQuestion: function (attributes) {
    var question = _.extend(_.pick(attributes, 'title', 'text'), {
      submitted: new Date().getTime(),
      author: {
        _id: Meteor.userId(),
        name: Meteor.user().profile.name,
        avatar_url: Meteor.user().profile.avatar_url
      }
    });

    questionId = Questions.insert(question);

    return questionId;
  }
});
