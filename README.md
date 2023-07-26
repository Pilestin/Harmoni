# Harmoni 

It is a social music application where you can listen to music, create lists, see your friends and what they are listening to.

Goals:

- [ ]  Sign up and login
- [ ]  Ability to listen to music
- [ ]  Music search
- [ ]  Ability to see music categories
- [ ]  Ability to create music lists
- [ ]  Ability to add friends
- [ ]  See what your friends are listening to
- [ ]  Ability to listen live to what your friends are listening to


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
