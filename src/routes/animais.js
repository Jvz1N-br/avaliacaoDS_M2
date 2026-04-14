const express = require('express');
const router = express.Router();
const controller = require('../controllers/animaisController');

router.get('/animais', controller.getAll);
router.get('/animais/:id', controller.getById);
router.post('/animais', controller.create);
router.put('/animais/:id', controller.update);
router.delete('/animais/:id', controller.remove);

module.exports = router;