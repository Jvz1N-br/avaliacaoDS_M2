const express = require('express');
const app = express();
const router = require('./src/routes/indexRoutes');

const tutoresRoutes = require('./src/routes/tutores');
const animaisRoutes = require('./src/routes/animais');
const consultasRoutes = require('./src/routes/consultas');

app.use(express.json());

app.use(router);
app.use(tutoresRoutes);
app.use(animaisRoutes);
app.use(consultasRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});