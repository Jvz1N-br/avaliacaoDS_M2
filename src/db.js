const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // teu usuário do postgres
  host: 'localhost',
  database: 'clinicaVeterinaria', // nome do banco
  password: 'cachorro2223',    // tua senha
  port: 5432,
});

module.exports = pool;