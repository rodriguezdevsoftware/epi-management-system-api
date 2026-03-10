const mongoose = require('mongoose')
const Company = require('../models/company')
const Permission = require('../models/permission')

const getAll = async (userId) => {
  try {
    // Buscar todas as permissões do usuário
    const permissions = await Permission.find({ userId })
      .populate('companyId', '-__v')
      .sort({ createdAt: -1 })

    // Extrair apenas os dados da empresa
    const companies = permissions.map(permission => ({
      ...permission.companyId.toObject(),
      userRole: permission.role,
      permissionId: permission._id
    }))

    // Ordenar por nome fantasia
    companies.sort((a, b) => a.tradeName.localeCompare(b.tradeName))

    return {
      success: true,
      companies
    }
  } catch (error) {
    throw error
  }
}

const getById = async (userId, companyId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      throw new Error('ID da empresa inválido')
    }

    // Verificar se o usuário tem permissão para acessar esta empresa
    const permission = await Permission.findOne({
      userId,
      companyId
    }).populate('companyId', '-__v')

    if (!permission) {
      throw new Error('Você não tem permissão para acessar esta empresa')
    }

    return {
      success: true,
      company: {
        ...permission.companyId.toObject(),
        userRole: permission.role,
        permissionId: permission._id
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAll,
  getById
}