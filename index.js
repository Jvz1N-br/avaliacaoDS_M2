const express = require('express');
const app = express();
app.use(express.json());

const tutoresRoutes = require('./src/routes/tutores')
const animaisRoutes = require('./src/routes/animais');
const consultasRoutes = require('./src/routes/consultas');

app.use(consultasRoutes);
app.use(animaisRoutes);
app.use(tutoresRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[SERVIDOR]: Clínica Veterinaria online em http://localhost:${PORT}`);
});
