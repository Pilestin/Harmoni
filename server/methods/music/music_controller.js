
import { error } from 'console';
import { Meteor } from 'meteor/meteor';
const fs = require('fs');


const musicFilesStore = new FilesCollection({
    collectionName: 'musicFiles',
    storagePath: 'assets/app/uploads'
  });

  
Meteor.methods({
    "addMusic": function(obj, fileId) {
        // Yeni müzik belgesini oluşturup veritabanına ekleyin
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        console.log("ARKAYA GELEN OBJE ŞU : ", obj);

        
        const _id = Music.insert(obj);
        
        return _id;
            
    }, 
    "music.delete": function(id, fileId) {

        const _id = Music.remove(id);

        if (!_id) {
            console.log("Müzik silinemedi.");
        }
        MusicFiles.remove(fileId);
        return _id ;
    },

    'MusicFiles.uploadFile': function (musicFile) {
        // Dosyayı yükleme işlemi
        // Dosyanın URL'sini veya ID'sini döndürün

         // Dosyayı "MusicFiles" koleksiyonuna kaydedin
        const fileId = MusicFiles.write(musicFile, {
            fileName: musicFile.name,
            type: musicFile.type,
            path: 'musics',
        });
    
        // Dosyanın ID'sini döndürün
        return fileId;
      
        
    },
    "searchMusic_temp": function(query) {
        // Yeni müzik belgesini oluşturup veritabanına ekleyin
        console.log("query : ", query)
        return query
    }
});
