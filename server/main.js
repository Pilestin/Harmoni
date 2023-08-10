import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

import { WebApp } from 'meteor/webapp';


Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use('/musics', (req, res) => {
    const musicFile = Assets.absoluteFilePath('musics/' + req.url.slice(1));
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment');
    res.writeHead(200);
    const readStream = fs.createReadStream(musicFile);
    readStream.pipe(res);
  });
});

Accounts.onCreateUser((obj, user) => {
  
  // user nesnesine ekstra özellikleri ekleyin
  user.firstName = obj.firstName;
  user.lastName = obj.lastName;
  user.email = obj.email;
  user.password = obj.password;
  user.favoriteMusic = [];
  user.currentPlay = "";
  user.friendList = [];
  user.createdAt = new Date();
  user.profilePhoto = obj.profilePhoto;
  // console.log("onCreateUser çalıştı")
  console.log("user server : ", user)
  // Düzenlenmiş kullanıcı nesnesini döndürün
  return user;
});


Meteor.methods({'list_user' : function(){
  console.log("list_user methodu çalıştı");
  return User.find({}).fetch();
}});


Meteor.methods({
  'searchMusic' : async function(query){
    const accessToken = await getAccessToken();
    const trackId = '3n3Ppam7vgaVa1iaRUc9Lp'; // Örnek olarak, bir şarkının Spotify ID'sini buraya girin

    const url = `https://api.spotify.com/v1/tracks/${trackId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Burada, alınan müzik verilerine 'data' değişkeni üzerinden erişebilirsiniz
      })
      .catch((error) => {
        console.error('Hata:', error);
      });
  }
})


async function getAccessToken() {
  const url = 'https://accounts.spotify.com/api/token';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const body = new URLSearchParams({ grant_type: 'client_credentials' });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const data = await response.json();
  return data.access_token;
}