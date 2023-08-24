Template.adminLayouts.onCreated(function () {
    // Meteor.subscribe('users');

    this.isAdmin = new ReactiveVar(false);
    this.isLoading = new ReactiveVar(true); // Yükleme durumunu saklayacak ReactiveVar

    const self = this
    const user = Meteor.userId();

    // loader - animasyon 

});

Template.adminLayouts.helpers({
    isAdmin: function () {
        return Template.instance().isAdmin.get();
    },
    isLoading: function () {
        //timeout ile 1 saniye bekletiyoruz
        Meteor.setTimeout(function () {
            
        }, 1000);
        return Template.instance().isLoading.get();
    }
});

Template.adminLayouts.events({

});

Template.adminLayouts.onRendered(function () {
    const self = this;
    Meteor.call('admin.control', Meteor.userId(), function (error, result) {
        if (error) {
            console.log("error : ", error);
        }
        if (result) {
            self.isAdmin.set(true);
        }
        self.isLoading.set(false);
    });
})