Template.search_form.events({
  "submit .sidebar-form": function (event, template) {
    event.preventDefault();
    var query = template.find('[name=query]').value;
    Session.set('query', query);

    Router.go('questions_search');
  }
});
