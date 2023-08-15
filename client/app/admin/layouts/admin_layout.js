Template.adminLayouts.onCreated(function() {
    // Meteor.subscribe('users');

    this.isAdmin = new ReactiveVar(false);
    const self = this
    Meteor.call('admin.control', Meteor.userId(), function(error, result)  {
        if (error) {
            console.log("error : ", error)
        }
        if (result) {
            console.log("Şu anda true olarak ayarlıyorum :",result)
            self.isAdmin.set(true);
        }
    })
});

Template.adminLayouts.helpers({ 
    isAdmin : function() {
        return Template.instance().isAdmin.get();
    }
}); 

Template.adminLayouts.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 
