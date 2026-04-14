const pool = require('../db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM consultas');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (dados) => {
  const { animal_id, data_consulta, motivo, diagnostico, veterinario } = dados;

  const result = await pool.query(
    `INSERT INTO consultas 
     (animal_id, data_consulta, motivo, diagnostico, veterinario) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [animal_id, data_consulta, motivo, diagnostico, veterinario]
  );

  return result.rows[0];
};

const update = async (id, dados) => {
  const { animal_id, data_consulta, motivo, diagnostico, veterinario } = dados;

  await pool.query(
    `UPDATE consultas 
     SET animal_id=$1, data_consulta=$2, motivo=$3, diagnostico=$4, veterinario=$5 
     WHERE id=$6`,
    [animal_id, data_consulta, motivo, diagnostico, veterinario, id]
  );

  return { mensagem: 'Consulta atualizada com sucesso' };
};

const remove = async (id) => {
  await pool.query('DELETE FROM consultas WHERE id = $1', [id]);
  return { mensagem: 'Consulta removida com sucesso' };
};

module.exports = { getAll, getById, create, update, remove };