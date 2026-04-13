const express = require('express');
const router = express.Router();
const pool = reuqire('../db');

router.get('/tutores', async (req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM tutores');
        res.json(result.rows);
    }catch (error){
        res.status(500).json({ erro: error.mansage});
    }
});

router.get('/tutores/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM tutores WHERE id = $1', [id]);
        res.json(result.rows[0]);
    }catch (error){
        res.status(500).json({ erro: error.mansage});
    }
});

router.post('/tutores', async (req, res) => {
    try{
        const { nome, telefone, email } = req.body;
    }
});