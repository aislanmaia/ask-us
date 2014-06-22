Meteor.publish('authors', function (user_ids) {
  return Meteor.users.find({_id: { $in: user_ids }});
});
