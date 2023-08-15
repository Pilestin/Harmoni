import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


UserSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: 'Name',
        max: 200,
    },
    lastName: {
        type: String,
        label: 'Surname',
        max: 200,
    },
    email: {
        type: String,
        label: 'Email',
        max: 200,
    },
    password: {
        type: String,
        label: 'Password',
        min: 3,
    },
    favoriteMusic: {
        type: Array,
        label: 'Favorite Music',
        max: 200,
        optional: true,
    },
    'favoriteMusic.$': {
        type: String,
    },
    friendList: {
        type: Array,
        label: 'Friend List',
        max: 200,
        optional: true,
    },
    'friendList.$': {
        type: String,
    },
    favouriteMusic: {
        type: Array,
        label: 'Favourite Music',
        max: 200,
        optional: true,
    },
    'favouriteMusic.$': {
        type: Object, 
        label: 'Favourite Music',
        max: 200,
        optional: true,
    },
    currentPlay: {
        type: Object, 
        label: 'Current Play',
        max: 200,
        optional: true,
    },
    profilPhoto : {
        type: String,
        label: 'Profil Photo',
        max: 200,
        optional: true,
    },
    status: {
        type: Object
    },
    'status.online': {
        type: Boolean,
        optional: true,
    },
    'status.idle': {
        type: Boolean,
        optional: true,
    },
    'status.lastLogin': {
        type: Date,
        optional: true,
    },
    'status.lastActivity': {
        type: Date,
        optional: true,
    },
    'status.lastLogout': {
        type: Date,
        optional: true,
    },
    createdAt: {
        type: Date,
        autoValue: () => new Date(),
    },
    updatedAt: {
        type: Date,
        autoValue: () => new Date(),
    },

});

// Meteor.users.attachSchema(UserSchema);

