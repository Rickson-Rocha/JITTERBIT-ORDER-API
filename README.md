# Jitterbit Orders API

REST API para gerenciamento de pedidos desenvolvida como desafio técnico da Jitterbit.

## Tech Stack

| Camada         | Tecnologia     |
| -------------- | -------------- |
| Runtime        | Node.js        |
| Linguagem      | TypeScript     |
| Framework      | Express        |
| ORM            | Prisma         |
| Banco de Dados | PostgreSQL     |
| Autenticação   | JWT + bcryptjs |
| Validação      | Zod            |
| Documentação   | Swagger        |

---

## Arquitetura

O projeto segue uma arquitetura em camadas inspirada no Spring Boot, com separação clara de responsabilidades:

```
src/
├── config/           # Configurações (Prisma client, Swagger)
├── controllers/      # Camada HTTP - recebe request, chama use case, retorna response
│   ├── OrderController.ts
│   └── AuthController.ts
├── usecases/         # Regras de negócio - um arquivo por operação
│   ├── order/
│   │   ├── CreateOrderUseCase.ts
│   │   ├── GetOrderByIdUseCase.ts
│   │   ├── GetAllOrdersUseCase.ts
│   │   ├── UpdateOrderUseCase.ts
│   │   └── DeleteOrderUseCase.ts
│   └── auth/
│       ├── RegisterUseCase.ts
│       └── LoginUseCase.ts
├── repositories/     # Implementações concretas de acesso a dados
│   ├── PrismaOrderRepository.ts
│   └── PrismaUserRepository.ts
├── interfaces/       # Contratos dos repositórios (desacoplamento)
│   ├── IOrderRepository.ts
│   └── IUserRepository.ts
├── dtos/             # Objetos de transferência de dados + mapper
│   ├── order.dto.ts
│   ├── auth.dto.ts
│   └── mappers/
│       └── order.mapper.ts
├── errors/           # Erros customizados com status HTTP
│   ├── AppError.ts
│   ├── NotFoundError.ts
│   └── ConflictError.ts
├── middlewares/      # JWT auth, error handler, async handler
├── routes/           # Definição de rotas com anotações Swagger
├── utils/            # Utilitários (asyncHandler)
├── app.ts            # Configuração do Express
└── server.ts         # Entry point
```

---

## Transformação de Dados

A API recebe dados em português e os armazena em inglês:

| Recebido                 | Armazenado          |
| ------------------------ | ------------------- |
| `numeroPedido`           | `orderId`           |
| `valorTotal`             | `value`             |
| `dataCriacao`            | `creationDate`      |
| `items[].idItem`         | `items[].productId` |
| `items[].quantidadeItem` | `items[].quantity`  |
| `items[].valorItem`      | `items[].price`     |

---

## Como Rodar Localmente

### Pré-requisitos

- Node.js >= 18
- Docker

### 1. Clone o repositório

```bash
git clone https://github.com/Rickson-Rocha/JITTERBIT-ORDER-API.git
cd JITTERBIT-ORDER-API
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Suba o banco de dados com Docker

```bash
docker compose up -d
```

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jitterbit_orders"
JWT_SECRET="sua-chave-secreta"
JWT_EXPIRES_IN="24h"
PORT=3000
```

### 5. Rode as migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Inicie o servidor

```bash
npm run dev
```

API disponível em: `http://127.0.0.1:3000`  
Swagger disponível em: `http://127.0.0.1:3000/docs`

---

## API em Produção

- **API:** https://jitterbit-order-api.onrender.com
- **Swagger:** https://jitterbit-order-api.onrender.com/docs

---

## Endpoints

### Auth (público)

| Método | URL              | Descrição                    |
| ------ | ---------------- | ---------------------------- |
| POST   | `/auth/register` | Registra um novo usuário     |
| POST   | `/auth/login`    | Login e geração do token JWT |

### Orders (requer Bearer Token)

| Método | URL               | Descrição              |
| ------ | ----------------- | ---------------------- |
| POST   | `/order`          | Cria um novo pedido    |
| GET    | `/order/list`     | Lista todos os pedidos |
| GET    | `/order/:orderId` | Busca pedido por ID    |
| PUT    | `/order/:orderId` | Atualiza um pedido     |
| DELETE | `/order/:orderId` | Deleta um pedido       |

---

## 🧪 Exemplos de Uso

### 1. Registrar e fazer login

```bash
# Registrar
curl -X POST http://127.0.0.1:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@email.com", "password": "123456"}'

# Login - copie o token da resposta
curl -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@email.com", "password": "123456"}'
```

### 2. Criar um pedido

```bash
curl -X POST http://127.0.0.1:3000/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }'
```

### 3. Buscar pedido por ID

```bash
curl http://127.0.0.1:3000/order/v10089015vdb-01 \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🗄️ Banco de Dados

### Tabelas

**orders**
| Coluna | Tipo |
|--------|------|
| order_id | VARCHAR (PK) |
| value | FLOAT |
| creation_date | TIMESTAMP |

**items**
| Coluna | Tipo |
|--------|------|
| id | INT (PK) |
| order_id | VARCHAR (FK) |
| product_id | INT |
| quantity | INT |
| price | FLOAT |

**users**
| Coluna | Tipo |
|--------|------|
| id | INT (PK) |
| email | VARCHAR (UNIQUE) |
| password | VARCHAR |

---

## 🔒 Autenticação

A API usa JWT (JSON Web Token). Para acessar os endpoints de pedidos:

1. Registre um usuário em `/auth/register`
2. Faça login em `/auth/login` e copie o token
3. Envie o token no header de todas as requisições:

```
Authorization: Bearer <seu-token>
```
