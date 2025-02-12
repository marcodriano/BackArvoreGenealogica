import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import mongoose from 'mongoose';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configura o CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true,
}));

// Middleware para processar JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);

//Rota de teste
app.get('/', (req, res) => {
  res.send('Backend da Árvore Genealógica está funcionando!');
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));