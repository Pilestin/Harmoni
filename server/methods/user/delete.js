

Meteor.methods({
    'user_.delete'(user) {
        console.log("users.delete methodu çalıştı");
        console.log("user : ", user)
        return User.remove(user);
    }
})

