const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

// Rotas públicas
router.post('/register', authController.register)
router.post('/login', authController.login)

// Rotas protegidas
router.get('/me', authMiddleware, authController.getMe)
router.get('/login-history', authMiddleware, authController.getLoginHistory)

module.exports = router
