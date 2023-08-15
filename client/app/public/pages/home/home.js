import { Webapp } from 'meteor/webapp';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.pagesHome.onCreated(function () {

    this.subscribeUsers = this.subscribe('users.list'); // Kullanıcıları abone ediyoruz
    this.subscribeMusics = this.subscribe('music.list'); // Müzikleri abone ediyoruz
    this.subscribeMusicFiles = this.subscribe('files.musics'); // Müzik dosyalarını abone ediyoruz

    this.categoryFlag = new ReactiveVar(false);
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
                    Meteor.call('user_unfavourite', fav, function (err, res) {
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
    currentUser: function () {
        currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
        return Meteor.user();
    },

    allUsers: function () {
        return Template.instance().users.get();
    },

    // Tüm müzikleri döndüren helper
    allMusic: function () {
        return Music.find({}).fetch();
        // return MusicFiles.find({}).fetch();
    },
    isFavourite: function (music) {
        const user = Meteor.user();
        const favouriteMusic = user.favouriteMusic;
        const isFavourite = favouriteMusic.find((favouriteMusic) => favouriteMusic._id === music._id);
        return isFavourite ? true : false;

    },
    searchResults: function () {
        console.log("GlobalSearchResults.get('musicResults') : ", GlobalSearchResults.get('musicResults'))
        return GlobalSearchResults.get('musicResults');
    },
    categoryFlag: function () {
        return Template.instance().categoryFlag.get();
    },


});

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


Template.pagesHome.events({
    // Bu fonksiyon, SPOTİFY API'ye istek atarak müzik verilerini alır
    'click #getApi': async function (event, template) {
        console.log("getApi butonuna tıklandı")
        const query = 'Mozart'
        await Meteor.call('searchMusic', query, function (err, res) {
            if (err) {
                console.log("dönen değer err : ", err)
                log
            } else {
                console.log("dönen değer res : ", res)
            }
        })
    },
    // Bu fonksiyon müzik eklemek için gerekli olan Modal formunu açar
    'click #btnShowModal': function (event, template) {
        event.preventDefault()
        window.$('#fileUploadModal').modal('show');
    },
    // Bu metod çıkış yapmak içindir. 
    // - Logout butonuna basıldığında çalışır
    'click .brd-sign-out': function (event, template) {
        Meteor.logout(function (error) {
            if (error) {
                // todo error handling
                return
            }

            FlowRouter.go('pages.home')
        })
    },
    // Bu metod Profil sayfasına yönlendirir. 
    // - Profil butonuna basıldığında çalışır
    'click .brd-profile': function (event, template) {
        FlowRouter.go('pages.myprofile')
    },
    // Bu metod Ayarlar sayfasına yönlendirir.
    // - Settings butonuna basıldığında çalışır
    'click .brd-settings': function (event, template) {
        FlowRouter.go('pages.settings')
    },
    // Bu metod müziklere tıklandığında çalışır.
    // Müzik objesini oluşturur. 
    // Player içeriisndeki bilgileri bu objenin bilgileri ile değiştirir. 
    // Objeyi gerekli fonksiyona paslar
    'click .btnPlayThisMusic': function (event, template) {

        event.preventDefault()
        const music = Music.findOne({ _id: this._id });

        const playerTitle = document.getElementById('playerTitle');
        const playerArtist = document.getElementById('playerArtist');
        const playerImage = document.getElementById('playerImage');

        playerTitle.innerHTML = music.name;
        playerArtist.innerHTML = music.artist;
        if (music.image) {
            playerImage.src = music.image;
        }

        playMusic(music);
    },
    // Bu metod müzik silmek için çalışır.
    'click #btnDeleteMusic': async function (event, template) {
        event.preventDefault()
        const music = this;

        try {
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
    // Bu metod müzik favorilemek için çalışır.
    'click #btnFavouriteMusic': function (event, template) {
        event.preventDefault()
        const music = this;

        Meteor.call('user_favourite', music, function (err, res) {
            if (err) {
                console.log("err : ", err)
            }
            console.log("res : ", res)
        })
    },
    // Bu metod müzik favorilemekten çıkarmak için çalışır.
    'click #btnUnFavouriteMusic': function (event, template) {
        event.preventDefault()
        const music = this;

        Meteor.call('user_unfavourite', music, function (err, res) {
            if (err) {
                console.log("err : ", err)
            }
            console.log("res : ", res)
        })
    },
    // Bu metod arkadaşın dinlediği son müziği çalar
    'click .btnPlayFriendsMusic': function (event, template) {
        event.preventDefault()

        const friendId = this._id;
        const friend = Meteor.users.findOne({ _id: friendId });
        const music = friend.currentPlay;

        playMusic(music);
    },
    // Bu metod müzik arama sonuçlarını açıp kapatmak içindir. 
    // - Butona tıklandığında Css bilgisini değiştirerek aç-kapa yapar
    'click #btnShowResults': function () {

        if ($("#resultsBody").css("display") == "none") {
            $("#resultsBody").css("display", "")
        } else {
            $("#resultsBody").css("display", "none")
        }

    },
    // Bu metod kategori menüsünü açıp kapatmak içindir.
    // Bayrak bilgisi tutar
    'click #btnMenuCategory': function (event, template) {
        event.preventDefault()
        const categoryFlag = template.categoryFlag.get();
        if (categoryFlag) {
            template.categoryFlag.set(false)
        } else {
            template.categoryFlag.set(true)
        }
    },
    // Bu metod müzikler sayfasını tekrar açmak içindir 
    'click #btnMenuMusic': function (event, template) {
        event.preventDefault()
        const categoryFlag = template.categoryFlag.get();

        template.categoryFlag.set(false)
    }

});

Template.pagesHome.onDestroyed(function () {
    const self = this
    self.subscribeUsers.stop()
    self.subscribeMusics.stop()
    self.subscribeMusicFiles.stop()
})