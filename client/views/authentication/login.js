Template.login.rendered = function () {
  Router.go('login');
};

Template.login.events({
  //"click #login": function (event, template) {
    //var username = template.find('[name=username]').value;
    //var password = template.find('[name=password]').value;

    //Meteor.loginWithPassword(username, password, function (error) {
      //if (error) {
        //alert("Houve um erro ao tentar logar. Por favor, tente novamente!\n Razão: "+error.reason);
      //}
    //});
  //},

  "click #login-with-github": function (event, template) {
    Meteor.loginWithGithub({
      requestPermissions: ['user', 'public_repo']
    }, function( error ){
      if (error) {
        alert("Houve um erro ao tentar logar. Por favor, tente novamente!\n Razão: "+error.reason);
      }
    });
  },

  'submit form': function (event, template) {
    event.preventDefault();
    var username = template.find('[name=username]').value;
    var password = template.find('[name=password]').value;

    Meteor.loginWithPassword(username, password, function (error) {
      if (error) {
        alert("Houve um erro ao tentar logar. Por favor, tente novamente!\n Razão: "+error.reason);
      }
    });
  }
});
