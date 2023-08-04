

Meteor.methods({
    'user_currentPlay': function(music){
        const user = Meteor.user();
        if(user){
            Meteor.users.update({_id: user._id}, {$set: {currentPlay: music}});
            return true;
        }
    }
})