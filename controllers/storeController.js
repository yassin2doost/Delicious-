'use strict';
const 
    mongoose = require('mongoose'),
    multer = require('multer'),
    Store = mongoose.model('Store'),
    jimp = require('jimp'),
    uuid = require('uuid');


const multerOptions = {
    storage:  multer.memoryStorage(),
    fileFilter: function(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) return next(null, true);
        next({message: 'That filetype isn\'t allowed!'}, false);
        }
};

exports.upload = multer(multerOptions).single('photo');
exports.resize = async(req, res, next) => {
    if( !req.file) return next();

     const extension = req.file.mimetype.split('/')[1];
     req.body.photo = `${uuid.v4()}.${extension}`;

     const photo = await jimp.read(req.file.buffer);
     await photo.resize(600, jimp.AUTO);
     await photo.write(`./public/uploads/${req.body.photo}`);

     next();
};

exports.homepage = (req, res) => {
    res.render('index');
};

exports.addPage = (req, res) => {
    res.render('editStore', {
        title: ' Add Store 🤩 '
    });
};

exports.createStore = async (req, res) => {
    const store =  new Store(req.body);
    await store.save()
    req.flash('success', `Successfully Created ${store.name} now let\s leave a review`);
    res.redirect('/add');
};


exports.getStores = async(req, res) => {
    const stores = await Store.find({});
    res.render('stores', {
        title: 'Stores',
        stores
    });
};


exports.editStore = async (req, res) => {
    const store = await Store.findById({_id: req.params.id})
    res.render('editStore', {
        title: `Edit ${store.name}`, store
    });
};

exports.updateStore = async (req, res) => {
    const store = await Store.findByIdAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true,
    }).exec();
    req.flash('success', `Successfuly Updated <strong>${store.name}</strong><a href="/stores/${store.slug}">😎`);
    res.redirect(`/stores/${store._id}/edit`);
}; 