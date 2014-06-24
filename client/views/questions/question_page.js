Template.question_page.helpers({
  submittedText: function () {
    return new Date(this.submitted).toString();
  },

  replies_count: function () {

    var total = Replies.find().count();

    if (total) {
      if (total > 1) {
        return total + " Respostas";
      } else {
        return total + " Resposta";
      }
    } else {
      return "Sem Respostas no momento";
    }
  }
});
