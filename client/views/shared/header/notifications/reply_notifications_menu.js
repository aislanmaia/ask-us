Template.reply_notification_item.helpers({
  time_on_it_submitted: function () {
    var date = new Date(this.submitted);
    var hour = date.getHours();
    var min = date.getMinutes();
    var current_time = new Date().getTime();
    if (this.submitted === current_time) {
      return "Agora mesmo";
    } else {
      return hour + ":" + min;
    }
  }
});

Template.reply_notification_item.events({
  "click a": function (event, template) {
    Session.set('view_reply', template.data.content._id);
    Meteor.call('setReadNotification', this._id);
  }
});
