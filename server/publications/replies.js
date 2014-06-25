Meteor.publish('question_replies', function (question_id) {
  return Replies.find({question_id: question_id});
});

Meteor.publish('user_replies', function (user_id) {
  return Replies.find({'author._id': user_id}, {fields: {author: 0 }});
});
