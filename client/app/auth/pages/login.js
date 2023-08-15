import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { isAdmin } from '/lib/helpers/isAdmin.js'

Template.pagesLogin.onCreated(function () {
  this.subscribeUsers = this.subscribe('users.list')
})



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
      else{
        
        Meteor.call('admin.control', Meteor.userId(), function(err, res){
          console.log("Sonuç err: ", err)
          console.log("Sonuç res: ", res)

          if (err) {
            console.log("err : ", err)
            return
          }
          if(res){
            console.log("admin: ", res)
            FlowRouter.go('/admin') 
            return 
          }
          console.log("değil : ", err)
          FlowRouter.go('/home')
          return 
        })
      }
    })
  },
})