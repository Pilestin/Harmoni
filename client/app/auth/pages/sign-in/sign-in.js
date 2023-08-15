import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.pagesSignIn.events({
  'submit form': function (event, template) {
    event.preventDefault()
    // LoadingSection.show(template, '.authPageSignUp') animasyon için 

    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const emailAddress = event.target.emailAddress.value
    const password = event.target.password.value
    // const passwordAgain = event.target.passwordAgain.value
    const profilePhoto = event.target.profilePhotoUrl.value

    const obj = {
      firstName: firstName,
      lastName: lastName,
      email: emailAddress,
      password: password,
      profilePhoto : profilePhoto,
    }
    console.log("obj : ", obj);

    Accounts.createUser(obj, function (error, result) {
      if (error) {
        // LoadingSection.hide(template, '.authPageSignUp')
        // ErrorHandler.show(error)
        console.log("error : ", error);
        FlowRouter.go('/signin')
      }else{
        console.log("user created : ", result);
        FlowRouter.go('/home')
      //   Meteor.call('user_insert', obj,  function (error, result) {
      //     if (error) {
      //       console.log("error : ", error);
      //     }else{
      //       console.log("result : ", result);
      //       FlowRouter.go('/home')
      //     }
      //   })
      // }
      }
    })        
  },
})



