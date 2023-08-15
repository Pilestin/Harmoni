import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.adminDashboard.helpers({ 
    create: function() { 
         
    }, 
    rendered: function() { 
         
    }, 
    destroyed: function() { 
         
    }, 
}); 

Template.adminDashboard.events({ 

    'click #btnAdminBackHome' : function(event, template) {
        event.preventDefault();
        FlowRouter.go('/home');
    },

    'click #btnAdminAllMusics': function(event, template) { 
        FlowRouter.go('/admin/music');
    },
    'click #btnAdminAllUsers': function(event, template) { 
        FlowRouter.go('/admin/users');
    },
    'click #btnAdminSettings': function(event, template) {
        FlowRouter.go('/admin/settings');
    }
}); 
