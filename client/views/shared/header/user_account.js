Template.user_loggedout.events({
  "click #login": function (event, template) {
    Meteor.loginWithGithub({
      requestPermissions: ['user', 'public_repo']
    }, function( error ){
      if (error) {
        alert("Houve um erro ao tentar logar. Por favor, tente novamente!");
      }
    });
  }
});

Template.user_loggedin.events({
  "click #logout": function (event, template) {
    Meteor.logout(function (error) {
      if (error) {
        alert("Houve um error ao tentar deslogar. Por favor, tente novamente!");
      }
    });
  }
});
