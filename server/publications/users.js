Meteor.publish('authors', function (user_ids) {
  return Meteor.users.find({_id: { $in: user_ids }});
});

Meteor.publish('author', function (user_id) {
  return Meteor.users.find({_id: user_id });
});

Meteor.publish('user', function (user_id) {
  return Meteor.users.find({_id: user_id}, {fields: {profile: 1, questions: 1, replies: 1}});
});
