const express = require('express');
const router = express.Router();
const pool = reuqire('../db');

router.get('/animais', async (req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM animais');
        res.json(result.rows);
    }catch (error){
        res.status(500).json({ erro: error.mansage});
    }
});

router.get('/animais/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM animais WHERE id = $1', [id]);

        if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Animal não encontrado' });
    }
        res.json(result.rows[0]);
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.post('/animais', async (req, res) => {
    try{
        const { nome, especie, raca, data_nascimento, tutor_id } = req.body;
        const result = await pool.query(
            `SELECT * FROM tutores 
            (nome, especie, raca, data_nascimento, tutor_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
        [nome, especie, raca, data_nascimento, tutor_id]);
        res.status(201).json(result.rows[0]);
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.put('/tutores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, especie, raca, data_nascimento, tutor_id } = req.body;

        await pool.query(
            `UPDATE animais
            SET nome=$1, especie=$2, raca=$3, data_nascimento=$4, tutor_id=$5
            WHERE id=$6`,
            [nome, especie, raca, data_nascimento, tutor_id, id]
        );
        
        res.json({ mensagem: 'Animal atualizado com sucesso'})
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

router.delete('/animais/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM animais WHERE id = $1', [id]);
        res.status(500).json({ mensagem: 'Animal removido com sucesso'});
    } catch (error){
        res.status(500).json({ erro: error.message});
    }
});

modules.exports = router