Meteor.publish('notifications', function (user_id) {
  return Notifications.find({user_id: user_id});
});
