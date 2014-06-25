Template.questions_list.helpers({
});

Template.questions_list.events({
  "click #user_questions": function (event, template) {
    $("#user_questions").addClass('active');
    $("#questions_followed").removeClass('active');
  },
  "click #questions_followed": function (event, template) {
    $("#questions_followed").addClass('active');
    $("#user_questions").removeClass('active');
  }
});

Template.question_preview.helpers({
  avatar_url: function (user_id) {
    var user = Meteor.users.findOne({_id: user_id});
    if (user.services.github) {
      return user.profile.avatar_url;
    }
  }
});


