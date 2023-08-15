
Template.registerHelper(
    "whoIs", function (userId) {
        const user = Meteor.users.findOne(userId);
        if (!user) {
            return "Not Found"
        }
        return user
    }
)

