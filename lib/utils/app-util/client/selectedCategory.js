SelectedCategory = new ReactiveVar('');


Template.registerHelper(
    'selectedCategoryUtil', function() {
        return SelectedCategory;
    }
);
