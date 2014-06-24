Template.new_reply.helpers({

});

Template.new_reply.events({
  "submit form": function (event, template) {
    event.preventDefault();

    var user = Meteor.user();

    var attributes = {
      text: template.find('[name=reply-content]').value,
      question_id: template.data._id
    };

    Meteor.call('insertReply', attributes, function (err, id) {
      if(error){
        alert("Houve um erro ao tentar salvar sua pergunta! Por favor, tente novamente!");
        console.log(error.reason);
      }
    });
  }
});
