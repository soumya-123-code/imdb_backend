const { Actor } = require('../models');

exports.getAllActors = async (req, res) => {
  const actors = await Actor.findAll();
  res.json(actors);
};

exports.createActor = async (req, res) => {
  const actor = await Actor.create(req.body);
  res.json(actor);
};

exports.updateActor = async (req, res) => {
  const actor = await Actor.findByPk(req.params.id);
  if (!actor) return res.status(404).json({ error: 'Actor not found' });
  await actor.update(req.body);
  res.json(actor);
};

exports.deleteActor = async (req, res) => {
  const actor = await Actor.findByPk(req.params.id);
  if (!actor) return res.status(404).json({ error: 'Actor not found' });
  await actor.destroy();
  res.json({ success: true });
};
