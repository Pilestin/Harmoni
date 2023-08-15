Meteor.methods({
    'admin.control' : function(userId) {
        console.log("Server userId : ", userId)
        const user = Meteor.users.findOne({ _id: userId });
        console.log("Server User ->  : ", user)
        if (user && user.isAdmin) {
            console.log("Admin")
            return true;
        }
        return false
    }

});