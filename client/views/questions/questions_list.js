Template.questions_list.helpers({
});

Template.question_preview.helpers({
  truncateText: function (text) {
    return text.trunc(125, true);
  }
});


