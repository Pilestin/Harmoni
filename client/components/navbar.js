import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.componentsNavbar.events({
    'click .brd-sign-out': function (event, template) {
      Meteor.logout(function (error) {
        if (error) {
          // todo error handling
          return
        }
  
        FlowRouter.go('/home')
      })
    },
    'click .brd-profile': function (event, template) {
      FlowRouter.go('/myprofile')
    },
    'click .brd-settings': function (event, template) {
      FlowRouter.go('/settings')
    }


  })

  Template.componentsNavbar.helpers({
    currentUser : function(){
        return Meteor.user();
    }  
    })

  