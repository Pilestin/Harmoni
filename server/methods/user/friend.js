Meteor.methods({
    'user_addFriend': function(userId) {

        const me = Meteor.user();

        Meteor.users.update({_id: me._id}, {
            $addToSet: {
                friendList: {
                    _id: userId
                }
            }
        });
        // birini eklediğinde o da seni eklemiş olur
        Meteor.users.update({_id: userId}, {
            $addToSet: {
                friendList: {
                    _id: me._id
                }   
            }
        });
    }
})

Meteor.methods({
    'user_unfriend': function(userId) {

        const me = Meteor.user();
        Meteor.users.update({_id: me._id}, {
            $pull: {
                friendList: {
                    _id: userId
                }
            }
        });
        // birini çıkardığında o da seni çıkarmış olur fakat bunu kapatacağım :D
        // Meteor.users.update({_id: userId}, { 
        //     $pull: {
        //         friendList: {
        //             _id: me._id
        //         }   
        //     }
        // });
    }
})