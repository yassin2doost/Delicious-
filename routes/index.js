'use strict';
const 
    router = require('express').Router(),
    { catchErrors } = require('../handlers/errorHandlers'),
    storeController = require('../controllers/storeController');

router.get('/', storeController.getStores);
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addPage);

router.post('/add',
 storeController.upload,
 catchErrors(storeController.resize),
 catchErrors(storeController.createStore)
 );
 


router.post('/add/:id', 
storeController.upload,
catchErrors(storeController.resize),
catchErrors(storeController.updateStore)
);

router.get('/stores/:id/edit', catchErrors(storeController.editStore));

module.exports = router;