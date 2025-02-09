import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Middleware de autenticação
import Member from '../models/Member.js'; // Modelo de membro

const router = express.Router();

// Aplica o middleware de autenticação em todas as rotas
router.use(authMiddleware);

// Rota para listar todos os membros do usuário autenticado
router.get('/', async (req, res) => {
  try {
    const members = await Member.find(); // Colocar { user: req.userId } entre parenteses no finde() filtra membros pelo ID do usuário
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para adicionar um novo membro
router.post('/', async (req, res) => {
  try {
    const newMember = new Member({ ...req.body, user: req.userId }); // Associa o membro ao usuário
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para editar um membro existente
router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id, // ID do membro
      req.body, // Novos dados
      { new: true } // Retorna o membro atualizado
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para excluir um membro
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id); // Exclui o membro pelo ID
    res.status(200).json({ message: 'Membro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;