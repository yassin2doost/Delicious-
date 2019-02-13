'use strict';
const 
    mongoose = require('mongoose'),
    slug = require('slugs'),
    Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;


const storeSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: 'please enter a STORE name!',
        maxlength:500
    },
    description:{
        type: String,
        trim: true,
        required: 'please enter a DESCRIPTION!',
        maxlength:500,
    },
    slug:{
        type: String
    },
    tags:[String],

    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supple coordinates'
        }],
        address:{
            type: String,
            required: 'You must supple an address'
        },
    },  

    photo: String,

}, {timestamps: true});

storeSchema.pre('save', function(done){
    if(!this.isModified('name')) return done();
    this.slug = slug(this.name);
    done();
});

module.exports = mongoose.model('Store', storeSchema);