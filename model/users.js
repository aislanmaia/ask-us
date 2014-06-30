Meteor.methods({
  //user_create: function (attributes) {
    //var user = _.extend(_.pick(attributes, 'email', 'name', 'username', 'password'), {});

    //Accounts.createUser(user);
  //}
  increment_count_questions: function (user_id) {
    Meteor.users.update(
      { _id: user_id },
      { $inc: { "questions.count": 1 }
    });
  },
  decrement_count_questions: function (user_id) {
    Meteor.users.update(
      { _id: user_id },
      { $inc: { "questions.count": -1 } }
    );
  },
  increment_count_replies: function (users_id) {
    console.log(users_id);
    for (var i = 0, l = users_id.length; i < l; i ++) {
      Meteor.users.update(
        { _id: users_id[i] },
        { $inc: { "replies.count": 1 }
      });
    }
  },
  decrement_count_replies: function (users_id) {
    console.log(users_id);
    for (var i = 0, l = users_id.length; i < l; i ++) {
      Meteor.users.update(
        { _id: users_id[i] },
        { $inc: { "replies.count": -1 }
      });
    }
  }
});
