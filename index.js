const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./src/config');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Importar rotas
const cnabRoutes = require('./src/routes/cnabRoutes');

// Usar rotas
app.use('/cnab', cnabRoutes);

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'API CNAB 240 - SISPAG Itaú' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Erro interno do servidor'
  });
});

const PORT = process.env.PORT || config.port;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
