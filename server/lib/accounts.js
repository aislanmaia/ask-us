Accounts.onCreateUser(function (options, user) {
  if (user.services.github) {
    var accessToken = user.services.github.accessToken,
      result,
      profile;

    result = Meteor.http.get("https://api.github.com/user", {
      headers: {
        "User-Agent": "Meteor AskUs"
      },
      params: {
        access_token: accessToken
      }
    });

    if (result.error) {
      throw result.error;
    }

    profile = _.pick(result.data,
      "login",
      "name",
      "avatar_url",
      "url",
      "company",
      "blog",
      "location",
      "email",
      "bio",
      "html_url");

    user.profile = profile;
  } else {
    user.profile = options.profile;
  }

  return user;
});

function service(type_service, user) {
  if (type_service) {
    user['profile'] = {
      name: type_service.name
    };
  } else {
    user['profile'] = options.profile;
  }
};

