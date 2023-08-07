Meteor.publish(
    'music.list', function() {
        return Music.find({});
});
//         },