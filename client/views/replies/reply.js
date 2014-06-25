Template.reply.events({
  "click .reply-edit": function (event, template) {
    event.preventDefault();

    var text = template.data.text;

    $('[name=reply-content]').val(text);
    Session.set('editing', template.data._id);
    scrollTo($('.reply'), 1000);
  },

  "click .reply-remove": function (event, template) {
    event.preventDefault();

    bootbox.dialog({
      message: "Você tem certeza que quer excluir esta resposta?",
      buttons: {
        success: {
          label: "Sim",
          className: "btn-success",
          callback: function () {
            Meteor.call('removeReply', template.data._id, function (error, id) {
              if (error) {
                alert("Não foi possível excluir a resposta neste momento. Tente novamente em instantes.");
                console.log(error.reason);
              }
            });
          }
        },
        danger: {
          label: "Cancelar",
          className: "btn-danger",
          callback: function () {

          }
        }
      }
    });
  }
});

Template.reply.helpers({
  ownReply: function () {
    return this.author._id === Meteor.userId();
  }
});
