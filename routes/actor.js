const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.get('/', actorController.getAllActors);
router.post('/', actorController.createActor);
router.put('/:id', actorController.updateActor);
router.delete('/:id', actorController.deleteActor);

module.exports = router;
