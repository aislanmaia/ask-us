Template.user_loggedin.events({
  "click #logout": function (event, template) {
    Meteor.logout(function (error) {
      if (error) {
        alert("Houve um error ao tentar deslogar. Por favor, tente novamente!\n Razão: "+error.reason);
      } else {
        Session.set('route_for_back', undefined);
      }
    });
  }
});
