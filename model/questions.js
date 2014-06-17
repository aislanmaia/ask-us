Questions = new Meteor.Collection('questions');

Meteor.methods({
  question: function (attributes) {
    var question = _.extend(attributes, 'title', 'text', {
      submitted: new Date().getTime()
    });

    questionId = Questions.insert(question);

    return questionId;
  }
});
