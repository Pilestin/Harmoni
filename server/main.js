import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Accounts.onCreateUser((obj, user) => {
  
  // user nesnesine ekstra özellikleri ekleyin
  user.firstName = obj.firstName;
  user.lastName = obj.lastName;
  user.email = obj.email;
  user.password = obj.password;
  user.favoriteMusic = [""];
  user.currentPlay = "";
  user.friendList = [""];
  user.createdAt = new Date();
  console.log("onCreateUser çalıştı")
  console.log("obj : ", user)
  // Düzenlenmiş kullanıcı nesnesini döndürün
  return user;
});


Meteor.methods({'list_user' : function(){
  console.log("list_user methodu çalıştı");
  return User.find({}).fetch();
}});


/* Music favori ekleme */ 
// Meteor.methods({
//   'users.addFavoriteMusic'(userId, musicId) {
//     // Kullanıcının favoriteMusic alanına müziği ekleyin
//     Users.update(userId, {
//       $addToSet: {
//         favoriteMusic: musicName,
//       },
//     });
//   },
// });