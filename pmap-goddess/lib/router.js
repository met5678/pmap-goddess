Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'screenMap'});
Router.route('/admin', {name: 'admin'});