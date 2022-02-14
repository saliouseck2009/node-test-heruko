const express = require('express');

const router = express.Router();
const stuffCtrl = require('../conrollers/stuff')



router.post('/',stuffCtrl.createThing);

router.get('/:id',stuffCtrl.getOneThing);

router.get('/',stuffCtrl.getAllThings);

router.put('/:id', stuffCtrl.editThing);

router.delete('/:id',stuffCtrl.deleteThing);


module.exports = router;