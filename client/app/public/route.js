import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


FlowRouter.route('/home', {
  name: 'pages.home',
  action: function (params, queryParams) {
    this.render('publicLayouts', { page: 'pagesHome' });
  }
});

FlowRouter.route('/myprofile', {
  name: 'pages.myprofile',
  action: function (params, queryParams) {
    this.render('publicLayouts', { page: 'pagesProfile' });
  }
});

FlowRouter.route('/settings', {
  name: 'pages.settings',
  action: function (params, queryParams) {
    this.render('publicLayouts', { page: 'pagesSettings' });
  }
});

// FlowRouter.route('/signin', {
//   name: 'auth.signin',
//   action: function (params, queryParams) {
//     this.render('publicLayouts', { page: 'pagesSignIn' });
//   }
// });



FlowRouter.route('*', {
  action() {
    this.render('notFound');
  }
});

