Template.categoryTemplate.helpers({ 
    
    bune : function() {
        return this.name;
    },

    selected : function() {
        console.log("this : ", this);
        console.log("selectedCategory.get() : ", SelectedCategory.get());
        return selectedCategory.get()
    }
}); 

Template.categoryTemplate.events({ 
    'click #foo': function(event, template) { 
         
    } 
}); 
