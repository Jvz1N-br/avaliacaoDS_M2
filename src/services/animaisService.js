const pool = require('../db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM animais');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM animais WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (dados) => {
  const { nome, especie, raca, data_nascimento, tutor_id } = dados;

  const result = await pool.query(
    `INSERT INTO animais 
     (nome, especie, raca, data_nascimento, tutor_id) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, especie, raca, data_nascimento, tutor_id]
  );

  return result.rows[0];
};

const update = async (id, dados) => {
  const { nome, especie, raca, data_nascimento, tutor_id } = dados;

  await pool.query(
    `UPDATE animais 
     SET nome=$1, especie=$2, raca=$3, data_nascimento=$4, tutor_id=$5 
     WHERE id=$6`,
    [nome, especie, raca, data_nascimento, tutor_id, id]
  );

  return { mensagem: 'Animal atualizado com sucesso' };
};

const remove = async (id) => {
  await pool.query('DELETE FROM animais WHERE id = $1', [id]);
  return { mensagem: 'Animal removido com sucesso' };
};

module.exports = { getAll, getById, create, update, remove };