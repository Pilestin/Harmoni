

Meteor.publish('users.list', function() {
    if (this.userId) {
        return Meteor.users.find({})
      } else {
        return this.ready()
      }

});

// const userName = Meteor.user({fields: {'profile.name': 1}}).profile.name;
