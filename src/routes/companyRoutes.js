const express = require('express')
const companyController = require('../controllers/companyController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', authMiddleware, companyController.getAll)
router.get('/:id', authMiddleware, companyController.getById)

module.exports = router