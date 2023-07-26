import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Music = new Mongo.Collection('music');

MusicSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'Title',
        max: 200,
    },
    artist: {
        type: String,
        label: 'Artist',
        max: 200,
    },
    // Diğer müzik özellikleri eklenebilir
});

Music.attachSchema(MusicSchema);
