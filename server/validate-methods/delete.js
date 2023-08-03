
// new ValidatedMethod({
//     name: 'user_delete',
//     mixins: [SignedInMixin],
//     validate: new SimpleSchema({

//     }).validator(),
//     run: async function (data) {
//         this.unblock()
//         const { _id } = data

//         try {
//             const result = User.remove({ _id })

//         } catch (error) {
//             console.log("error : ", error);
//             throw new Meteor.Error('500', error.message)
//         }
        

//         return result
//     }   
// })
