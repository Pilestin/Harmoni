import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.componentsNavbar.events({

  'input #musicSearchInput': function (event, template) {
    event.preventDefault();
    const query = document.getElementById('musicSearchInput').value;
    console.log("query : ", query)

    Meteor.call('music.search', query, function (err, res) {
      if (err) {
        console.log("err : ", err)
      }
      GlobalSearchResults.set('musicResults', res);
      console.log(res)
    })

  },
})

Template.componentsNavbar.helpers({
  currentUser: function () {
    return Meteor.user();
  }
})

Template.componentsNavbar.onDestroyed(function () {

  GlobalSearchResults.set('musicResults', []);

});