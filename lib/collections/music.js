import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { FilesCollection } from 'meteor/ostrio:files';




var path = require('path');


Music = new Mongo.Collection('music');

// collections/musicFiles.js

MusicSchema = new SimpleSchema({
      name: {
        type: String,
        label: 'Title',
        optional: true
      },
      artist: {
        type: String,
        label: 'Artist',
        optional: true,
        
      },
      album: {
        type: String,
        label: 'Album',
        optional: true
      },
      category: {
        type: String,
        label: 'Category',
        optional: true
      },
      year: {
        type: String,
        label: 'Year',
        optional: true
      },
      language: {
        type: String,
        label: 'Language',
        optional: true
      },
      fileId: {
        type: String,
        label: 'File', // Dosya bilgilerini içeren bir nesne olarak saklamak için
      },
      filePath: {
        type: String,
        label: 'File Path', // Dosya bilgilerini içeren bir nesne olarak saklamak için
      },
      createdAt: {
        type: Date,
        label: 'Created At',
        autoValue() {
          if (this.isInsert) {
            return new Date();
          }
        },
        optional: true
      },
      updatedAt: {
        type: Date,
        label: 'Updated At',
        autoValue() {
          if (this.isUpdate) {
            return new Date();
          }
        },
        optional: true
      }
});

Music.attachSchema(MusicSchema);


MusicFiles = new FilesCollection({
  collectionName: 'MusicFiles',
  storagePath: () => {
    // __dirname + '/public/uploads/musicFiles',
    const projectPath = path.resolve('.').split('.meteor')[0].replace(/\\/g, '/');
    return projectPath + '/public/musics';
  },
  allowClientCode: false, // Dosya manipülasyonunun sadece sunucu tarafında olmasını sağlar.
  onBeforeUpload: function (file) {
    // Dosya yükleme öncesi yapılabilecek işlemler buraya yazılabilir.
    if (file.size <= 10485760) { 
      return true;
    }
    return 'Please upload music, with size equal or less than 10MB';
  }
});

if (Meteor.isServer) {
  Meteor.publish('files.musics', function () {

    return MusicFiles.find().cursor; 
  });
}