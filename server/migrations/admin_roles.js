Migrations.add({
    version: 1,
    name: 'Add admin roles',
    up: function () {
        const _user = Accounts.createUser({
            email: 'admin@admin.com',
            password: '123',
            firstName : 'Admin',
            lastName : 'Yasin',
            profilePhoto : 'https://www.w3schools.com/howto/img_avatar.png',
            roles: ['admin']
    
        });
        Meteor.users.update(_user, {
            $set: { 
                'isAdmin': true,
            }
        });

    },

   
});
//