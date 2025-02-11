import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();



// Dados do usuário fixo
const FIXED_USER = {
  email: "usuario@exemplo.com",
  passwordHash: bcrypt.hashSync("senha123", 10), // Senha criptografada
};

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('E-mail recebido:', email); // Adicione este log
    console.log('Senha recebida:', password); // Adicione este log

    // Verifica se o e-mail e senha correspondem ao usuário fixo
    if (email !== FIXED_USER.email || !bcrypt.compareSync(password, FIXED_USER.passwordHash)) {
      console.log('Credenciais inválidas.'); // Adicione este log
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Gera um token JWT
    const token = jwt.sign({ userId: 'fixed-user-id' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error); // Adicione este log
    res.status(500).json({ message: error.message });
  }
});

//testegit

export default router;