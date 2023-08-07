Template.pagesUsers.onCreated(function () {

    const self = this
    self.subscribeUsers = self.subscribe('users.list')
    self.subscribeMusics = self.subscribe('music.list')
    self.subscribeMusicFiles = self.subscribe('musicFiles.all')

    self.users = new ReactiveVar()
    self.musics = new ReactiveVar()
    self.musicFiles = new ReactiveVar()

    self.autorun(function () {
        if (self.subscribeUsers.ready()) {
            const users = Meteor.users.find({}).fetch()
            self.users.set(users)
        }
        if (self.subscribeMusics.ready()) {
            const musics = Music.find({}).fetch()
            self.musics.set(musics)
        }
        if (self.subscribeMusicFiles.ready()) {
            const musicFiles = MusicFiles.find({}).fetch()
            self.musicFiles.set(musicFiles)
        }
    })
})



Template.pagesUsers.helpers({ 
    
    allUsers: function() {
        const users = Meteor.users.find({}).fetch();
        return users;
    },
    myFriends: function() {
        const user = Meteor.user();
        const friends = user.friendList;
        console.log("friends : ", friends);
        return friends;
    },
    isFriend: function(user) {

        const me = Meteor.user();
        const friends = me.friendList;


        const isFriend = friends.find((friend) => friend._id === user._id);
        console.log("isFriend : ", isFriend);
        return isFriend ? true : false;
    }


}); 

Template.pagesUsers.events({ 
    'click #btnAddFriend': function(event, template) { 
        
        const user = this;
        const userId = user._id;
        const me = Meteor.user();
        const myId = me._id;

        if(myId === userId) {
            alert("Bu kadar yalnızlık da fazla :(");
            return;
        }
        else{
            
            Meteor.call('user_addFriend', userId, function(err, res){
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

    } ,

    'click #btnUnFriend': function(event, template) {

        const user = this;
        const userId = user._id;
        console.log("Şimdi btnUnfriend butonuna tıklandı")
        Meteor.call('user_unfriend', userId, function(err, res){
            if (err) {
                console.log("err : ", err);
            } else {
                console.log("Arkadaş silindi: ", user._id);
            }
        }
        )}
});
