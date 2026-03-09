const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  internalCode: {
    type: String,
    trim: true,
    default: null
  },
  tradeName: {
    type: String,
    required: [true, 'Nome fantasia é obrigatório'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Endereço é obrigatório'],
    trim: true
  },
  neighborhood: {
    type: String,
    required: [true, 'Bairro é obrigatório'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Cidade é obrigatória'],
    trim: true
  },
  zipCode: {
    type: String,
    required: [true, 'CEP é obrigatório'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'UF é obrigatória'],
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 2
  },
  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, forneça um e-mail válido'
    ]
  },
  cnpj: {
    type: String,
    required: [true, 'CNPJ é obrigatório'],
    unique: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Company', companySchema)