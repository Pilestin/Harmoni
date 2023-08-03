

Meteor.methods({
    'user_update' : function(user){
        console.log("user_.update methodu çalıştı");
        console.log("user : ", user)
        return User.update(user);
    }
});
