Template.new_question.events({
  'submit form': function (event, template) {
    event.preventDefault();

    var question = {
      title: $(event.target).find('[name=question-title]').val(),
      text: $(event.target).find('[name=question-content]').val()
    };

    Meteor.call('insertQuestion', question, function (error, id) {
      if(!error){
        Meteor.call('increment_count_questions', Meteor.userId());
        Router.go('question_page', {_id: id});
      } else {
        alert("Houve um erro ao tentar salvar sua pergunta! Por favor, tente novamente!");
        console.log(error.reason);
      }
    });
  }
});
