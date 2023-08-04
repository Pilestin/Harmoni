
Template.registerHelper(
    'whichMusic' , function(musicId) {
        const music = Music.findOne({_id: musicId});
        if (!music) {
            return "Not Found"
        }
        return music
    }  
)
