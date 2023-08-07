import {Webapp} from 'meteor/webapp';


Template.pagesHome.onCreated(function () {

    this.subscribeUsers = this.subscribe('users.list'); // Kullanıcıları abone ediyoruz
    this.subscribeMusics = this.subscribe('music.list'); // Müzikleri abone ediyoruz
    this.subscribeMusicFiles = this.subscribe('files.musics'); // Müzik dosyalarını abone ediyoruz
    
});

Template.pagesHome.onRendered(function () {
    
    const self = this;

    this.autorun(function () {

        
       
        if (self.subscribeMusicFiles.ready()) {
            const musicFiles = MusicFiles.find().fetch();
        }
        // eğer müzik silindiyse ve favoride tutuluyorsa onu da sil
        // Bunun için subs. olduğumuz yapıları kullanabiliriz. 
        // Eğer kullanıcının favori listesindeki müzik music içerisinde artık yoksa silinir.
        if (self.subscribeUsers.ready() && self.subscribeMusics.ready()) {
            const user = Meteor.user();
            const musics = Music.find().fetch(); // Tüm müzikleri al
            const favouriteMusic = user.favouriteMusic;

            // Favori olarak işaretlenen müzikleri kontrol et
            favouriteMusic.forEach((fav) => {
                const isMusicExist = musics.find((music) => music._id === fav._id);
                if (!isMusicExist) {
                    // Müzik artık koleksiyonda yok, favorilerden çıkar
                    Meteor.call('user_unfavourite', fav, function(err, res){
                        if (err) {
                            console.log("err : ", err);
                        } else {
                            console.log("Favori kaldırıldı: ", fav._id);
                        }
                    });
                }
            });
        }
    });
});

Template.pagesHome.helpers({ 
    // Kullanıcı bilgilerini döndüren helper
    currentUser: function() {
        currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
        return  Meteor.user();
    },
    allUsers: function() {
        return Template.instance().users.get();
    },

    // Tüm müzikleri döndüren helper
    allMusic: function() {
        return Music.find({}).fetch();
        // return MusicFiles.find({}).fetch();
    },
    isFavourite: function(music) {
        const user = Meteor.user();
        const favouriteMusic = user.favouriteMusic;
        const isFavourite = favouriteMusic.find((favouriteMusic) => favouriteMusic._id === music._id);
        return isFavourite ? true : false;
        
    },


});
Template.pagesHome.events({
    // Bu fonksiyon, SPOTİFY API'ye istek atarak müzik verilerini alır
    'click #getApi': async function(event, template){
        console.log("getApi butonuna tıklandı")
        const query = 'Mozart'
        await Meteor.call('searchMusic', query, function(err, res){
            if(err){
                console.log("dönen değer err : ", err)
                log
            }else{
                console.log("dönen değer res : ", res)
            }
        })
    },
    // Bu fonksiyon müzik eklemek için gerekli olan Modal formunu açar
    'click #btnShowModal': function(event, template){
        event.preventDefault()
        window.$('#fileUploadModal').modal('show');
    },
    // Bu fonksiyon müzik içerisindeki play butonuna tıklandığında çalışır
    // Müziği çalmak için gerekli olan URL'yi oluşturur ve Audio etiketine atar
    'click .btnPlayThisMusic' : function(event, template){

        event.preventDefault()
        const music = this;
        const musicFile = MusicFiles.findOne({ _id: music.fileId });
        
        const musicUrl = 'http://192.168.31.67:3000/musics/' + musicFile._id  + musicFile.extensionWithDot; // Sunucudan alacağınız müzik dosyasının URL'si
        
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


        Meteor.call('user_currentPlay', music, function(err, res){
            if(err){
                console.log("err : ", err)
            }
            console.log("res : ", res)
        })

        
        // const playButton = document.getElementById('playButton');
        // const pauseButton = document.getElementById('pauseButton');
        
        // playButton.addEventListener('click', () => {
        //   const audioElement = document.getElementById('audioPlayer');
        //   audioElement.play(); // Müziği çal
        // });
        
        // pauseButton.addEventListener('click', () => {
        //   const audioElement = document.getElementById('audioPlayer');
        //   audioElement.pause(); // Müziği durdur
        // });

        //     // Dosya yolunu oluşturmak için _storagePath ve path değerlerini birleştir
        //     const musicPath = musicFile._storagePath + '/' + musicFile.path;

        //     // Oluşturulan dosya yolunu kullanarak URL oluştur
        //     const musicUrl = '/' + musicPath;

        //     const audioElement = document.getElementById('audioPlayer');
        //     audioElement.src = musicUrl;
        //     audioElement.play();
            
        // }
        // else {
        //     console.log("Müzik dosyası bulunamadı.");
        // }
    },
    'click #btnDeleteMusic' : async  function(event, template){
        event.preventDefault()
        const music = this;

        try{
            const res = await new Promise((resolve, reject) => {
                Meteor.call('music.delete', music, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });
    
            console.log("silme işlemi tamamlandı: ", res);
        }
        catch (err) {
            console.log("err : ", err);
        }
       
    },
    'click #btnFavouriteMusic' : function(event, template){
        event.preventDefault()
        const music = this; 

        Meteor.call('user_favourite', music, function(err, res){
            if(err){
                console.log("err : ", err)
            }
            console.log("res : ", res)
        })
    },
    'click #btnUnFavouriteMusic' : function(event, template){
        event.preventDefault()
        const music = this;

        Meteor.call('user_unfavourite', music, function(err, res){
            if(err){
                console.log("err : ", err)
            }
            console.log("res : ", res)
        })
    },
});

Template.pagesHome.onDestroyed(function () {
    const self = this
    self.subscribeUsers.stop()
    self.subscribeMusics.stop() 
    self.subscribeMusicFiles.stop()
})