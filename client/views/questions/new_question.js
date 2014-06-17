Template.new_question.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var question = {
      title: $(event.target).find('[name=question-title]').val(),
      text: $(event.target).find('[name=question-content]').val()
    };

    Meteor.call('question', question, function (error, id) {
      if(!error){
        alert("Questao "+ id + " salva com sucesso!");
        Router.go('question_page', {_id: id});
      } else {
        alert("Houve um erro!");
        console.log(error);
      }
    });
  }
});
