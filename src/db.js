const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // teu usuário do postgres
  host: 'localhost',
  database: 'clinicaVeterinaria', // nome do banco
  password: 'senai',    // tua senha
  port: 5433,
});

module.exports = pool;