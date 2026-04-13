const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[SERVIDOR]: Clínica Veterinaria online em http://localhost:${PORT}`);
});
