
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API CNAB 240 - SISPAG Itaú' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
