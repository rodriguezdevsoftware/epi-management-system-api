require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user')
const connectDatabase = require('../config/database')

const seedDatabase = async () => {
  try {
    // Conectar ao banco de dados
    await connectDatabase()

    // Dados do usuário default
    const defaultUser = {
      name: 'Rodriguez Dev',
      email: 'rodriguez.dev.software@gmail.com',
      password: '123456'
    }

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email: defaultUser.email })

    if (userExists) {
      console.log('✓ Usuário default já existe')
      process.exit(0)
    }

    // Criar usuário default
    await User.create(defaultUser)

    console.log('✓ Usuário default criado com sucesso!')
    console.log(`  Email: ${defaultUser.email}`)
    console.log(`  Senha: ${defaultUser.password}`)

    process.exit(0)
  } catch (error) {
    console.error('✗ Erro ao fazer seed do banco de dados:', error.message)
    process.exit(1)
  }
}

seedDatabase()
