Template.new_user.events({
  'submit form': function (event, template) {
    event.preventDefault();

    //var attributes = {
      //email: template.find('[name=email]').value,
      //name: template.find('[name=fullname]').value,
      //username: template.find('[name=username]').value,
      //password: template.find('[name=password]').value
    //};
    var email = template.find('[name=email]').value;
    var name = template.find('[name=fullname]').value;
    var username = template.find('[name=username]').value;
    var password = template.find('[name=password]').value;
    var password2 = template.find('[name=password2]').value;

    if (isPasswordMatch(password, password2)) {
      //Meteor.call('user_create', attributes, function (err, id) {
        //if (!err) {
          //Router.go('home');
        //} else {
          //alert("Error: " + err.reason);
        //}
      //});
      Accounts.createUser({
        username: username,
        email: email,
        password: password,
        profile: {
          name: name
        },
        questions: {
          count: 0
        },
        replies: {
          count: 0
        }
      }, function (error) {
        if (error) {
          console.log("Cannot create user. Reason: " + error.reason);
        } else {
          var routeBack = Session.get('route_for_back');
          if (routeBack)
            Router.go(routeBack);
          else
            Router.go('home');
        }
      });
    }
  }
});

isPasswordMatch = function (password1, password2) {
  return password1 === password2;
};
