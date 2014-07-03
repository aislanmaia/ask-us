Notifications = new Meteor.Collection('notifications');

Notifications.validateUniqueFollowQuestion = function (notification) {
  var found = Notifications.find({type: notification.type, user_id: notification.user_id, "content.question_id": notification.content.question_id, read: false}).count();

  if (found > 0) {
    return false;
  } else {
    return true;
  }
};

Meteor.methods({
  createNotification: function (attributes, submitted_at) {
    var notification = _.extend(_.pick(attributes, 'type', 'user_id', 'content', 'submitted'), {
      read: false
    });

    var notificiationId;

    if (Notifications.validateUniqueFollowQuestion(notification)) {
      notificiationId = Notifications.insert(notification);
    }

    return notificiationId;
  },
  setReadNotification: function (id) {
    Notifications.update({_id: id}, {$set: {read: true}});
  }
});
