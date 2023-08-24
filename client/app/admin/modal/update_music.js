
Template.adminModalUpdateMusic.events({

    'click #btnAdminCloseModal': function (event, template) {
        event.preventDefault();
        console.log("Modal kapatıldı")
        $('#formUpdateMusic')[0].reset();
        $('#updateMusicModal').modal('hide');
    },


    'submit #formUpdateMusic': function (event, template) {
        event.preventDefault();
        

        const musicName = event.target.updateMusicName.value;
        const musicArtist = event.target.updateMusicArtist.value;
        const musicAlbum = event.target.updateMusicAlbum.value;
        const musicCategory = event.target.updateMusicCategory.value;
        const musicYear = event.target.updateMusicYear.value;
        const musicLanguage = event.target.updateMusicLanguage.value;
        const musicImage = event.target.updateMusicImage.value;
        // const fileInput = event.target.updateMusicFile;
        // const musicFile = fileInput.files[0]; 

        // 
        const _id = SelectedMusic.get()._id;

        const obj = {

            name: musicName,
            artist: musicArtist,
            album: musicAlbum,
            category: musicCategory,
            year: musicYear,
            language: musicLanguage,
            image: musicImage,
        };
       
        Meteor.call('music.update', _id, obj, function (err, res) {
            if (err) {
                console.log("err : ", err)
            }
            console.log("res : ", res)
        }
        )
        $('#formUpdateMusic')[0].reset();
        $('#updateMusicModal').modal('hide');
    },
});

