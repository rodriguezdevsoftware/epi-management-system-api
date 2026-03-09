const authService = require('../services/authService')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, forneça nome, e-mail e senha'
      })
    }

    const result = await authService.register(name, email, password)

    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Por favor, forneça e-mail e senha'
      })
    }

    // Obter IP e User-Agent da requisição
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
    const userAgent = req.headers['user-agent']

    const result = await authService.login(email, password, ipAddress, userAgent)

    res.status(200).json(result)
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message
    })
  }
}

const getMe = async (req, res) => {
  try {
    const result = await authService.getUserById(req.user.id)

    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    })
  }
}

const getLoginHistory = async (req, res) => {
  try {
    const limit = req.query.limit || 10

    const result = await authService.getLoginHistory(req.user.id, limit)

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = {
  register,
  login,
  getMe,
  getLoginHistory
}
