# Support Ticket API

[Português](#português) | [English](#english)

---

## Português

API simples para gerenciar chamados de suporte técnico, feita com Node.js puro (sem frameworks). Os dados ficam salvos em um arquivo JSON local.

### Requisitos

- Node.js 18.11 ou superior (por causa do `--watch`)

### Como rodar

```bash
npm run dev
```

O servidor sobe em `http://localhost:666`.

### Estrutura do chamado

```json
{
  "id": "uuid",
  "equipment": "Notebook",
  "description": "Não liga",
  "user_name": "Maria",
  "status": "open",
  "solution": "Fonte trocada",
  "created_at": "2026-10-14T12:00:00.000Z",
  "updated_at": "2026-10-14T12:00:00.000Z"
}
```

O campo `solution` só aparece depois que o chamado é fechado.

### Rotas

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/tickets` | Cria um chamado |
| `GET` | `/tickets` | Lista os chamados (filtro opcional `?status=`) |
| `PUT` | `/tickets/:id` | Atualiza `equipment` e `description` |
| `PATCH` | `/tickets/:id` | Atualiza só os campos enviados |
| `PATCH` | `/tickets/:id/close` | Fecha o chamado com uma solução |
| `DELETE` | `/tickets/:id` | Remove o chamado |

#### Criar chamado

```http
POST /tickets
Content-Type: application/json

{
  "equipment": "Notebook",
  "description": "Não liga",
  "user_name": "Maria"
}
```

Resposta `201` com o chamado criado. Todo chamado novo começa com `status: "open"`.

#### Listar chamados

```http
GET /tickets
GET /tickets?status=open
```

#### Atualizar chamado (PUT)

```http
PUT /tickets/:id
Content-Type: application/json

{
  "equipment": "Notebook Dell",
  "description": "Não liga após queda"
}
```

Envie os dois campos: o que ficar de fora é removido do chamado.

#### Atualizar parte do chamado (PATCH)

```http
PATCH /tickets/:id
Content-Type: application/json

{
  "description": "Tela piscando"
}
```

Campos aceitos: `equipment`, `description`, `user_name`, `status`. Os outros campos são ignorados.

#### Fechar chamado

```http
PATCH /tickets/:id/close
Content-Type: application/json

{
  "solution": "Fonte trocada"
}
```

Muda o `status` para `"closed"` e salva a solução.

#### Remover chamado

```http
DELETE /tickets/:id
```

### Códigos de resposta

| Código | Quando |
|---|---|
| `200` | Operação feita com sucesso |
| `201` | Chamado criado |
| `400` | `PATCH` sem nenhum campo aceito |
| `404` | Chamado ou rota não encontrada |

### Estrutura do projeto

```
src/
├── controllers/tickets/   # Lógica de cada rota
├── database/              # Banco em arquivo JSON (db.json)
├── middlewares/           # Leitura do JSON e roteamento
├── routes/                # Definição das rotas
├── utils/                 # Parse de rotas e query params
└── server.js              # Ponto de entrada
```

---

## English

A simple API to manage tech support tickets, built with plain Node.js (no frameworks). Data is saved to a local JSON file.

### Requirements

- Node.js 18.11 or newer (needed for `--watch`)

### Running

```bash
npm run dev
```

The server starts at `http://localhost:666`.

### Ticket shape

```json
{
  "id": "uuid",
  "equipment": "Laptop",
  "description": "Won't turn on",
  "user_name": "Maria",
  "status": "open",
  "solution": "Replaced power supply",
  "created_at": "2026-10-14T12:00:00.000Z",
  "updated_at": "2026-10-14T12:00:00.000Z"
}
```

The `solution` field only appears after the ticket is closed.

### Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/tickets` | Create a ticket |
| `GET` | `/tickets` | List tickets (optional `?status=` filter) |
| `PUT` | `/tickets/:id` | Update `equipment` and `description` |
| `PATCH` | `/tickets/:id` | Update only the fields you send |
| `PATCH` | `/tickets/:id/close` | Close the ticket with a solution |
| `DELETE` | `/tickets/:id` | Delete the ticket |

#### Create a ticket

```http
POST /tickets
Content-Type: application/json

{
  "equipment": "Laptop",
  "description": "Won't turn on",
  "user_name": "Maria"
}
```

Returns `201` with the new ticket. Every new ticket starts with `status: "open"`.

#### List tickets

```http
GET /tickets
GET /tickets?status=open
```

#### Update a ticket (PUT)

```http
PUT /tickets/:id
Content-Type: application/json

{
  "equipment": "Dell Laptop",
  "description": "Won't turn on after a fall"
}
```

Send both fields: any field you leave out is removed from the ticket.

#### Update part of a ticket (PATCH)

```http
PATCH /tickets/:id
Content-Type: application/json

{
  "description": "Screen flickering"
}
```

Accepted fields: `equipment`, `description`, `user_name`, `status`. Other fields are ignored.

#### Close a ticket

```http
PATCH /tickets/:id/close
Content-Type: application/json

{
  "solution": "Replaced power supply"
}
```

Sets `status` to `"closed"` and saves the solution.

#### Delete a ticket

```http
DELETE /tickets/:id
```

### Status codes

| Code | When |
|---|---|
| `200` | Success |
| `201` | Ticket created |
| `400` | `PATCH` with no accepted fields |
| `404` | Ticket or route not found |

### Project structure

```
src/
├── controllers/tickets/   # Logic for each route
├── database/              # JSON file database (db.json)
├── middlewares/           # JSON body parsing and routing
├── routes/                # Route definitions
├── utils/                 # Route and query param parsing
└── server.js              # Entry point
```
