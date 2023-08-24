Template.adminMusics.onCreated(function () {

  this.subscribeMusics = this.subscribe('music.list');
  console.log("subscribeMusics : ", this.subscribeMusics);

});

Template.adminMusics.onRendered(function () {

  const self = this;

  this.autorun(function () {
    if (self.subscribeMusics.ready()) {
      const musics = Music.find({}).fetch()
      console.log("adminMusics subscribeMusics ready");
    }
  })
});

Template.adminMusics.helpers({

  allMusics: function () {
    const musics = Music.find({}).fetch()
    return musics
  },


});


Template.adminMusics.events({
  'click #btnAddMusic': function (event, template) {
    event.preventDefault()
    window.$('#fileUploadModal').modal('show');
  },
  // Bu metod müzik silmek için çalışır.
  'click #btnDeleteMusic': function (event, template) {
    event.preventDefault()
    const music = this;


    Meteor.call('music.delete', music, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  },

'click #btnUpdateMusic' : function (event, template) {
  event.preventDefault()
  const music = this;
  console.log("music update işlemi : ", music)
  SelectedMusic.set(music);

  window.$('#updateMusicModal').modal('show');
  window.$('#updateMusicModal').on('shown.bs.modal', function () {
    window.$('#updateMusicModal').trigger('focus')

    window.$('#modalUpdateMusicName').val(music.name);
    window.$('#modalUpdateMusicArtist').val(music.artist);
    window.$('#modalUpdateMusicAlbum').val(music.album);
    window.$('#modalUpdateMusicCategory').val(music.category);
    window.$('#modalUpdateMusicYear').val(music.year);
    window.$('#modalUpdateMusicLanguage').val(music.language);
    window.$('#modalUpdateMusicIamge').val(music.image);
    // window.$('#updateMusicFile').val(music.fileId);
  })

  // try{
  //   const res = await new Promise((resolve, reject) => {
  //     Meteor.call('music.update', music, (err, res) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(res);
  //       }
  //     });
  //   });

  //   console.log("update işlemi tamamlandı: ", res);
  // }
  // catch(err){
  //   console.log("err : ", err);
  // }

}

});

Template.adminMusics.onDestroyed(function () {

  this.subscribeMusics.stop()

});
