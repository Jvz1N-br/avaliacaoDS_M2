const pool = require('../db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM tutores');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM tutores WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (dados) => {
  const { nome, telefone, email } = dados;

  const result = await pool.query(
    'INSERT INTO tutores (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *',
    [nome, telefone, email]
  );

  return result.rows[0];
};

const update = async (id, dados) => {
  const { nome, telefone, email } = dados;

  await pool.query(
    'UPDATE tutores SET nome=$1, telefone=$2, email=$3 WHERE id=$4',
    [nome, telefone, email, id]
  );

  return { mensagem: 'Atualizado com sucesso' };
};

const remove = async (id) => {
  await pool.query('DELETE FROM tutores WHERE id = $1', [id]);
  return { mensagem: 'Deletado com sucesso' };
};

module.exports = { getAll, getById, create, update, remove };