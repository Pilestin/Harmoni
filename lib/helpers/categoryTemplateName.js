this.templatesByCategory = {
    'Pop': 'categoryPop',
    'Blues': 'categoryBlues',
    'Classical': 'categoryClassical',
    'Turkish': 'categoryTurkish',
};

Template.registerHelper('categoryTemplateName', function(categoryName) {
  return templatesByCategory[categoryName];
});

