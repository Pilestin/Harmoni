import { Webapp } from 'meteor/webapp';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { type } from 'jquery';

Template.pagesHome.onCreated(function () {

    this.subscribeUsers = this.subscribe('users.list'); // Kullanıcıları abone ediyoruz
    this.subscribeMusics = this.subscribe('music.list'); // Müzikleri abone ediyoruz
    this.subscribeMusicFiles = this.subscribe('files.musics'); // Müzik dosyalarını abone ediyoruz
    this.subscribeCategory = this.subscribe('category.list'); // Kategori listesini abone ediyoruz
    this.categoryFlag = new ReactiveVar(false);
    this.currentCategory = new ReactiveVar();

    // this.currentPage = new ReactiveVar(1);
    // this.perPage = new ReactiveVar(4);
    // this.totalMusic = new ReactiveVar();

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
        const currentPage = GlobalPagination.get('currentPage');
        const perPage = GlobalPagination.get("perPage")

        const start = (currentPage - 1) * perPage;

        return Music.find({}, { skip: start, limit: perPage }).fetch();
        // return MusicFiles.find({}).fetch();
    },
    isFavourite: function (music) {
        const user = Meteor.user();
        const favouriteMusic = user.favouriteMusic;
        const isFavourite = favouriteMusic.find((favouriteMusic) => favouriteMusic._id === music._id);
        return isFavourite ? true : false;

    },
    searchResults: function () {
        return GlobalSearchResults.get('musicResults');
    },
    categoryFlag: function () {
        return Template.instance().categoryFlag.get();
    },
    allCategory: function () {
        return Category.find({}).fetch();
    },
    currentCategory: function () {
        const currentCategory = Template.instance().currentCategory.get();
        SelectedCategory.set(currentCategory);
        return Template.instance().currentCategory.get();
    },
    // Örn : Pop için categoryPop stringi döndürür
    getTemplateByCategory: function (category) {
        return this.templatesByCategory[category] || {}; // Eşleşen template adını veya boş bir nesneyi döndürün
    },
    pageInfo: function () {
        let pagination = GlobalPagination.all();

        console.log("pagination : ", pagination)

        let currentPage = pagination.currentPage;
        // let perPage = pagination.perPage;
        // let total = pagination.total;
        let totalPages = pagination.totalPages;

        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }

        const obj = {
            currentPage: currentPage,
            totalPages: pages,
        }

        console.log("obj : ", obj)

        return obj;

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
        console.log("friend : ", res)
    });
}
// Playerdaki müzik bilgilerini değiştirmek için kullanılır
const audioInfoChanger = function (music) {
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    const playerImage = document.getElementById('playerImage');

    playerTitle.innerHTML = music.name;
    playerArtist.innerHTML = music.artist;
    if (music.image) {
        playerImage.src = music.image;
    }
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
    // Bu metod çıkış yapmak içindir. 
    // - Logout butonuna basıldığında çalışır
    'click .brd-sign-out': function (event, template) {
        const user = Meteor.user();
        Meteor.logout(function (error, user) {
            if (error) {
                // todo error handling
                return
            }
        })
        console.log("user ms : ", user)
        Meteor.call("user.setMusic", Meteor.user(), function (err, res) {
            if (err) {
                console.log("err : ", err)
            } else {
                console.log("res : ", res)
            }
        })
        FlowRouter.go('pages.home')
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

        audioInfoChanger(music);
        playMusic(music);
    },
    // Bu metod arkadaşın dinlediği son müziği çalar
    'click .btnPlayFriendsMusic': function (event, template) {
        event.preventDefault()

        const friendId = this._id;
        const friend = Meteor.users.findOne({ _id: friendId });
        const music = friend.currentPlay;

        audioInfoChanger(music);
        playMusic(music);
    },
    // Bu metod müzik favorilemek için çalışır.
    'click #btnFavouriteMusic': function (event, template) {
        event.preventDefault()
        const music = this;
        // console.log(template.view.pagination)

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
    },
    'click .categoryCard': function (event, template) {

        const category = this;
        template.currentCategory.set(category.name)
    },
    'click .page-link': function (event, template) {
        event.preventDefault();

        const clickedAction = event.target.getAttribute('data-action');
        const dataPage = event.target.getAttribute('data-page');

        if (clickedAction === 'previous') {

            const current = GlobalPagination.get('currentPage');
            if (current > 1) {
                GlobalPagination.set('currentPage', current - 1);
            }
    
        } 
        else if (clickedAction === 'next') {

            const current = GlobalPagination.get('currentPage');
            const total = GlobalPagination.get('totalPages');
            if (current < total) {
                GlobalPagination.set('currentPage', current + 1);
            }


        } 
        else {
            // Belirli bir sayfaya gitme işlemini yapabilirsiniz
            GlobalPagination.set('currentPage', parseInt(dataPage));
        
        }
    }

});

Template.pagesHome.onDestroyed(function () {
    const self = this
    self.subscribeUsers.stop()
    self.subscribeMusics.stop()
    self.subscribeMusicFiles.stop()
})