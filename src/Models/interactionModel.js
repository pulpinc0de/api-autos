const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['like', 'comment'], required: true },
  comentario: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  auto: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);
