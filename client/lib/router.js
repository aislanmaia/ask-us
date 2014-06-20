Router.map(function () {
  this.route('home', {
    path: '/',
    layoutTemplate: 'layout'
  });

  this.route('new_question', {
    path: '/questions/new',
    layoutTemplate: 'layout'
  });

  this.route('questions_list', {
    path: '/questions/',
    layoutTemplate: 'layout',
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
    layoutTemplate: 'layout',
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

  this.route('question_page', {
      path: '/questions/:_id',
      layoutTemplate: 'layout',
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
