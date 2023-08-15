# Harmoni 

It is a social music application where you can listen to music, create lists, see your friends and what they are listening to.

[Achievement](#achievement-)

[Installation and Run](#installation-and-run-)

[How to play music (local)](#how-to-play-music-(local)-)

[Goals](goals)

[Koleksiyonlar (Collections)](#koleksiyonlar-(collections)-)

## Achievement : 

- Sign up and login
- Ability to listen to music
- Music search
- Ability to see music categories
- Ability to create favourite music lists
- Ability to follow users
- See what your friends are listening now
- Ability to listen to what your friends are listening to
  

<img src="https://github.com/Pilestin/Harmoni/assets/56133248/99b5e4c3-08d7-41e4-9e73-6f95d68956a0" width="700px">
<img src="https://github.com/Pilestin/Harmoni/assets/56133248/b3e669d6-9334-4dca-907a-aa774330f7a5" width="700px">
<img src="https://github.com/Pilestin/Harmoni/assets/56133248/a5a275a9-7fd4-4106-9ff1-b905228443c2" width="700px">
<img src="https://github.com/Pilestin/Harmoni/assets/56133248/2832d4c0-0c69-4ae2-8201-c3cbd6aab564" width="700px">





### Installations and Run :

```bash
> git clone https://github.com/Pilestin/Harmoni
> cd Harmoni
> npm install
> meteor
```


### How to play music (local) :

The music uploaded in the project is copied in the public/musics folder (like public/images in images). The feature of this folder is that it can be accessed from the url.

Using this, the music is taken from the url (saved with the id) and turned into a playable content.

e.x : http://localhost:3000/musics/C4tb7b62sYRndiApJ.mp3 

on server : 
  
  ```jsx
    WebApp.connectHandlers.use('/musics', (req, res) => {
    const musicFile = Assets.absoluteFilePath('musics/' + req.url.slice(1));
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment');
    res.writeHead(200);
    const readStream = fs.createReadStream(musicFile);
    readStream.pipe(res);
  });
  ```

  on client : 

  ```jsx
  const playMusic = function (music) {
    const musicFile = MusicFiles.findOne({ _id: music.fileId });

    const musicUrl = 'http://localhost:3000/musics/' + musicFile._id + musicFile.extensionWithDot; // Sunucudan alacağınız müzik dosyasının URL'si

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    fetch(musicUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(decodedData => {
            const audioElement = document.getElementById('audioPlayer');
            audioElement.src = musicUrl; // Audio etiketine URL'yi atıyoruz
            audioElement.play(); // Müziği çalıyoruz
        })
        .catch(error => console.error('Error loading audio: ', error));


    Meteor.call('user_currentPlay', music, function (err, res) {
        if (err) {
            console.log("err : ", err)
        }
        console.log("res : ", res)
    });
}
  ```

  
### Goals:

- [x]  Sign up and login
- [x]  Ability to listen to music
- [x]  Music search
- [x]  Ability to see music categories
- [x]  Ability to create music lists
- [x]  Ability to add friends
- [x]  See what your friends are listening now
- [x]  Ability to listen live to what your friends are listening to


### Koleksiyonlar (Collections) : : 

![Untitled](https://github.com/Pilestin/Harmoni/assets/56133248/62fda4ff-3c7e-4bce-bd35-25ec018e1d1b)


1. **Kullanıcılar (Users) :** 
- Kullanıcıların kimlik bilgilerini, e-posta, şifre gibi giriş bilgilerini içerir.
- Ayrıca kullanıcıya özel bilgiler, arkadaş listesi gibi ek özellikleri de içerebilir.
- Kullanıcıların müzik listelerine ve arkadaşlarına erişimini sağlamak için (ID) oluşturulabilir.

temp code : 

1. **Müzik Listeleri (Playlists)**
    
    
    - Kullanıcıların oluşturduğu müzik listelerini temsil eder.
    - Her müzik listesi, bir başlık, açıklama ve müziklerin bir listesini içerebilir.
    - Ayrıca müzik listesine sahip olan kullanıcının kimliği ile ilişkilendirilebilir.
2. **Müzik Kategorileri (Music Categories)**
    - Müzik listelerini belirli kategorilere ayırmak için kullanılabilir.
    - Her müzik kategorisi, bir ad ve açıklama içerebilir.
3. **Canlı Dinleme (Live Listening)**
    - Kullanıcıların arkadaşlarının canlı olarak ne dinlediklerini takip etmek için kullanılabilir.
    - Canlı dinleme durumu, kullanıcının kimliği ve dinlenen müziğin kimliği ile ilişkilendirilebilir.

```jsx
{
  "User" : {
    "_id" : "_??",
    "firstName": "Yasin",
    "lastName": "Ünal",
    "email" : "yasin@test.com",
    "password" : "123",
    "favoriteList" : [
      "_mId"
    ],
    "currentPlay" : "musicId",
    "friendList" : ["_uId"],
    "createdAt" : "DATE"
  },

  "Music" : {
    "_id" : "_??", 
    "name" : "",
    "artist": "",
    "link" : "",
    "duration" : "",
    "cId" : ""
  },

  "Categories" : {
    "_id" : "_??",
    "name" : "",
    "description": ""
  }

}
```
