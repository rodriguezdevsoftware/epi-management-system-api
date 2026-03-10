const express = require('express')
const positionController = require('../controllers/positionController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', positionController.getAll)
router.get('/:id', positionController.getById)
router.post('/', positionController.create)
router.put('/:id', positionController.update)
router.delete('/:id', positionController.remove)

module.exports = router
