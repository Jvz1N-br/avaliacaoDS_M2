const service = require('../services/consultasService');

const getAll = async (req, res) => {
  try {
    const dados = await service.getAll();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = await service.getById(id);

    if (!dados) {
      return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    }

    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const create = async (req, res) => {
  try {
    const dados = await service.create(req.body);
    res.status(201).json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = await service.update(id, req.body);
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = await service.remove(id);
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };