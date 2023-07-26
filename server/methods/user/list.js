

Meteor.methods({
    'user_.list' : function(){
        console.log("user_.list methodu çalıştı");
        return User.find({}).fetch();
    }
});
