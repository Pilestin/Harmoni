Meteor.publish(
    'list.musics', function() {
        return Music.find({});
});
//         },