const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Rotas de autenticação
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'API EPI Management funcionando'
  })
})

module.exports = app