GlobalSearchResults = new ReactiveDict(null, {});
UserResults = new ReactiveDict(null, {});


Template.registerHelper('globalResults', function () {
    return GlobalSearchResults;
});


Template.registerHelper('userResults', function () {

    return UserResults;
});