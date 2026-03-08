# Coleção Postman - EPI Management API

## Como Importar no Postman

### 1. Importar a Coleção

1. Abra o Postman
2. Clique em **"Import"** no canto superior esquerdo
3. Selecione o arquivo `EPI_Management_API.postman_collection.json`
4. Clique em **"Import"**

### 2. Importar o Environment (Opcional mas Recomendado)

1. Clique no ícone de engrenagem ⚙️ no canto superior direito
2. Clique em **"Import"**
3. Selecione o arquivo `EPI_Management.postman_environment.json`
4. Clique em **"Import"**
5. Selecione o environment **"EPI Management - Local"** no dropdown no canto superior direito

---

## Endpoints Disponíveis

### 🔐 Auth

#### 1. **Login**
- **Método:** `POST`
- **URL:** `{{base_url}}/auth/login`
- **Body:**
```json
{
  "email": "rodriguez.dev.software@gmail.com",
  "password": "123456"
}
```
- **Resposta Sucesso (200):**
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

**💡 Nota:** O token é automaticamente salvo na variável de ambiente `auth_token` após o login!

---

#### 2. **Register (Registrar Novo Usuário)**
- **Método:** `POST`
- **URL:** `{{base_url}}/auth/register`
- **Body:**
```json
{
  "name": "Novo Usuário",
  "email": "novo.usuario@exemplo.com",
  "password": "senha123"
}
```
- **Resposta Sucesso (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Novo Usuário",
    "email": "novo.usuario@exemplo.com"
  }
}
```

---

#### 3. **Get Me (Obter Dados do Usuário)** 🔒
- **Método:** `GET`
- **URL:** `{{base_url}}/auth/me`
- **Headers:** 
  - `Authorization: Bearer {{auth_token}}`
- **Resposta Sucesso (200):**
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

**💡 Nota:** Este endpoint é protegido e requer autenticação. O token é automaticamente incluído se você usar o environment!

---

## Variáveis de Environment

A coleção usa as seguintes variáveis:

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `base_url` | URL base da API | `http://localhost:3000/api` |
| `auth_token` | Token JWT (salvo automaticamente após login) | - |
| `user_id` | ID do usuário autenticado | - |
| `user_name` | Nome do usuário autenticado | - |
| `user_email` | Email do usuário autenticado | - |

---

## Fluxo de Teste Recomendado

### 1️⃣ Primeiro Teste: Login
1. Execute a requisição **"Login"**
2. Verifique se o token foi salvo automaticamente nas variáveis de environment
3. Verifique os dados do usuário na resposta

### 2️⃣ Segundo Teste: Get Me (Rota Protegida)
1. Execute a requisição **"Get Me"**
2. Verifique se consegue acessar os dados do usuário usando o token salvo

### 3️⃣ Terceiro Teste: Register (Opcional)
1. Execute a requisição **"Register"** com um novo email
2. Verifique se o novo usuário foi criado
3. Verifique se o novo token foi salvo

### 4️⃣ Teste de Erro: Token Inválido
1. Altere manualmente o `auth_token` no environment para um valor inválido
2. Execute **"Get Me"** novamente
3. Verifique o erro 401 (Unauthorized)

---

## Credenciais Default

Use estas credenciais para testar:

- **Email:** `rodriguez.dev.software@gmail.com`
- **Senha:** `123456`

---

## Requisitos

- ✅ API rodando em `http://localhost:3000`
- ✅ MongoDB conectado e rodando
- ✅ Usuário default criado (executar `npm run seed`)

---

## Scripts Úteis

### Iniciar a API
```bash
cd /Users/lucianorodriguez/dev/epi-management-system-api
npm run dev
```

### Criar Usuário Default
```bash
npm run seed
```

---

## Troubleshooting

### ❌ Erro: "Cannot connect to server"
- Verifique se a API está rodando
- Verifique se a URL está correta: `http://localhost:3000/api`

### ❌ Erro: "Token inválido"
- Faça login novamente para obter um novo token
- Verifique se o token não expirou (validade: 7 dias)

### ❌ Erro: "Credenciais inválidas"
- Verifique email e senha
- Execute `npm run seed` para criar o usuário default

---

## Próximos Endpoints (Em Breve)

- [ ] Recuperação de senha
- [ ] Atualização de perfil
- [ ] Listagem de usuários (admin)
- [ ] Gerenciamento de EPIs
- [ ] Relatórios

---

## Suporte

Para mais informações, consulte:
- [Documentação da API](../docs/AUTH_API.md)
- [Código Fonte](../src/)
