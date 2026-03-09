const mongoose = require('mongoose')
const Company = require('../models/company')

const getAll = async () => {
  try {
    const companies = await Company.find().sort({ tradeName: 1 })

    return {
      success: true,
      companies
    }
  } catch (error) {
    throw error
  }
}

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID da empresa inválido')
    }

    const company = await Company.findById(id)

    if (!company) {
      throw new Error('Empresa não encontrada')
    }

    return {
      success: true,
      company
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAll,
  getById
}