Template.adminMusics.onCreated(function () {

    
    this.subscribeMusics = this.subscribe('music.list');    
    console.log("subscribeMusics : ", this.subscribeMusics);

});

Template.adminMusics.onRendered(function () {

    const self = this;

    this.autorun(function() {
        if (self.subscribeMusics.ready()) {
            const musics = Music.find({}).fetch()
            console.log("adminMusics subscribeMusics ready");
        }
    })
});

Template.adminMusics.helpers({ 
    
    allMusics: function(){
        const musics = Music.find({}).fetch()
        console.log("musics : ", musics);
        return musics
    }

}); 

Template.adminMusics.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 

Template.adminMusics.onDestroyed(function () {

    this.subscribeMusics.stop() 

});
