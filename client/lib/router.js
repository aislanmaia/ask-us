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
        questions: Questions.find({"author._id": Meteor.userId()})
      };
    }
  });

  this.route('questions_list_followed', {
    path: '/questions/followed/',
    template: 'questions_list',
    waitOn: function () {
      return [
        Meteor.subscribe('user_questions_followed', Meteor.userId()),
        Meteor.subscribe('questions_followed', QuestionsFollowed.questionIds(Meteor.userId()))
      ];
    },
    data: function () {
      return {
        user_questions_followed: QuestionsFollowed.find({user_id: Meteor.userId()}),
        questions: Questions.find()
      };
    }
  });

  this.route('questions_search', {
    path: '/search',
    waitOn: function () {
      return [
        Meteor.subscribe('searched_questions', Session.get('query')),
        //Meteor.subscribe('authors', Questions.authorIds())
      ];
    },
    data: function () {
      return {
        questions: Questions.find({}, {sort:{_id: -1}}),
        //authors: Meteor.users.find()
      };
    }
  });

  this.route('replies_list', {
    path: '/replies',
    waitOn: function () {
      return [
        Meteor.subscribe('user_replies', Meteor.userId())
      ];
    },
    data: function () {
      return {
        replies: Replies.find({}, {sort: {submitted: -1}})
      };
    }
  });

  this.route('replies_list_from_others', {
    path: '/replies/others',
    template: 'replies_list',
    waitOn: function () {
      var user_id = Meteor.userId();
      return [
        Meteor.subscribe('user_questions', user_id),
        Meteor.subscribe('replies_in_questions', Questions.questionIds(), user_id)
      ];
    },
    data: function () {
      return {
        replies: Replies.find({}, {sort: { submitted: -1 }})
      };
    }
  });

  this.route('new_user', {
    path: '/users/new',
    layoutTemplate: 'layout_authentication'
  });

  this.route('question_page', {
    path: '/questions/:_id',
    waitOn: function () {
      var question_id = this.params._id;
      return [
        Meteor.subscribe('question', question_id),
        Meteor.subscribe('user_is_following_question', question_id, Meteor.userId()),
        Meteor.subscribe('all_followed_from_question', question_id),
        Meteor.subscribe('question_replies', question_id)
        //Meteor.subscribe('author', this.params._id)
      ];
    },
    data: function () {
      return {
        question: Questions.findOne(this.params._id),
        replies: Replies.find(),
        numberFollowed: QuestionsFollowed.find().count()
      };
    }
  });

});

