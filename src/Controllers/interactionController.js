const interactionService = require('../Services/interactionService');

const create = async (req, res, next) => {
  try {
    const data = {
      tipo: req.body.tipo,
      comentario: req.body.comentario,
      usuario: req.body.usuario || req.usuarioId,
      auto: req.body.auto,
    };

    if (!data.tipo || !data.usuario || !data.auto) {
      return res.status(400).json({ mensaje: 'tipo, usuario y auto son requeridos' });
    }

    const interaction = await interactionService.createInteraction(data);
    res.status(201).json(interaction);
  } catch (error) {
    next(error);
  }
};

const listByAuto = async (req, res, next) => {
  try {
    const autoId = req.params.autoId;
    const items = await interactionService.getInteractionsByAuto(autoId);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await interactionService.updateInteraction(req.params.id, req.body);
    if (!updated) return res.status(404).json({ mensaje: 'Interacción no encontrada' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await interactionService.deleteInteraction(req.params.id);
    if (!deleted) return res.status(404).json({ mensaje: 'Interacción no encontrada' });
    res.json({ mensaje: 'Interacción eliminada' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  listByAuto,
  update,
  remove,
};
