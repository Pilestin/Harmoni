
import { error } from 'console';
import { event } from 'jquery';
import { Meteor } from 'meteor/meteor';
const fs = require('fs');


Meteor.methods({
    "music.add": function(obj, fileId) {
        
        // Yeni müzik belgesini oluşturup veritabanına ekleyin
        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
        console.log("ARKAYA GELEN OBJE ŞU : ", obj);

        
        const _id = Music.insert(obj);
        
        return _id;
            
    }, 
    "music.delete": function(music) {
        console.log("Buraya geldim : ", music)

        const fileId = music.fileId;
        const filePath = music.filePath;
       
        const _id = Music.remove(music._id);

        if (!_id) {
            console.log("Müzik silinemedi.");
            return;
        }
        MusicFiles.remove(fileId);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err)
                return
            }
            //file removed
        })

        return _id ;
    },
    // kullanılmıyor şimdilik
    'music.search' : function(query) {
        const userId = Meteor.userId();
        const user = Meteor.users.findOne({ _id: userId });
        
        if (user) {
            const result = Music.find({
                $or: [
                    // options i : case sensitive olmaması için
                    { name: { $regex: query, $options: 'i' } },
                    { artist: { $regex: query, $options: 'i' } }
                ]
            }).fetch();
            console.log("result : ", result)
            return result;
        }
        return [];
    },
    'music.update': function(_id, obj) { 
        const id = Music.update(_id, {
            $set: {
                name: obj.name,
                artist: obj.artist,
                album: obj.album,
                category: obj.category,
                year: obj.year,
                language: obj.language,
                image: obj.image,
                updatedAt: new Date()
            }
        });
        return id;
    },
    'getTotalMusic' : function() {
        return Music.find().count();
    },
});
