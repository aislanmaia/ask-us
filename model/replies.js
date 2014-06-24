Replies = new Meteor.Collection('replies');

Meteor.methods({
  insertReply: function (attributes) {
    var user = Meteor.user();
    var reply = _.extend(_.pick(attributes, 'question_id', 'text'), {
      submitted: new Date().getTime(),
      author: {
        _id: user._id,
        name: user.profile.name,
        avatar_url: user.profile.avatar_url
      }
    });

    replyId = Replies.insert(reply);

    return replyId;
  }
});
