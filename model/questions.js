Questions = new Meteor.Collection('questions');

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
