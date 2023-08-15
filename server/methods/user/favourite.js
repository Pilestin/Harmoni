

Meteor.methods({
    'user_favourite': function(music) {
        

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        const user = Meteor.user();
        
        Meteor.users.update({_id: user._id}, {$addToSet: {favouriteMusic: music}});
        return true;
    }
})

Meteor.methods({
    'user_unfavourite': function(music) {
    
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        const user = Meteor.user();
        Meteor.users.update({_id: user._id}, {$pull: {favouriteMusic: music}});
    }
})
