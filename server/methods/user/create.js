

Meteor.methods({ 
    'user_.insert' : function(user)  {
        console.log("users.insert methodu çalıştı");
        console.log("user : ", user)
        return User.insert(user);
    }
})