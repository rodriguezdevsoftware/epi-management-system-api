# Documentação da API (Auth e Empresas)

## Endpoints disponíveis

### Auth

### 1. Registro de Novo Usuário

**Endpoint:** `POST /api/auth/register`

**Body:**
```json
{
  "name": "Seu Nome",
  "email": "seu.email@exemplo.com",
  "password": "sua_senha_123"
}
```

**Resposta de sucesso (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenExpiresIn": "2h",
  "tokenExpiresAt": "2026-03-09T14:00:00.000Z",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Seu Nome",
    "email": "seu.email@exemplo.com"
  }
}
```

**Resposta de erro:**
```json
{
  "success": false,
  "error": "Usuário já existe com este e-mail"
}
```

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Body:**
```json
{
  "email": "rodriguez.dev.software@gmail.com",
  "password": "123456"
}
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenExpiresIn": "2h",
  "tokenExpiresAt": "2026-03-09T14:00:00.000Z",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rodriguez Dev",
    "email": "rodriguez.dev.software@gmail.com"
  }
}
```

**Resposta de erro:**
```json
{
  "success": false,
  "error": "Credenciais inválidas"
}
```

---

### 3. Obter Dados do Usuário Autenticado

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rodriguez Dev",
    "email": "rodriguez.dev.software@gmail.com"
  }
}
```

**Resposta de erro (401):**
```json
{
  "success": false,
  "error": "Token não fornecido. Por favor, faça login"
}
```

---

### 4. Obter Histórico de Login

**Endpoint:** `GET /api/auth/login-history`

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Query Parameters (opcional):**
- `limit`: Número máximo de registros a retornar (padrão: 10)

**Exemplos de URL:**
```
GET /api/auth/login-history                    (retorna últimos 10 logins)
GET /api/auth/login-history?limit=20           (retorna últimos 20 logins)
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "history": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "email": "rodriguez.dev.software@gmail.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      "loginAt": "2026-03-08T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439020",
      "email": "rodriguez.dev.software@gmail.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "ipAddress": "192.168.1.101",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      "loginAt": "2026-03-07T15:45:00.000Z"
    }
  ]
}
```

**Resposta de erro (401):**
```json
{
  "success": false,
  "error": "Token não fornecido. Por favor, faça login"
}
```

---

### Empresas

### 5. Listar Todas as Empresas

**Endpoint:** `GET /api/companies`

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "companies": [
    {
      "_id": "65f0d1c2a8e4bc0012dcd001",
      "internalCode": "EMP-001",
      "tradeName": "Empresa Exemplo",
      "address": "Rua A, 100",
      "neighborhood": "Centro",
      "city": "Sao Paulo",
      "zipCode": "01001-000",
      "state": "SP",
      "phone": "(11) 99999-9999",
      "email": "contato@empresa.com",
      "cnpj": "12.345.678/0001-90",
      "createdAt": "2026-03-09T10:00:00.000Z"
    }
  ]
}
```

**Resposta de erro (401):**
```json
{
  "success": false,
  "error": "Token não fornecido. Por favor, faça login"
}
```

---

### 6. Buscar Empresa por ID

**Endpoint:** `GET /api/companies/:id`

**Headers:**
```
Authorization: Bearer seu_token_jwt_aqui
```

**Resposta de sucesso (200):**
```json
{
  "success": true,
  "company": {
    "_id": "65f0d1c2a8e4bc0012dcd001",
    "internalCode": "EMP-001",
    "tradeName": "Empresa Exemplo",
    "address": "Rua A, 100",
    "neighborhood": "Centro",
    "city": "Sao Paulo",
    "zipCode": "01001-000",
    "state": "SP",
    "phone": "(11) 99999-9999",
    "email": "contato@empresa.com",
    "cnpj": "12.345.678/0001-90",
    "createdAt": "2026-03-09T10:00:00.000Z"
  }
}
```

**Resposta de erro (404):**
```json
{
  "success": false,
  "error": "Empresa não encontrada"
}
```

**Resposta de erro (400):**
```json
{
  "success": false,
  "error": "ID da empresa inválido"
}
```

---

## Como usar

### 1. Fazer login com usuário default

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rodriguez.dev.software@gmail.com",
    "password": "123456"
  }'
```

### 2. Usar o token em requisições protegidas

```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer seu_token_aqui"
```

### 3. Registrar novo usuário

```bash
curl -X POST http://localhost:3000/api/auth/register \

### 4. Listar empresas

```bash
curl -X GET http://localhost:3000/api/companies \
  -H "Authorization: Bearer seu_token_aqui"
```

### 5. Buscar empresa por ID

```bash
curl -X GET http://localhost:3000/api/companies/65f0d1c2a8e4bc0012dcd001 \
  -H "Authorization: Bearer seu_token_aqui"
```
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Usuário",
    "email": "novo@exemplo.com",
    "password": "senha123"
  }'
```

---

## Usuário Default

- **Email:** rodriguez.dev.software@gmail.com
- **Senha:** 123456
- **Nome:** Rodriguez Dev

---

## Como executar o seed novamente

```bash
npm run seed
```

---

## Variáveis de Ambiente

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/epi-management-system
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_123456!@#$%^&*
JWT_EXPIRE=2h
```

---

## Estrutura de Arquivos

```
src/
├── models/
│   ├── user.js                 # Modelo de usuário com Mongoose
│   ├── loginHistory.js         # Modelo de histórico de login
│   └── company.js              # Modelo de empresa
├── services/
│   ├── authService.js          # Lógica de autenticação
│   └── companyService.js       # Lógica de empresas
├── controllers/
│   ├── authController.js       # Controllers de autenticação
│   └── companyController.js    # Controllers de empresas
├── middlewares/
│   └── authMiddleware.js       # Middleware de verificação JWT
├── routes/
│   ├── authRoutes.js           # Rotas de autenticação
│   └── companyRoutes.js        # Rotas de empresas
├── scripts/
│   └── seedDatabase.js         # Script para criar usuário default
├── config/
│   └── database.js             # Configuração do MongoDB
├── app.js                      # Configuração do Express
└── server.js                   # Inicialização do servidor
```

---

## Fluxo de Autenticação

1. Usuário faz login com email e senha
2. Sistema verifica credenciais no banco de dados
3. Se válidas, gera um token JWT assinado
4. Cliente armazena o token
5. Cliente envia o token no header `Authorization: Bearer <token>` em requisições protegidas
6. Middleware verifica o token e permite acesso apenas se válido
7. Token expira em 2 horas por padrão (configurável em `JWT_EXPIRE`)

---

## Coleção Postman

A documentação dos requests no Postman está em:

- `postman/EPI_Management_API.postman_collection.json`
- `postman/EPI_Management.postman_environment.json`
