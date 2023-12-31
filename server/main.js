import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

import { WebApp } from 'meteor/webapp';



Meteor.startup(() => {


  // Migrations.migrateTo(1);

  // Bu kodu yazan cennetlik 
  // WebApp.connectHandlers.use('/musics', (req, res) => {
  //   const musicFile = Assets.absoluteFilePath('musics/' + req.url.slice(1));

  //   res.setHeader('Content-Type', 'audio/mpeg');
  //   res.setHeader('Content-Disposition', 'attachment');
  //   res.writeHead(200);
  //   const readStream = fs.createReadStream(musicFile);
  //   readStream.pipe(res);
  // });

  // WebApp.connectHandlers.use('/musics/:trackId', (req, res, next) => {
  //   const { trackId } = req.params;
  //   const musicFile = path.join(process.env.PWD, 'public/musics', trackId);

  //   const stat = fs.statSync(musicFile);
  //   const fileSize = stat.size;
  //   const range = req.headers.range;

  //   if (range) {
  //     const parts = range.replace(/bytes=/, '').split('-');
  //     const start = parseInt(parts[0], 10);
  //     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  //     const chunkSize = (end - start) + 1;
  //     const file = fs.createReadStream(musicFile, { start, end });

  //     const headers = {
  //       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //       'Accept-Ranges': 'bytes',
  //       'Content-Length': chunkSize,
  //       'Content-Type': 'audio/mpeg',
  //     };

  //     res.writeHead(206, headers);
  //     file.pipe(res);
  //   } else {
  //     const headers = {
  //       'Content-Length': fileSize,
  //       'Content-Type': 'audio/mpeg',
  //     };
  //     res.writeHead(200, headers);
  //     fs.createReadStream(musicFile).pipe(res);
  //   }
  // });


  // control offline users currentPlay 

});

if (Meteor.isServer) {
  console.log("server çalıştı")
  Meteor.users.update(
    { "status.online": false },
    { $set: { currentPlay: "" } },
    { multi: true });
 
}

Accounts.onCreateUser((obj, user) => {

  Migrations.migrateTo(1);
  // user nesnesine ekstra özellikleri ekleyin
  user.firstName = obj.firstName;
  user.lastName = obj.lastName;
  user.email = obj.email;
  user.password = obj.password;
  user.favoriteMusic = [];
  user.currentPlay = "";
  user.friendList = [];
  user.profilePhoto = obj.profilePhoto;

  user.createdAt = new Date();
  user.updatedAt = new Date();



  // console.log("onCreateUser çalıştı")
  console.log("user server : ", user)
  // Düzenlenmiş kullanıcı nesnesini döndürün
  return user;
});



// ŞU AN KULLANILMIYOR AMA PROJEDE AKTİF
// SPOTİFY api kullanarak access token elde etmeye yarar. 
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

// ŞU AN KULLANILMIYOR AMA PROJEDE AKTİF
// SPOTİFY api kullanarak müzik aramaya yarar.
// Önce en alttaki metod ile access token elde edilir.
Meteor.methods({
  'searchMusic': async function (query) {
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

