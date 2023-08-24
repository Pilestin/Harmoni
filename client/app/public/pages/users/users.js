import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.pagesUsers.onCreated(function () {

    const self = this
    self.subscribeUsers = self.subscribe('users.list')
    self.subscribeMusics = self.subscribe('music.list')
    self.subscribeMusicFiles = self.subscribe('musicFiles.all')


    self.autorun(function () {

    })
})

Template.pagesUsers.helpers({

    allUsers: function () {
        const users = Meteor.users.find({}).fetch();
        return users;
    },
    myFriends: function () {
        const me = Meteor.user();
        const friends = me.friendList;
        return friends;
    },
    isFriend: function (user) {

        const me = Meteor.user();
        const friends = me.friendList;


        const isFriend = friends.find((friend) => friend._id === user._id);
        return isFriend ? true : false;
    },
    userResults: function () {
        return UserResults.get('userResults');
    },
    myFollowers : function(){
        // const me = Meteor.user();
        // const followers = me.followerList;
        const followers = ["çok", "yakında"];
        return followers;
    }





});

Template.pagesUsers.events({
    'click #btnAddFriend': function (event, template) {

        const user = this;
        const userId = user._id;
        const me = Meteor.user();
        const myId = me._id;

        if (myId === userId) {
            alert("Bu kadar yalnızlık da fazla :(");
            return;
        }
        else {

            Meteor.call('user_addFriend', userId, function (err, res) {
                if (err) {
                    console.log("err : ", err);
                } else {
                    console.log("Arkadaş eklendi: ", userId);
                }
            });
        }

        console.log("userId : ", userId);
        // Meteor.call('user_addFriend', userId, function(err, res){
        //     if (err) {
        //         console.log("err : ", err);
        //     } else {
        //         console.log("Arkadaş eklendi: ", userId);
        //     }
        // }
        // );

    },

    'click #btnUnFriend': function (event, template) {

        const user = this;
        const userId = user._id;
        console.log("Şimdi btnUnfriend butonuna tıklandı")
        Meteor.call('user_unfriend', userId, function (err, res) {
            if (err) {
                console.log("err : ", err);
            } else {
                console.log("Arkadaş silindi: ", user._id);
            }
        }
        )
    },
    'click #btnTurnHome': function (event, template) {
        FlowRouter.go('pages.home');
    },
    'input #userSearchInputUsersPage': function (event, template) {
        event.preventDefault();
        const query = document.getElementById('userSearchInputUsersPage').value;
        if (query.trim() === '' || query.trim().length < 3) {
            return [];
        }
        Meteor.call('user.search', query, function (err, res) {
            if (err) {
                console.log("err : ", err)
            }
            UserResults.set('userResults', res);
            console.log(res)
        })

    },
    'click #btnShowUserResults': function (event, template) {
        if ($("#resultsUserBody").css("display") == "none") {
            $("#resultsUserBody").css("display", "")
        } else {
            $("#resultsUserBody").css("display", "none")
        }
    },


});

Template.componentsNavbar.onDestroyed(function () {

    UserResults.set('userResults', []);

});