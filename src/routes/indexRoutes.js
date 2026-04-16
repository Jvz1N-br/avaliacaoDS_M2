const express = require('express');
const router = express.Router();
const tutoresRoutes = require('./tutores');
const animaisRoutes = require('./animais');
const consultasRoutes = require('./consultas');

router.get('/', (req, res) => {
    res.json({ mensagem: 'Clinica Veterinaria', status: 'Online'})
});

router.use('/tutores', tutoresRoutes);
router.use('/animais', animaisRoutes);
router.use('/consultas', consultasRoutes);

router.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada.'})
});

module.exports = router;