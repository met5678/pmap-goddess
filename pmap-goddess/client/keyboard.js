Meteor.startup(function() {
  $(document).keydown(function(e) {
    if(e.which == 70 && e.ctrlKey) {
        $(document).fullScreen(true);
    }
  }
});