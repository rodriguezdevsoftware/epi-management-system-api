const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID do usuário é obrigatório']
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'ID da empresa é obrigatório']
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Índice composto para garantir que um usuário não tenha permissões duplicadas para a mesma empresa
permissionSchema.index({ userId: 1, companyId: 1 }, { unique: true })

module.exports = mongoose.model('Permission', permissionSchema)
