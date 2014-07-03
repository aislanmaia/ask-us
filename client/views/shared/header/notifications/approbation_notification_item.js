Template.approbation_notification_item.events({
  "click a": function (event, template) {
    Session.set('view_reply', template.data.content._id);
    Meteor.call('setReadNotification', this._id);
  }
});
