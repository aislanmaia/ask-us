Template.notifications_menu.helpers({
  isNotificationReply: function () {
    if (this.type === "reply") {
      return true;
    }
    return false;
  },
  isNotificationFollowQuestion: function () {
    if (this.type === "follow_question") {
      return true;
    }
    return false;
  },

  iconTypeClass: function () {
    if (this.type === "reply") {
      return "fa-reply-all";
    }
    if (this.type === "follow_question") {
      return "fa-question";
    }
    if (this.type === "approbation") {
      return "fa-thumbs-up";
    }

  },
  labelTypeClass: function () {
    if (this.type === "reply") {
      return "label-success";
    }
    if (this.type === "follow_question") {
      return "label-warning";
    }
    if (this.type === "approbation") {
      return "label-danger";
    }
  }

});
