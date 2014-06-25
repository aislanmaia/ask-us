Replies = new Meteor.Collection('replies');

Meteor.methods({
  insertReply: function (attributes) {
    var user = Meteor.user();
    var reply = _.extend(_.pick(attributes, 'question_id', 'question_title', 'text'), {
      submitted: new Date().getTime(),
      updated_at: undefined,
      author: {
        _id: user._id,
        name: user.profile.name,
        avatar_url: user.profile.avatar_url
      }
    });

    replyId = Replies.insert(reply);

    return replyId;
  },
  updateReply: function (attributes) {
    var reply = _.extend(_.pick(attributes, 'text'), {
      updated_at: new Date().getTime()
    });
    //console.log(reply._id);

    replyId = Replies.update({_id: attributes._id}, {$set: reply});

    return replyId;
  },
  removeReply: function (reply_id) {
    var replyId = Replies.remove({_id: reply_id});
  }
});
