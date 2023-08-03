
import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

// new ValidatedMethod({
//     name: 'user_insert',
//     mixins: [SignedInMixin],
//     validate: new SimpleSchema({
//       // users: UserSchema.omit('_id', 'createdAt', 'favoriteMusic', 'currentPlay'),
//     }).validator(),
//     run: async function (data) {
//       this.unblock()
//       const { user } = data
  
//       user.favoriteMusic = []
//       user.currentPlay = ''
//       user.friendList = []
//       const _id = User.insert(user)
  
//       return _id
//     },
//   })