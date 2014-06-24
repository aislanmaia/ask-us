Meteor.publish('question_replies', function (question_id) {
  return Replies.find({question_id: question_id});
});
