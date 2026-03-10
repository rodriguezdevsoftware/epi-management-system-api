require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user')
const Company = require('../models/company')
const Permission = require('../models/permission')
const Position = require('../models/position')
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
    let user = await User.findOne({ email: defaultUser.email })

    if (!user) {
      // Criar usuário default
      user = await User.create(defaultUser)
      console.log('✓ Usuário default criado com sucesso!')
      console.log(`  Email: ${defaultUser.email}`)
      console.log(`  Senha: ${defaultUser.password}`)
    } else {
      console.log('✓ Usuário default já existe')
    }

    // Dados das empresas padrão
    const defaultCompanies = [
      {
        internalCode: 'EMP-001',
        tradeName: 'Empresa Exemplo Ltda',
        address: 'Rua A, 100',
        neighborhood: 'Centro',
        city: 'São Paulo',
        zipCode: '01001-000',
        state: 'SP',
        phone: '(11) 99999-9999',
        email: 'contato@empresa1.com',
        cnpj: '12.345.678/0001-90'
      },
      {
        internalCode: 'EMP-002',
        tradeName: 'Distribuidora Santos',
        address: 'Av. Brasil, 500',
        neighborhood: 'Vila Soco',
        city: 'Santos',
        zipCode: '11010-160',
        state: 'SP',
        phone: '(13) 98888-8888',
        email: 'contato@santos.com',
        cnpj: '98.765.432/0001-12'
      },
      {
        internalCode: 'EMP-003',
        tradeName: 'Comércio Rio de Janeiro',
        address: 'Rua das Flores, 250',
        neighborhood: 'Botafogo',
        city: 'Rio de Janeiro',
        zipCode: '22250-145',
        state: 'RJ',
        phone: '(21) 97777-7777',
        email: 'contato@rj.com',
        cnpj: '55.555.555/0001-55'
      }
    ]

    // Criar empresas
    const companies = []
    for (const companyData of defaultCompanies) {
      const existingCompany = await Company.findOne({ cnpj: companyData.cnpj })
      if (!existingCompany) {
        const company = await Company.create(companyData)
        companies.push(company)
        console.log(`✓ Empresa criada: ${companyData.tradeName}`)
      } else {
        companies.push(existingCompany)
        console.log(`✓ Empresa já existe: ${companyData.tradeName}`)
      }
    }

    // Criar permissões do usuário para as empresas
    for (const company of companies) {
      const permissionExists = await Permission.findOne({
        userId: user._id,
        companyId: company._id
      })

      if (!permissionExists) {
        await Permission.create({
          userId: user._id,
          companyId: company._id,
          role: 'admin'
        })
        console.log(`✓ Permissão criada: ${user.name} -> ${company.tradeName}`)
      } else {
        console.log(`✓ Permissão já existe: ${user.name} -> ${company.tradeName}`)
      }
    }

    // Cargos padrão por empresa
    const companyByCode = companies.reduce((acc, company) => {
      acc[company.internalCode] = company
      return acc
    }, {})

    const defaultPositions = [
      {
        code: 'CARG-001',
        description: 'Tecnico de Seguranca',
        companyId: companyByCode['EMP-001']?._id
      },
      {
        code: 'CARG-002',
        description: 'Almoxarife',
        companyId: companyByCode['EMP-001']?._id
      },
      {
        code: null,
        description: 'Supervisor Operacional',
        companyId: companyByCode['EMP-002']?._id
      }
    ]

    for (const positionData of defaultPositions) {
      if (!positionData.companyId) {
        continue
      }

      const positionExists = await Position.findOne({
        description: positionData.description,
        companyId: positionData.companyId
      })

      if (!positionExists) {
        await Position.create(positionData)
        console.log(`✓ Cargo criado: ${positionData.description}`)
      } else {
        console.log(`✓ Cargo já existe: ${positionData.description}`)
      }
    }

    console.log('\n✓ Seed do banco de dados concluído com sucesso!')
    process.exit(0)
  } catch (error) {
    console.error('✗ Erro ao fazer seed do banco de dados:', error.message)
    process.exit(1)
  }
}

seedDatabase()
