Template.follow_question_notification_item.events({
  "click a": function (event, template) {
    Meteor.call('setReadNotification', this._id);
  }
});
