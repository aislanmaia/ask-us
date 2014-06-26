Template.replies_preview.events({
  "click .read-more": function (event, template) {

    Session.set('view_reply', template.data._id);
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

Template.replies_list.events({
  "click #user_replies": function (event, template) {
    $("#user_replies").addClass('active');
    $("#replies_by_others").removeClass('active');
  },

  "click #replies_by_others": function (event, template) {
    $("#replies_by_others").addClass('active');
    $("#user_replies").removeClass('active');
  }
});
