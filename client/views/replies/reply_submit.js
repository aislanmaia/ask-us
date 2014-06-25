Template.reply_submit.helpers({
  buttonSubmit: function () {
    if (Session.get('editing')) {
      return '<button type="submit" class="btn btn-lg btn-flat btn-success">Salvar Edição</button>';
    } else {
      return '<button type="submit" class="btn btn-lg btn-flat btn-success">Responder</button>';
    }
  }
});

Template.reply_submit.events({
  "submit form": function (event, template) {
    event.preventDefault();

    var user = Meteor.user();

    var attributes = {
      text: template.find('[name=reply-content]').value,
      question_id: template.data._id,
      question_title: template.data.title
    };

    if (!Session.get('editing')) {
      Meteor.call('insertReply', attributes, function (err, id) {
        if(error){
          alert("Houve um erro ao tentar salvar sua resposta! Por favor, tente novamente!");
          console.log(err.reason);
        }
      });
    }else {
      attributes['_id'] = Session.get('editing');
      Meteor.call('updateReply', attributes, function (err, id) {
        if(err){
          alert("Houve um erro ao tentar salvar sua resposta! Por favor, tente novamente!");
          console.log(err.reason);
        } else {
          scrollTo($('#'+template.data._id), 500);
        }
      });
      Session.set('editing', undefined);
    }
    template.find('[name=reply-content]').value = "";

  }
});
