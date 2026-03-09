const mongoose = require('mongoose')

const loginHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID do usuário é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório']
  },
  token: {
    type: String,
    required: [true, 'Token é obrigatório']
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  },
  loginAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('LoginHistory', loginHistorySchema)
