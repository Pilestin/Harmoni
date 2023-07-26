

Meteor.methods({
    'user_.update' : function(user){
        console.log("user_.update methodu çalıştı");
        console.log("user : ", user)
        return User.update(user);
    }
});
