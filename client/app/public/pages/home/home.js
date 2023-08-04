import {Webapp} from 'meteor/webapp';


Template.pagesHome.onCreated(function () {

    this.subscribeUsers = this.subscribe('users.list'); // Kullanıcıları abone ediyoruz
    this.subscribeMusics = this.subscribe('list.musics'); // Müzikleri abone ediyoruz
    this.subscribeMusicFiles = this.subscribe('files.musics'); // Müzik dosyalarını abone ediyoruz
    
});

Template.pagesHome.onRendered(function () {
    
    const self = this;

    this.autorun(function () {

        if (self.subscribeUsers.ready()) {
          const user = Meteor.user();
        }
        if (self.subscribeMusics.ready()) {
          const musics = Music.find().fetch();
        }
        if (self.subscribeMusicFiles.ready()) {
            const musicFiles = MusicFiles.find().fetch();
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
    isFavourite: function() {

        const music = this;
        const user = Meteor.user();
        const isFavorite = user.favouriteMusic.includes(music._id);
        return isFavorite;
    }

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


        const music = this;
        const musicFile = MusicFiles.findOne({ _id: music.fileId });
        
        const musicUrl = 'http://localhost:3000/musics/' + musicFile._id  + musicFile.extensionWithDot; // Sunucudan alacağınız müzik dosyasının URL'si
        
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
    'click #btnDeleteMusic' : function(event, template){
        const music = this;

        Meteor.call('music.delete', music._id, music.fileId, function(err, res){

            if(err){
                console.log("err : ", err)
            }
            console.log("silme işlemi tamamlandı: ", res);
            

        });
    },
    'click #btnFavouriteMusic' : function(event, template){
        const music = this; 
        const user = Meteor.user();

        Meteor.call('user_favourite', music._id, function(err, res){
            console.log("clinette user_favourite methodu çalıştı")
            if(err){
                console.log("err : ", err)
            }
            console.log("res : ", res)
        })
    },
    'click #btnUnFavouriteMusic' : function(event, template){
        const music = this;
        const user = Meteor.user();

        Meteor.call('user_unfavourite', music._id, function(err, res){
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