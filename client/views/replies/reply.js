Template.reply.rendered = function () {
  var reply_id = Session.get('view_reply');
  if (reply_id) {
    var reply_div = $("#"+ reply_id);
    scrollTo(reply_div, 500);
    Session.set('view_reply', undefined);

    reply_div.effect("highlight", {color: "#78AB46"}, 1000);

  }
};

Template.reply.events({
  "click .approvable": function (event, template) {

    var attributes = {
      _id: template.data._id,
      question_id: template.data.question_id,
      author_id: template.data.author._id
    };

    Meteor.call('approbation', attributes, function (error, id) {
      if (error) {
        alert("Não foi possível aprovar a resposta neste momento. Tente novamente em instantes.");
        console.log(error.reason);
      }
    });
  },
  "click .reply-edit": function (event, template) {
    event.preventDefault();

    var text = template.data.text;

    scrollTo($('.reply'), 500);
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
              } else {
                var users_id = [], author_question_id = event.currentTarget.className.split(" ")[1];
                users_id.push(template.data.author._id);
                users_id.push(author_question_id);
                Meteor.call('decrement_count_replies', users_id);
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
  },
  question: function () {
    return Questions.findOne();
  }
});
