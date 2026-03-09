const User = require('../models/user')
const LoginHistory = require('../models/loginHistory')
const jwt = require('jsonwebtoken')

const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRE || '2h'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN
  })
}

const getTokenExpirationDate = (token) => {
  const decoded = jwt.decode(token)

  return decoded && decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null
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
    const tokenExpiresAt = getTokenExpirationDate(token)

    return {
      success: true,
      token,
      tokenExpiresIn: TOKEN_EXPIRES_IN,
      tokenExpiresAt,
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

const login = async (email, password, ipAddress = null, userAgent = null) => {
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
    const tokenExpiresAt = getTokenExpirationDate(token)

    // Salvar histórico de login
    await LoginHistory.create({
      userId: user._id,
      email: user.email,
      token,
      ipAddress,
      userAgent
    })

    return {
      success: true,
      token,
      tokenExpiresIn: TOKEN_EXPIRES_IN,
      tokenExpiresAt,
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

const getLoginHistory = async (userId, limit = 10) => {
  try {
    const history = await LoginHistory.find({ userId })
      .select('email token ipAddress userAgent loginAt')
      .sort({ loginAt: -1 })
      .limit(limit)

    return {
      success: true,
      history
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  register,
  login,
  getUserById,
  getLoginHistory,
  generateToken
}
