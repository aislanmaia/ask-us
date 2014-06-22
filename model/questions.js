Questions = new Meteor.Collection('questions');

Questions.authorIds = function () {
  var authorIds = this.find({}).map(function (q) {
    return q.author_id;
  });

  return authorIds;
};

Meteor.methods({
  question: function (attributes) {
    var question = _.extend(_.pick(attributes, 'title', 'text'), {
      submitted: new Date().getTime(),
      author_id: Meteor.userId()
    });

    questionId = Questions.insert(question);

    return questionId;
  }
});
