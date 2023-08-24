
Template.adminModalAddMusic.events({
  'click #btnCloseModal': function (event, template) {
    event.preventDefault();
    console.log("Modal kapatıldı")
    $('#formAddMusic')[0].reset();
    $('#fileUploadModal').modal('hide');
  },

  'submit #fileUploadModal': function (event, template) {
    event.preventDefault();

    const musicName = event.target.musicName.value;
    const musicArtist = event.target.musicArtist.value;
    const musicAlbum = event.target.musicAlbum.value;
    const musicCategory = event.target.musicCategory.value;
    const musicYear = event.target.musicYear.value;
    const musicLanguage = event.target.musicLanguage.value;
    const musicImage = event.target.musicImage.value;
    const fileInput = event.target.musicFile;
    const musicFile = fileInput.files[0];

    if (!musicFile) {
      console.log('Not selected');
      return;
    }

    try {
      const upload = MusicFiles.insert({
        file: musicFile,
      });

      upload.on('end', function (error, result) {
        if (error) {
          console.log('Error uploading the file. Please try again.');
        }
        else {
          const obj = {
            name: musicName,
            artist: musicArtist,
            album: musicAlbum,
            category: musicCategory,
            year: musicYear,
            language: musicLanguage,
            image: musicImage,
            fileId: result._id,
            filePath: result.path,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          try {

            Meteor.call('music.add', obj, (error, result) => {
              if (error) {
                console.log("error: ", error);
              } else {
                console.log("Music koleksiyonuna eklendi", result);
              }
            });
            console.log("Result: ", result);
            $('#formAddMusic')[0].reset();
            $('#fileUploadModal').modal('hide').modal('dispose');
          } catch (error) {
            console.log("catch err Music add: ", error);
          }
        }
      });
    } catch (err) {
      console.log("catch err MusicFiles add: ", err);
    }
  }
});

