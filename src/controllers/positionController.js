const positionService = require('../services/positionService')

const getStatusCode = (message) => {
  if (message === 'Cargo não encontrado' || message === 'Empresa não encontrada') {
    return 404
  }

  if (message === 'Usuário não possui permissão para esta empresa') {
    return 403
  }

  return 400
}

const getAll = async (req, res) => {
  try {
    const result = await positionService.getAll(req.user.id, req.query.companyId || null)
    res.status(200).json(result)
  } catch (error) {
    res.status(getStatusCode(error.message)).json({
      success: false,
      error: error.message
    })
  }
}

const getById = async (req, res) => {
  try {
    const result = await positionService.getById(req.user.id, req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(getStatusCode(error.message)).json({
      success: false,
      error: error.message
    })
  }
}

const create = async (req, res) => {
  try {
    const result = await positionService.create(req.user.id, req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(getStatusCode(error.message)).json({
      success: false,
      error: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    const result = await positionService.update(req.user.id, req.params.id, req.body)
    res.status(200).json(result)
  } catch (error) {
    res.status(getStatusCode(error.message)).json({
      success: false,
      error: error.message
    })
  }
}

const remove = async (req, res) => {
  try {
    const result = await positionService.remove(req.user.id, req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(getStatusCode(error.message)).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
