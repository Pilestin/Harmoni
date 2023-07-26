
import { Meteor } from 'meteor/meteor';

Meteor.methods({
    addMusic: function(title, artist) {
        // Yeni müzik belgesini oluşturup veritabanına ekleyin
        Music.insert({
            title: title,
            artist: artist,
        });
    }
});
