const User = require('../models/user')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}

const register = async (name, email, password) => {
  try {
    // Verificar se usuário já existe
    let user = await User.findOne({ email })
    if (user) {
      throw new Error('Usuário já existe com este e-mail')
    }

    // Criar novo usuário
    user = await User.create({
      name,
      email,
      password
    })

    const token = generateToken(user._id)

    return {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
  } catch (error) {
    throw error
  }
}

const login = async (email, password) => {
  try {
    // Validar e-mail e senha
    if (!email || !password) {
      throw new Error('Por favor, forneça e-mail e senha')
    }

    // Buscar usuário (incluindo a senha nesta query específica)
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    // Comparar senhas
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      throw new Error('Credenciais inválidas')
    }

    const token = generateToken(user._id)

    return {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
  } catch (error) {
    throw error
  }
}

const getUserById = async (id) => {
  try {
    const user = await User.findById(id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return {
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  register,
  login,
  getUserById,
  generateToken
}
