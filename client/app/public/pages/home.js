

Template.pagesHome.onCreated(function () {

    this.userList= new ReactiveVar([]);
    this.subscribeUsers = this.subscribe('users.list'); // Kullanıcıları abone ediyoruz
    console.log("this.subscribeUsers : ", this.subscribeUsers)
});

Template.pagesHome.onRendered(function () {
    
    const self = this;

    this.autorun(function () {

        if (self.subscribeUsers.ready()) {
          const user = Meteor.user();
          console.log("user : ", user)
          if (user) {
            const firstName = user.firstName;
            console.log("firstName : ", firstName);
          }
        }
      });
    });

Template.pagesHome.helpers({ 
    // Kullanıcı bilgilerini döndüren helper
    currentUser: function() {
        console.log("Meteor.userId() : ", Meteor.userId())
        currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
        console.log("currentUser : " , currentUser.firstName)
        return  Meteor.user();
    },
    allUsers: function() {
        return Template.instance().users.get();
    },

    // Tüm müzikleri döndüren helper
    allMusic: function() {
        return ["deneme1", "deneme2"]
        // return Music.find().fetch();
    }
});



Template.pagesHome.onDestroyed(function () {
    const self = this
    self.subscribeUsers.stop()
})