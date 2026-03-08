# Documentação da API de Autenticação

## Endpoints disponíveis

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
JWT_EXPIRE=7d
```

---

## Estrutura de Arquivos

```
src/
├── models/
│   └── user.js                 # Modelo de usuário com Mongoose
├── services/
│   └── authService.js          # Lógica de autenticação
├── controllers/
│   └── authController.js       # Controllers de autenticação
├── middlewares/
│   └── authMiddleware.js       # Middleware de verificação JWT
├── routes/
│   └── authRoutes.js           # Rotas de autenticação
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
7. Token expira em 7 dias (configurável em `.env`)
