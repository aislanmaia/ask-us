Notifications = new Meteor.Collection('notifications');

Meteor.methods({
  createNotification: function (attributes, submitted_at) {
    var notification = _.extend(_.pick(attributes, 'type', 'user_id', 'content', 'submitted'), {
      read: false
    });

    notificiationId = Notifications.insert(notification);

    return notificiationId;
  }
});
