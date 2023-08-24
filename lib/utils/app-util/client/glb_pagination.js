GlobalPagination = new ReactiveDict( 'globalPagination' , {
    total: 0,
    currentPage: 1,
    perPage: 4,
});

Meteor.call('getTotalMusic', function (err, res) {
    if (err) {
        console.log(err);
    } else {
        total = res; // Toplam müzik sayısını güncelleyin
        GlobalPagination.set('total', total);
        GlobalPagination.set('totalPages', Math.ceil(total / GlobalPagination.keys.perPage));
    }
});

Template.registerHelper('globalPagination', function () {
    return GlobalPagination ; // Tüm Pagination verilerini döndürün
});

console.log("utildeyim : ", GlobalPagination)
