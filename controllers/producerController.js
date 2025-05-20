const { Producer } = require('../models');

exports.getAllProducers = async (req, res) => {
  const producers = await Producer.findAll();
  res.json(producers);
};

exports.createProducer = async (req, res) => {
  const producer = await Producer.create(req.body);
  res.json(producer);
};

exports.updateProducer = async (req, res) => {
  const producer = await Producer.findByPk(req.params.id);
  if (!producer) return res.status(404).json({ error: 'Producer not found' });
  await producer.update(req.body);
  res.json(producer);
};

exports.deleteProducer = async (req, res) => {
  const producer = await Producer.findByPk(req.params.id);
  if (!producer) return res.status(404).json({ error: 'Producer not found' });
  await producer.destroy();
  res.json({ success: true });
};
