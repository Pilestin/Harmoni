import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

Template.adminUsers.onCreated(function() {

    this.subscribeUsers = this.subscribe('users.list');

});



Template.adminUsers.helpers({ 
    'allUsers': function(){
        const users = Meteor.users.find({}).fetch()
        return users
    }

}); 

Template.adminUsers.events({ 
    'click .btnDeleteUser': function(event, template) { 
        const user = this;
        Meteor.call("user.delete", user, function(err, res){
            if(err){
                console.log("err : ", err)
            }else{
                console.log("res : ", res)
            }
        })
    },
    'click #btnUserPage': function( event, template) { 
        event.preventDefault();
        const user = this;
        FlowRouter.go('/user/' + user._id);
    }
}); 

Template.adminUsers.onDestroyed(function () {

    this.subscribeUsers.stop() 

});