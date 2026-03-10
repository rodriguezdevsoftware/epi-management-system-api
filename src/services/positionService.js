const mongoose = require('mongoose')
const Position = require('../models/position')
const Company = require('../models/company')
const { getUserCompanyIds, ensureCompanyAccess } = require('./permissionService')

const getAll = async (userId, companyId = null) => {
  if (companyId) {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      throw new Error('ID da empresa inválido')
    }

    await ensureCompanyAccess(userId, companyId)

    const positions = await Position.find({ companyId })
      .populate('companyId', 'tradeName internalCode city state')
      .sort({ description: 1 })

    return {
      success: true,
      positions
    }
  }

  const companyIds = await getUserCompanyIds(userId)

  const positions = await Position.find({ companyId: { $in: companyIds } })
    .populate('companyId', 'tradeName internalCode city state')
    .sort({ description: 1 })

  return {
    success: true,
    positions
  }
}

const getById = async (userId, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID do cargo inválido')
  }

  const position = await Position.findById(id)
    .populate('companyId', 'tradeName internalCode city state')

  if (!position) {
    throw new Error('Cargo não encontrado')
  }

  await ensureCompanyAccess(userId, position.companyId._id)

  return {
    success: true,
    position
  }
}

const create = async (userId, payload) => {
  const { code = null, description, companyId } = payload

  if (!description || !companyId) {
    throw new Error('Descrição e empresa são obrigatórias')
  }

  if (!mongoose.Types.ObjectId.isValid(companyId)) {
    throw new Error('ID da empresa inválido')
  }

  const company = await Company.findById(companyId)
  if (!company) {
    throw new Error('Empresa não encontrada')
  }

  await ensureCompanyAccess(userId, companyId)

  const position = await Position.create({
    code,
    description,
    companyId
  })

  const positionWithCompany = await Position.findById(position._id)
    .populate('companyId', 'tradeName internalCode city state')

  return {
    success: true,
    position: positionWithCompany
  }
}

const update = async (userId, id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID do cargo inválido')
  }

  const currentPosition = await Position.findById(id)
  if (!currentPosition) {
    throw new Error('Cargo não encontrado')
  }

  await ensureCompanyAccess(userId, currentPosition.companyId)

  const updatePayload = {}

  if (Object.prototype.hasOwnProperty.call(payload, 'code')) {
    updatePayload.code = payload.code || null
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'description')) {
    if (!payload.description) {
      throw new Error('Descrição do cargo é obrigatória')
    }
    updatePayload.description = payload.description
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'companyId')) {
    if (!mongoose.Types.ObjectId.isValid(payload.companyId)) {
      throw new Error('ID da empresa inválido')
    }

    const company = await Company.findById(payload.companyId)
    if (!company) {
      throw new Error('Empresa não encontrada')
    }

    await ensureCompanyAccess(userId, payload.companyId)
    updatePayload.companyId = payload.companyId
  }

  const position = await Position.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true
  }).populate('companyId', 'tradeName internalCode city state')

  return {
    success: true,
    position
  }
}

const remove = async (userId, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID do cargo inválido')
  }

  const position = await Position.findById(id)
  if (!position) {
    throw new Error('Cargo não encontrado')
  }

  await ensureCompanyAccess(userId, position.companyId)

  await Position.findByIdAndDelete(id)

  return {
    success: true,
    message: 'Cargo excluído com sucesso'
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
