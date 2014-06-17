Router.map(function () {
  this.route('home', {
    path: '/',
    layoutTemplate: 'layout'
  });

  this.route('new_question', {
    path: '/questions/new',
    layoutTemplate: 'layout'
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
