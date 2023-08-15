
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Session } from 'meteor/session';


FlowRouter.route('/admin', {
  name: 'admin.home',
  action: function (params, queryParams) {
    this.render('adminLayouts', { page: 'adminLayouts ' });
  }
});

FlowRouter.route('/admin/music', {
  name: 'admin.music',
  action: function (params, queryParams) {
    this.render('adminLayouts', { page: 'adminMusics' });
  }
});

FlowRouter.route('/admin/users', {
  name: 'admin.users',
  action: function (params, queryParams) {
    this.render('adminLayouts', { page: 'adminUsers' });
  }
});

// FlowRouter.route('/dashboard', {
//   name: 'admin.dashboard',
//   triggersEnter: [checkAdmin],
//   action: function (params, queryParams) {
//     this.render('adminLayouts', { page: 'adminDashboard' });
//   }
// });
