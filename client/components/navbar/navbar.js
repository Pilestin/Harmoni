import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.componentsNavbar.events({



  })

  Template.componentsNavbar.helpers({
    currentUser : function(){
        return Meteor.user();
    }  
    })

  