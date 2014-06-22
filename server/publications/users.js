Meteor.publish('authors', function (user_ids) {
  return Meteor.users.find({_id: { $in: user_ids }});
});

Meteor.publish('author', function (user_id) {
  return Meteor.users.find({_id: user_id });
});
