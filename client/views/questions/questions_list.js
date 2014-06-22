Template.questions_list.helpers({
});

Template.question_preview.helpers({
  truncateText: function (text) {
    return text.trunc(125, true);
  },

  avatar_url: function (user_id) {
    var user = Meteor.users.findOne({_id: user_id});
    if (user.services.github) {
      return user.profile.avatar_url;
    }
  }
});


