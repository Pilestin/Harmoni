
import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

new ValidatedMethod({
    name: 'users.insert',
    mixins: [SignedInMixin],
    validate: new SimpleSchema({
      // users: UserSchema.omit('_id', 'createdAt', 'favoriteMusic', 'currentPlay'),
    }).validator(),
    run: async function (data) {
      this.unblock()
      const { user } = data
  
      user.favoriteMusic = [],
      user.userId = Meteor.userId()
      user.currentPlay = ''
      const _id = User.insert(user)
  
      return _id
    },
  })