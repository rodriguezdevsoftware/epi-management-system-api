const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
  try {
    let token

    // Obter token do header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Verificar se o token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido. Por favor, faça login'
      })
    }

    // Verificar e decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Buscar usuário
    req.user = await User.findById(decoded.id)

    if (!req.user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido ou expirado'
    })
  }
}

module.exports = authMiddleware
