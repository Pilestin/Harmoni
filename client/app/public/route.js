import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Session } from 'meteor/session';

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
    Session.set('currentPage', 'pagesSettings')
    console.log(Session.get('currentPage'))
    this.render('publicLayouts', { page: 'pagesSettings' });
  }
});

FlowRouter.route('/users', {
  name: 'pages.users',
  action: function (params, queryParams){

    this.render('publicLayouts', { page: 'pagesUsers' }); 
  }
});

FlowRouter.route('/category/:categoryName', {
  name: 'category',
  action(params) {
      this.render('pages.home', { content: 'categoryTemplate', categoryName: params.categoryName });
  }
});



// FlowRouter.route('/home/blues', {
//   name: 'pages.category.Blues',
//   action: function (params, queryParams) {
//     this.render('pagesHome', { categoryTemplate: 'categoryBlues' });
//   }
// });

// FlowRouter.route('/home', {
//   name: 'pages.category.Pop',
//   action: function (params, queryParams) {
//     this.render('pagesHome', { categoryTemplate: 'categoryPop' });
//   }
// });

// FlowRouter.route('/home', {
//   name: 'pages.category.Classical',
//   action: function (params, queryParams) {
//     this.render('pagesHome', { categoryTemplate: 'categoryClassical' });
//   }
// });

// FlowRouter.route('/home', {
//   name: 'pages.category.Turkish',
//   action: function (params, queryParams) {
//     this.render('pagesHome', { categoryTemplate: 'categoryTurkish' });
//   }
// });


// FlowRouter.route('/addMusic', {
//   name: 'modal.addMusic',
//   action: function (params, queryParams) {
//     this.render('publicLayouts', { page: 'pagesModalAddMusic' });
//   }
// });

// FlowRouter.route('/signin', {
//   name: 'auth.signin',
//   action: function (params, queryParams) {
//     this.render('publicLayouts', { page: 'pagesSignIn' });
//   }
// });

FlowRouter.route('/category', {
  name: 'pages.categories',
  action: function (params, queryParams) {
    this.render('publicLayouts', { category: params.name });
  }
});



FlowRouter.route('*', {
  action() {
    this.render('notFound');
  }
});

