Template.questions_search.helpers({
  count_results: function () {
    return Questions.find().count();
  }
});
