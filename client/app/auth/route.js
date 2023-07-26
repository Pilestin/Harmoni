import { FlowRouter } from 'meteor/ostrio:flow-router-extra';



FlowRouter.route('/', {
    name: 'auth.login',
    action: function (params, queryParams) {
        this.render('authLayoutDefault', { page: 'pagesLogin' });
    }
});

FlowRouter.route('/login', {
    name: 'auth.login',
    action: function (params, queryParams) {
        this.render('authLayoutDefault', { page: 'pagesLogin' });
    }
});


FlowRouter.route('/sign-in', {
    name: 'auth.signin',
    action: function (params, queryParams) {
        this.render('authLayoutDefault', { page: 'pagesSignIn' });
    }
});

