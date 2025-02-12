import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date },
  relationship: { type: String, required:true, enum: ['pai', 'mãe', 'irmã', 'irmão', 'avó', 'avô', 'tio', 'tia', 'primo', 'prima', 'sobrinho', 'neto'], default: 'biológica' },
  relationshipType: { type: String, enum: ['biológica', 'adotiva', 'meio-irmã', 'meio-irmão'], default: 'biológica' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }, // Referência ao pai/mãe
});

const Member = mongoose.model('Member', memberSchema);

export default Member;