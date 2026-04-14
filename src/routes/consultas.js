const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/consultas', async (req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM consultas');
        res.json(result.rows);
    }catch (error){
        res.status(500).json({ erro: error.mansage});
    }
});

router.get('/consultas/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);

        if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Consulta não encontrado' });
    }
        res.json(result.rows[0]);
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.post('/consultas', async (req, res) => {
    try{
        const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;
        const result = await pool.query(
            `SELECT * FROM tutores 
            (animal_id, data_consulta, motivo, diagnostico, veterinario) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [animal_id, data_consulta, motivo, diagnostico, veterinario]);
        res.status(201).json(result.rows[0]);
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.put('/consultas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { animal_id, data_consulta, motivo, diagnostico, veterinario } = req.body;

        await pool.query(
            `UPDATE animais
            SET animal_id=$1, data_consulta=$2, motivo=$3, diagnostico=$4, veterinario=$5
            WHERE id=$6`,
            [animal_id, data_consulta, motivo, diagnostico, veterinario, id]
        );
        
        res.json({ mensagem: 'Consulta atualizado com sucesso'})
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.delete('/consultas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM consultas WHERE id = $1', [id]);
        res.status(500).json({ mensagem: 'Consulta removido com sucesso'});
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

modules.exports = router