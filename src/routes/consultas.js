const express = require('express');
const router = express.Router();
const controller = require('../controllers/consultasController');

router.get('/consultas', controller.getAll);
router.get('/consultas/:id', controller.getById);
router.post('/consultas', controller.create);
router.put('/consultas/:id', controller.update);
router.delete('/consultas/:id', controller.remove);

module.exports = router;