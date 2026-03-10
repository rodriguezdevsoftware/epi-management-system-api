const mongoose = require('mongoose')

const positionSchema = new mongoose.Schema({
  code: {
    type: String,
    trim: true,
    default: null
  },
  description: {
    type: String,
    required: [true, 'Descrição do cargo é obrigatória'],
    trim: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Empresa do cargo é obrigatória']
  }
}, {
  timestamps: true
})

positionSchema.index({ companyId: 1, description: 1 })

module.exports = mongoose.model('Position', positionSchema)
