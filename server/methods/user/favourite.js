

Meteor.methods({
    'user_favourite': function(musicId) {
        
        console.log("BACKEND DE user_favourite methodu çalıştı")

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        const user = Meteor.user();
        
        Meteor.users.update({_id: user._id}, {$addToSet: {favouriteMusic: musicId}});
        return true;
    }
})

Meteor.methods({
    'user_unfavourite': function(musicId) {
        console.log("BACKEND DE user_unfavourite methodu çalıştı")
    
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        const user = Meteor.user();
        Meteor.users.update({_id: user._id}, {$pull: {favouriteMusic: musicId}});
    }
})
