function checkAdmin(context, redirect, stop) {
    if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
        redirect('/home'); // Admin değilse anasayfaya yönlendir
    }
}
