Template.reply.events({
  "click .reply-edit": function (event, template) {
    event.preventDefault();

    var text = template.data.text;

    $('[name=reply-content]').val(text);
    Session.set('editing', template.data._id);
    scrollTo($('.reply'), 1000);
  }
});

Template.reply.helpers({
  ownReply: function () {
    return this.author._id === Meteor.userId();
  }
});
