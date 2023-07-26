Meteor.publish('userById', function (id) {
    return User.find({ userId: id }); 
})

Meteor.publish('users.list', function(argument) {
    if (this.userId) {
        return Meteor.users.find({})
      } else {
        return this.ready()
      }
});