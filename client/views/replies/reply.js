Template.reply.events({
  "click .approvable": function (event, template) {
    Meteor.call('approbation', template.data._id, function (error, id) {
      if (error) {
        alert("Não foi possível aprovar a resposta neste momento. Tente novamente em instantes.");
        console.log(error.reason);
      }
    });
  },
  "click .reply-edit": function (event, template) {
    event.preventDefault();

    var text = template.data.text;

    scrollTo($('.reply'), 1000);
    $('[name=reply-content]').val(text).focus();
    Session.set('editing', template.data._id);
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
  },
  approvesClass: function () {
    var user_id = Meteor.userId();
    if (!(_.include(this.approvers, user_id) || this.author._id === user_id)) {
      return 'approvable';
    } else {
      return 'disabled';
    }
  },
  numberApprobations: function () {
    return this.approbations;
  }
});
