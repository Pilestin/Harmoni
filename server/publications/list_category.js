Meteor.publish(
    'category.list', function() {
        return Category.find({});
});
//         },