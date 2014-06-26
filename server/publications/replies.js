Meteor.publish('question_replies', function (question_id) {
  return Replies.find({question_id: question_id});
});

Meteor.publish('user_replies', function (user_id) {
  return Replies.find({'author._id': user_id}, {fields: {'author.name': 0, 'author.avatar_url': 0 }}, {sort: { _id: -1 }});
});

Meteor.publish('replies_in_questions', function (questions_id, user_id) {
  return Replies.find({question_id: { $in: questions_id }}, {'author._id': { $ne: user_id }});
});
