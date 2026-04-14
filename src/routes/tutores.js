const express = require('express');
const router = express.Router();
const controller = require('../controllers/tutoresController');

router.get('/tutores', controller.getAll);
router.get('/tutores/:id', controller.getById);
router.post('/tutores', controller.create);
router.put('/tutores/:id', controller.update);
router.delete('/tutores/:id', controller.remove);

module.exports = router;