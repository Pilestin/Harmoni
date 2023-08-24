import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


Category = new Mongo.Collection('category');


CategorySchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        optional: true
    },
    description: {
        type: String,
        label: 'Description',
        optional: true
    },
    imagePath: {
        type: String,
        label: 'Image',
        optional: true
    }
});

export default Category;

Category.attachSchema(CategorySchema);
