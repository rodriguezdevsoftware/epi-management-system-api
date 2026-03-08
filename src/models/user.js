const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça um nome'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça um e-mail'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, forneça um e-mail válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Por favor, forneça uma senha'],
    minlength: 6,
    select: false // Não retorna a senha por padrão nas queries
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    return next(error)
  }
})

// Método para comparar senhas
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
