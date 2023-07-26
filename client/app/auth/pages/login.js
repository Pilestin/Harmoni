import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.pagesLogin.events({
  'submit form': function (event, template) {
    event.preventDefault()
    // LoadingSection.show(template, '.brd-loading-section')
    const emailAddress = event.target.emailAddress.value
    const password = event.target.password.value

    Meteor.loginWithPassword(emailAddress, password, function (error) {
    //   LoadingSection.hide(template, '.brd-loading-section')

      if (error) {
        console.log(error);
        FlowRouter.go('/')
        return
      }
      else {
        console.log("user logged in : ", Meteor.user());
        FlowRouter.go('pages.home')
      }
    })
  },
})