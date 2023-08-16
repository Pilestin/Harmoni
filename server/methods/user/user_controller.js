// CRUD OPERATIONS
Meteor.methods({
    'user_insert': function (user) {
        console.log("users.insert methodu çalıştı");
        console.log("user : ", user)
        return User.insert(user);
    },
    'user_list': function () {
        console.log("user_.list methodu çalıştı");
        return User.find({}).fetch();
    },
    'user_delete'(user) {
        console.log("users.delete methodu çalıştı");
        console.log("user : ", user)
        return User.remove(user);
    },
    'user_update': function (user) {
        console.log("user_.update methodu çalıştı");
        console.log("user : ", user)
        return User.update(user);
    }

})
// CURRENT PLAY 
Meteor.methods({
    'user_currentPlay': function (music) {
        const user = Meteor.user();
        if (user) {
            Meteor.users.update({ _id: user._id }, { $set: { currentPlay: music } });
            return true;
        }
    }
})



// FAVOURİTE MUSİC
Meteor.methods({
    'user_favourite': function (music) {


        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        const user = Meteor.user();

        Meteor.users.update({ _id: user._id }, { $addToSet: { favouriteMusic: music } });
        return true;
    },
    'user_unfavourite': function (music) {

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        const user = Meteor.user();
        Meteor.users.update({ _id: user._id }, { $pull: { favouriteMusic: music } });
    }
})


// FOLLOW - UNFOLLOW
Meteor.methods({
    'user_addFriend': function (userId) {

        const me = Meteor.user();

        Meteor.users.update({ _id: me._id }, {
            $addToSet: {
                friendList: {
                    _id: userId
                }
            }
        });
        // birini eklediğinde o da seni eklemiş olur
        Meteor.users.update({ _id: userId }, {
            $addToSet: {
                friendList: {
                    _id: me._id
                }
            }
        });
    },
    'user_unfriend': function (userId) {

        const me = Meteor.user();
        Meteor.users.update({ _id: me._id }, {
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

// USER SEARCH 
Meteor.methods({
    'user.search': function (query) {

        const userId = Meteor.userId();
        const user = Meteor.users.findOne({ _id: userId });

        if (query.trim() === '' || query.trim().length < 3) {
            return [];
        }

        if (user) {
            const result = Meteor.users.find({
                $or: [
                    // options i : case sensitive olmaması için
                    { firstName: { $regex: query, $options: 'i' } },
                    { lastName: { $regex: query, $options: 'i' } }
                ]
            }).fetch();
            console.log("result : ", result)
            return result;
        }

        return [];
    }
})