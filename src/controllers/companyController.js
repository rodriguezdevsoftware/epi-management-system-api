const companyService = require('../services/companyService')

const getAll = async (req, res) => {
  try {
    const result = await companyService.getAll(req.user.id)

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getById = async (req, res) => {
  try {
    const result = await companyService.getById(req.user.id, req.params.id)

    res.status(200).json(result)
  } catch (error) {
    const statusCode = error.message.includes('permissão') ? 403 : 
                       error.message === 'Empresa não encontrada' ? 404 : 400

    res.status(statusCode).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = {
  getAll,
  getById
}