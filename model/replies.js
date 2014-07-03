Replies = new Meteor.Collection('replies');

Replies.replyNotification = function (reply, receiver_id) {
  var attributes = {
    type: "reply",
    content: {
      _id: reply._id,
      author_id: reply.author._id,
      author_avatar_url: reply.author.avatar_url,
      author_name: reply.author.name,
      question_id: reply.question_id,
      question_title: reply.question_title
    },
    submitted: reply.submitted,
    user_id: receiver_id
  };
  Meteor.call('createNotification', attributes);
};

Replies.approbationNotification = function (reply, author) {
  var attributes = {
    type: "approbation",
    content: {
      _id: reply._id,
      author_id: author._id,
      author_avatar_url: author.profile.avatar_url,
      author_name: author.profile.name,
      question_id: reply.question_id
    },
    submitted: new Date().getTime(),
    user_id: reply.author_id
  };
  Meteor.call('createNotification', attributes);
};

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
      },
      approvers: [],
      approbations: 0
    });

    replyId = Replies.insert(reply);

    if (replyId) {
      reply._id = replyId;
      Replies.replyNotification(reply, attributes.receiver_id);
    }

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
    return replyId;
  },
  approbation: function (attributes) {
    var user = Meteor.user();

    var replyId = Replies.update({
      _id: attributes._id,
      approvers: { $ne: user._id },
      "author._id": { $ne: user._id }
    }, {
      $addToSet: { approvers: user._id },
      $inc: { approbations: 1 }
    });
    if (replyId) {
      Replies.approbationNotification(attributes, user);
    }
    return replyId;
  }
});
