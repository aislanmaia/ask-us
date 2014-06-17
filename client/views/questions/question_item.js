Template.question_item.helpers({
  submittedText: function () {
    var now = new Date();
    var submitted = new Date(this.submitted);
    console.log("submitted: "+ submitted);

    var current_hour = now.getHours();
    console.log("hora atual: " + current_hour);
    var submitted_hour = submitted.getHours();
    console.log("hora da postagen: " + submitted_hour);
    var difference_hour = current_hour - submitted_hour;

    var current_minutes = now.getMinutes();
    var submitted_minutes = submitted.getMinutes();
    var difference_minute = current_minutes - submitted_minutes;

    if (current_hour === submitted_hour) {
      return new Date(this.submitted).getMinutes() + " minutos ";
    } else {
      if (difference_hour > 1) {
        return new Date(difference_hour).getHours() + " horas ";
      } else {
        return new Date(difference_hour).getHours() + " hora ";
      }
    }
  }
});
