const express = require('express');
const router = express.Router();
const pool = require('../db');

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
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.post('/tutores', async (req, res) => {
    try{
        const { nome, telefone, email } = req.body;
        const result = await pool.query('SELECT * FROM tutores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *', 
        [nome, telefone, email]);
        res.status(201).json(result.rows[0]);
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.put('/tutores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone, email } = req.body;

        await pool.query(
            'UPDATE tutores SET nome=$1, telefone=$2, email=$3, WHERE id=$4',
            [nome, telefone, email, id]
        );
        
        res.json({ mensagem: 'Atualizado com sucesso'})
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.delete('/tutores/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM tutores WHERE id = $1', [id]);
        res.status(500).json({ mensagem: 'Deletado com sucesso'});
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

modules.exports = router