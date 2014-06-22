Router.configure({
  layoutTemplate: 'layout'
});

var BeforeHooks = {
  isLoggedIn: function (pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.render('login');
      pause();
    }
  },
  guestOnly: function (pause) {
    if(Meteor.user()){
      var route = Session.get('route_for_back');
      if(route){
        return Router.go(route);
      } else {
        if(Router.current().route.name === 'login') {
          return Router.go('home');
        }
      }
    }
  },
};

var hooks = {
  backForRoute: function (pause) {
    if(!Meteor.user()){
      Session.set('route_for_back', Router.current().route.name);
    } else {
      Session.set('route_for_back', undefined);
    }
  }
};

Router.onRun(hooks.backForRoute, {except: [
  'login',
  'new_user'
]});

Router.onBeforeAction(BeforeHooks.isLoggedIn, {except: [
  'new_user',
  'login'
]});
Router.onBeforeAction(BeforeHooks.guestOnly, {only: [
  'login',
  'new_user'
]});

Router.map(function () {
  this.route('login', {
    path: '/login',
    layoutTemplate: 'layout_authentication'
  });

  this.route('home', {
    path: '/'
  });

  this.route('new_question', {
    path: '/questions/new'
  });

  this.route('questions_list', {
    path: '/questions/',
    waitOn: function () {
      return [
        Meteor.subscribe('user_questions', Meteor.userId()),
      ];
    },
    data: function () {
      return {
        questions: Questions.find({author_id: Meteor.userId()})
      };
    }
  });

  this.route('questions_list_followed', {
    path: '/questions/followed/',
    template: 'questions_list',
    waitOn: function () {
      return [
        Meteor.subscribe('questions_followed', Meteor.userId())
      ];
    },
    data: function () {
      return {
        questions: QuestionsFollowed.find({user_id: Meteor.userId()})
      };
    }
  });

  this.route('questions_search', {
    path: '/search',
    waitOn: function () {
      return [
        Meteor.subscribe('searched_questions', Session.get('query')),
        Meteor.subscribe('authors', Questions.authorIds())
      ];
    },
    data: function () {
      return {
        questions: Questions.find(),
        //authors: Meteor.users.find()
      };
    }
  });

  this.route('new_user', {
    path: 'users/new',
    layoutTemplate: 'layout_authentication'
  });

  this.route('question_page', {
    path: '/questions/:_id',
    waitOn: function () {
      return [
        Meteor.subscribe('question', this.params._id)
      ];
    },
    data: function () {
      return Questions.findOne(this.params._id);
    }
  });

});

