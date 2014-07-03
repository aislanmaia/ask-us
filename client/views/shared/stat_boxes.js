Template.stat_boxes.helpers({
  questionsCount: function () {
    var questions_count = Questions.find().count();
    var questions_follow_count = QuestionsFollowed.find().count();

    var total = questions_count + questions_follow_count;
    return total;
  },
  numberFollowsFromOthers: function () {
    return QuestionsFollowed.find({user_id: { $ne: Meteor.userId() }}).count();
  },
  numberReplies: function () {
    return Replies.find({"author._id": { $ne: Meteor.userId() }}).count();
  },
  numberApprobations: function () {
    var approbations = Replies.find({"author._id": Meteor.userId()}).map(function (r) {
      return r.approbations;
    });
    return approbations.sum();
  }
});
