import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.pagesProfile.onCreated(function () {

    const self = this

    this.subscribeUsers = this.subscribe('users.list'); // Kullanıcıları abone ediyoruz
    this.subscribeMusics = this.subscribe('music.list'); 
    // Kullanıcı bilgilerini tutmak için
})


Template.pagesProfile.helpers({ 

    myFriends: function() {
        const me = Meteor.user();
        const friends = me.friendList;
        console.log("me : ", me)
        console.log("friends : ", friends)
        return friends;
    },
    myFavouriteMusic: function() {
        const me = Meteor.user();
        const favouriteMusic = me.favouriteMusic;
        return favouriteMusic;
    }, 


}); 

Template.pagesProfile.events({ 
    'click #btnProfileRemoveFriend': function(event, template) { 
        
        const user = this.user;
        const userId = user._id;
        Meteor.call('user_unfriend', userId, function(err, res){
            if (err) {
                console.log("err : ", err);
            } else {
                console.log("Arkadaş kaldırıldı: ", res);
            }
        });
    } ,
    'click #btnProfileRemoveMusic': function(event, template) {
        const music = this;
        console.log("music buymuş ", music);
        
        Meteor.call('user_unfavourite', music, function(err, res){
            if (err) {
                console.log("err : ", err);
            } else {
                console.log("Müzik kaldırıldı: ", res);
            }
        });
    },
    'click #btnProfileTurnHome' : function(event, template) {
        FlowRouter.go('pages.home');
    },
}); 
