const Interaction = require('../Models/interactionModel');

const createInteraction = async (data) => {
  const interaction = new Interaction(data);
  return interaction.save();
};

const getInteractionsByAuto = async (autoId) => {
  return Interaction.find({ auto: autoId })
    .populate('usuario', 'name email')
    .populate('auto', 'marca modelo año')
    .sort({ createdAt: -1 });
};

const updateInteraction = async (id, updates) => {
  return Interaction.findByIdAndUpdate(id, updates, { new: true });
};

const deleteInteraction = async (id) => {
  return Interaction.findByIdAndDelete(id);
};

module.exports = {
  createInteraction,
  getInteractionsByAuto,
  updateInteraction,
  deleteInteraction,
};
