import { Notify } from 'notiflix/build/notiflix-notify-aio'

ErrorHandler = {
  show: function (error, template) {
    console.log(error, template)

    if (error.error == 'error') {
      Notify.failure(error.reason)
    } else if (error.error == 'html') {
      Notify.failure(error.reason)
    } else if (error.error == 'un-auth') {
      FlowRouter.go('auth.signIn')
    }
  },
}
