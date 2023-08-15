
Template.adminUsers.onCreated(function() {

    this.subscribeUsers = this.subscribe('users.list');

});



Template.adminUsers.helpers({ 
    'allUsers': function(){
        const users = Meteor.users.find({}).fetch()
        console.log("users : ", users);
        return users
    }

}); 

Template.adminUsers.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 

Template.adminUsers.onDestroyed(function () {

    this.subscribeUsers.stop() 

});