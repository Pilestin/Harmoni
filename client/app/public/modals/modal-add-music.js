
import jQuery from "jquery";

Template.pagesModalAddMusic.events({ 


    'click #btnCloseModal' : function(event, template) {
        event.preventDefault();
        console.log("Modal kapatıldı")
        $('#formAddMusic')[0].reset();
        window.$('#fileUploadModal').modal('hide');
    },


    'submit #fileUploadModal' : function(event, template) { 
        event.preventDefault();

        const musicName = event.target.musicName.value;
        const musicArtist = event.target.musicArtist.value;
        const musicAlbum = event.target.musicAlbum.value;
        const musicCategory = event.target.musicCategory.value;
        const musicYear = event.target.musicYear.value;
        const musicLanguage = event.target.musicLanguage.value; 
        
        const fileInput = event.target.musicFile;
        const musicFile = fileInput.files[0]; 


        if (!musicFile) {
          console.log('Not selected');
          return
        }
        

        try{
          const upload = MusicFiles.insert({
            file: musicFile,
          });

          upload.on('start', function () {
            console.log('Uploading...');
          });

      
          upload.on('end', function (error, result) {
            if (error) {
              console.log('Error uploading the file. Please try again.');
            } else {
              const obj = {
                name: musicName,
                artist: musicArtist,
                album: musicAlbum,
                category: musicCategory,
                year: musicYear,
                language: musicLanguage,
                fileId: result._id,
                filePath: result.path,
                createdAt: new Date(),
                updatedAt: new Date()
              }; 
              console.log("Hazırladığım obje : ", obj)
              Meteor.call('addMusic', obj, function (error, result) {
                if (error) {
                  console.log("error (73) : ", error);
                  return error;
                }
                
                  console.log("Music koleksiyonuna eklendi" , result);
                  return result;
                
            });
              $('#formAddMusic')[0].reset();
            }
            
          })
          //upload.start();
       }
        catch(err){
          console.log("catch err (86): ", err)
      }

        
        window.$('#fileUploadModal').modal('hide');

      }
});

Template.pagesModalAddMusic.onDestroyed(function() {
  // Şablon yok edildiğinde yapılacak işlemler burada yer alır
  console.log('Şablon yok edildi.');
});


// Template.pagesModalAddMusic.onDestroyed(function () {
  
//   window.$('#fileUploadModal').modal('hide');
// }
// );

