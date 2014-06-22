Template.question_item.helpers({
  submittedText: function () {
    var now = new Date();
    var submitted = new Date(this.submitted);
    console.log("submitted: "+ submitted);

    var current_hour = now.getHours();
    console.log("hora atual: " + current_hour);
    var submitted_hour = submitted.getHours();
    console.log("hora da postagen: " + submitted_hour);
    var difference_hour = current_hour - submitted_hour;

    var current_minutes = now.getMinutes();
    var submitted_minutes = submitted.getMinutes();
    var difference_minute = current_minutes - submitted_minutes;

    if (current_hour === submitted_hour) {
      return new Date(this.submitted).getMinutes() + " minutos ";
    } else {
      if (difference_hour > 1) {
        return new Date(difference_hour).getHours() + " horas ";
      } else {
        return new Date(difference_hour).getHours() + " hora ";
      }
    }
  },

  ownQuestion: function () {
    return this.author._id === Meteor.userId();
  },

  following: function () {
    return QuestionsFollowed.isFollowing(this._id, Meteor.userId());
  }
});

Template.question_item.events({
  "click .question-reply a": function (event, template) {
    event.preventDefault();

    var textarea_reply = $(".reply").find('[name=reply-content]');
    scrollTo($(".reply"), 1000);
    textarea_reply.focus();
  },

  "click .question-follow a": function (event, template) {
    event.preventDefault();

    template.find('div.question-follow').className = "question-unfollow";
    template.find('.fa-eye').className = "fa fa-eye-slash fa-2x";
    $('div.question-unfollow > a > span > b').html("Deixar de seguir esta pergunta!");

    var question_follow = {
      question_id: event.currentTarget.id,
      user_id: Meteor.userId()
    };

    Meteor.call('question_follow', question_follow, function (err, id) {
      if (err) {
        alert("Houve um erro ao tentar seguir a pergunta! Por favor, tente novamente!");
        console.log("Erro: "+err.reason);
      }
    });

    //$(event.target).closest('a').css({
      //"pointer-events": "none",
      //"cursor": "default"
    //});
  },

  "click .question-unfollow a": function (event, template) {
     event.preventDefault();

     template.find('div.question-unfollow').className = "question-follow";
     template.find('.fa-eye-slash').className = "fa fa-eye fa-2x";
     $('div.question-follow > a > span > b').html("Seguir esta pergunta!");
     alert(template.data._id);

     Meteor.call('question_unfollow', template.data._id, function (err, id) {
       if (err) {
         alert("Houve um erro ao tentar deixar de seguir a pergunta! Por favor, tente novamente!");
         console.log("Erro: "+err.reason);
       } else {
         alert("Deu certo!");
       }
     });

   }
});

function scrollTo(element, speed) {
  $(document.body).animate({
    'scrollTop': element.offset().top
  }, speed);
}
