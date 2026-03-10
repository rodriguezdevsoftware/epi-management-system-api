const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const companyRoutes = require('./routes/companyRoutes')
const positionRoutes = require('./routes/positionRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Rotas de autenticação
app.use('/api/auth', authRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/positions', positionRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'API EPI Management funcionando'
  })
})

module.exports = app