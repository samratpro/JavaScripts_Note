# Fastify + Prisma + MongoDB + PostgreSQL (pgdriver) with TypeScript

A complete guide to building a production-ready REST API using Fastify as the web framework, Prisma as the ORM, with support for both MongoDB and PostgreSQL databases in TypeScript.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [TypeScript Configuration](#typescript-configuration)
4. [Fastify Setup](#fastify-setup)
5. [Prisma with PostgreSQL (pgdriver)](#prisma-with-postgresql-pgdriver)
6. [Prisma with MongoDB](#prisma-with-mongodb)
7. [Building Routes & Controllers](#building-routes--controllers)
8. [Error Handling](#error-handling)
9. [Environment Configuration](#environment-configuration)
10. [Running the App](#running-the-app)
11. [Project Structure](#project-structure)

---

## Prerequisites

- **Node.js** v18+
- **npm** or **pnpm**
- A running **PostgreSQL** instance (local or cloud e.g. Supabase, Neon)
- A running **MongoDB** instance (local or MongoDB Atlas)
- Basic TypeScript knowledge

---

## Project Setup

Initialize a new Node.js project:

```bash
mkdir fastify-prisma-ts && cd fastify-prisma-ts
npm init -y
```

Install all dependencies:

```bash
# Core
npm install fastify @fastify/sensible

# Prisma ORM
npm install prisma @prisma/client

# PostgreSQL driver (used by Prisma under the hood for PG)
npm install pg
npm install --save-dev @types/pg

# Environment variables
npm install dotenv

# TypeScript & tooling
npm install --save-dev typescript ts-node tsup nodemon @types/node
```

---

## TypeScript Configuration

Create `tsconfig.json` at the root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon --watch src --ext ts --exec ts-node src/server.ts",
    "build": "tsup src/server.ts --format cjs --dts",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

---

## Environment Configuration

Create a `.env` file at the root:

```env
# App
PORT=3000
NODE_ENV=development

# PostgreSQL (pgdriver)
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"

# MongoDB
MONGODB_URL="mongodb://localhost:27017/mydb"
# OR for MongoDB Atlas:
# MONGODB_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority"
```

Create `src/config.ts`:

```typescript
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL ?? '',
  mongodbUrl: process.env.MONGODB_URL ?? '',
} as const;
```

---

## Prisma with PostgreSQL (pgdriver)

### Initialize Prisma

```bash
npx prisma init --datasource-provider postgresql
```

This creates a `prisma/schema.prisma` file. Update it:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Run migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Prisma PostgreSQL Client

Create `src/db/postgres.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances in development (hot-reload safe)
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const pgClient = globalThis.__prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = pgClient;
}

export async function connectPostgres(): Promise<void> {
  await pgClient.$connect();
  console.log('✅ PostgreSQL connected via Prisma');
}

export async function disconnectPostgres(): Promise<void> {
  await pgClient.$disconnect();
  console.log('🔌 PostgreSQL disconnected');
}
```

---

## Prisma with MongoDB

### Create a Separate Prisma Schema for MongoDB

Prisma supports multiple data sources via separate schema files. Create `prisma/mongo.prisma`:

```prisma
// prisma/mongo.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/@prisma/mongo-client"
}

datasource db {
  provider = "mongodb"
  url      = env("MONGODB_URL")
}

model Log {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  level     String
  message   String
  meta      Json?
  createdAt DateTime @default(now())
}

model Product {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String?
  price       Float
  tags        String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Generate the MongoDB client:

```bash
npx prisma generate --schema=prisma/mongo.prisma
```

> **Note:** MongoDB with Prisma does not support `migrate dev`. Use `db push` instead:
> ```bash
> npx prisma db push --schema=prisma/mongo.prisma
> ```

### Prisma MongoDB Client

Create `src/db/mongo.ts`:

```typescript
import { PrismaClient } from '@prisma/mongo-client';

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: PrismaClient | undefined;
}

export const mongoClient = globalThis.__mongoClient ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.MONGODB_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__mongoClient = mongoClient;
}

export async function connectMongo(): Promise<void> {
  await mongoClient.$connect();
  console.log('✅ MongoDB connected via Prisma');
}

export async function disconnectMongo(): Promise<void> {
  await mongoClient.$disconnect();
  console.log('🔌 MongoDB disconnected');
}
```

---

## Fastify Setup

### App Factory

Create `src/app.ts`:

```typescript
import Fastify, { FastifyInstance } from 'fastify';
import sensible from '@fastify/sensible';

import { userRoutes } from './routes/user.routes';
import { productRoutes } from './routes/product.routes';
import { logRoutes } from './routes/log.routes';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  // ─── Plugins ───────────────────────────────────────────────────
  await app.register(sensible);

  // ─── Routes ────────────────────────────────────────────────────
  await app.register(userRoutes, { prefix: '/api/users' });       // PostgreSQL
  await app.register(productRoutes, { prefix: '/api/products' }); // MongoDB
  await app.register(logRoutes, { prefix: '/api/logs' });         // MongoDB

  // ─── Health check ──────────────────────────────────────────────
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  return app;
}
```

### Entry Point

Create `src/server.ts`:

```typescript
import { buildApp } from './app';
import { connectPostgres, disconnectPostgres } from './db/postgres';
import { connectMongo, disconnectMongo } from './db/mongo';
import { config } from './config';

async function main(): Promise<void> {
  const app = await buildApp();

  // Connect databases
  await connectPostgres();
  await connectMongo();

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}, shutting down...`);
    await app.close();
    await disconnectPostgres();
    await disconnectMongo();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
```

---

## Building Routes & Controllers

### Types

Create `src/types/user.types.ts`:

```typescript
export interface CreateUserBody {
  email: string;
  name?: string;
}

export interface UpdateUserBody {
  name?: string;
}

export interface UserParams {
  id: string;
}
```

Create `src/types/product.types.ts`:

```typescript
export interface CreateProductBody {
  name: string;
  description?: string;
  price: number;
  tags?: string[];
}

export interface ProductParams {
  id: string;
}
```

---

### User Routes (PostgreSQL via Prisma)

Create `src/routes/user.routes.ts`:

```typescript
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { pgClient } from '../db/postgres';
import { CreateUserBody, UpdateUserBody, UserParams } from '../types/user.types';

export async function userRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/users
  app.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
    const users = await pgClient.user.findMany({
      include: { posts: true },
      orderBy: { createdAt: 'desc' },
    });
    return reply.send(users);
  });

  // GET /api/users/:id
  app.get<{ Params: UserParams }>(
    '/:id',
    async (req: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
      const { id } = req.params;
      const user = await pgClient.user.findUnique({
        where: { id: parseInt(id, 10) },
        include: { posts: true },
      });

      if (!user) {
        return reply.notFound(`User with id ${id} not found`);
      }

      return reply.send(user);
    }
  );

  // POST /api/users
  app.post<{ Body: CreateUserBody }>(
    '/',
    async (req: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) => {
      const { email, name } = req.body;

      const existing = await pgClient.user.findUnique({ where: { email } });
      if (existing) {
        return reply.conflict(`User with email ${email} already exists`);
      }

      const user = await pgClient.user.create({
        data: { email, name },
      });

      return reply.code(201).send(user);
    }
  );

  // PATCH /api/users/:id
  app.patch<{ Params: UserParams; Body: UpdateUserBody }>(
    '/:id',
    async (
      req: FastifyRequest<{ Params: UserParams; Body: UpdateUserBody }>,
      reply: FastifyReply
    ) => {
      const { id } = req.params;
      const { name } = req.body;

      try {
        const user = await pgClient.user.update({
          where: { id: parseInt(id, 10) },
          data: { name },
        });
        return reply.send(user);
      } catch {
        return reply.notFound(`User with id ${id} not found`);
      }
    }
  );

  // DELETE /api/users/:id
  app.delete<{ Params: UserParams }>(
    '/:id',
    async (req: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
      const { id } = req.params;

      try {
        await pgClient.user.delete({ where: { id: parseInt(id, 10) } });
        return reply.code(204).send();
      } catch {
        return reply.notFound(`User with id ${id} not found`);
      }
    }
  );
}
```

---

### Product Routes (MongoDB via Prisma)

Create `src/routes/product.routes.ts`:

```typescript
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { mongoClient } from '../db/mongo';
import { CreateProductBody, ProductParams } from '../types/product.types';

export async function productRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/products
  app.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
    const products = await mongoClient.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return reply.send(products);
  });

  // GET /api/products/:id
  app.get<{ Params: ProductParams }>(
    '/:id',
    async (req: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) => {
      const { id } = req.params;
      const product = await mongoClient.product.findUnique({ where: { id } });

      if (!product) {
        return reply.notFound(`Product with id ${id} not found`);
      }

      return reply.send(product);
    }
  );

  // POST /api/products
  app.post<{ Body: CreateProductBody }>(
    '/',
    async (req: FastifyRequest<{ Body: CreateProductBody }>, reply: FastifyReply) => {
      const { name, description, price, tags } = req.body;

      const product = await mongoClient.product.create({
        data: { name, description, price, tags: tags ?? [] },
      });

      return reply.code(201).send(product);
    }
  );

  // DELETE /api/products/:id
  app.delete<{ Params: ProductParams }>(
    '/:id',
    async (req: FastifyRequest<{ Params: ProductParams }>, reply: FastifyReply) => {
      const { id } = req.params;

      try {
        await mongoClient.product.delete({ where: { id } });
        return reply.code(204).send();
      } catch {
        return reply.notFound(`Product with id ${id} not found`);
      }
    }
  );
}
```

---

### Log Routes (MongoDB via Prisma)

Create `src/routes/log.routes.ts`:

```typescript
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { mongoClient } from '../db/mongo';

interface CreateLogBody {
  level: 'info' | 'warn' | 'error';
  message: string;
  meta?: Record<string, unknown>;
}

export async function logRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/logs?level=error
  app.get<{ Querystring: { level?: string } }>(
    '/',
    async (req: FastifyRequest<{ Querystring: { level?: string } }>, reply: FastifyReply) => {
      const { level } = req.query;
      const logs = await mongoClient.log.findMany({
        where: level ? { level } : undefined,
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      return reply.send(logs);
    }
  );

  // POST /api/logs
  app.post<{ Body: CreateLogBody }>(
    '/',
    async (req: FastifyRequest<{ Body: CreateLogBody }>, reply: FastifyReply) => {
      const { level, message, meta } = req.body;
      const log = await mongoClient.log.create({
        data: { level, message, meta: meta ?? {} },
      });
      return reply.code(201).send(log);
    }
  );
}
```

---

## Error Handling

Create `src/plugins/error-handler.ts`:

```typescript
import { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { Prisma } from '@prisma/client';

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler(
    (error: FastifyError, _req: FastifyRequest, reply: FastifyReply) => {
      // Prisma known errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return reply.status(409).send({
            statusCode: 409,
            error: 'Conflict',
            message: 'A record with this value already exists',
          });
        }
        if (error.code === 'P2025') {
          return reply.status(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: 'Record not found',
          });
        }
      }

      // Validation errors
      if (error.validation) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message: error.message,
        });
      }

      // Generic fallback
      app.log.error(error);
      return reply.status(error.statusCode ?? 500).send({
        statusCode: error.statusCode ?? 500,
        error: 'Internal Server Error',
        message:
          process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred'
            : error.message,
      });
    }
  );
}
```

Register it in `src/app.ts` by adding:

```typescript
import { registerErrorHandler } from './plugins/error-handler';

// inside buildApp(), after plugins:
registerErrorHandler(app);
```

---

## Project Structure

```
fastify-prisma-ts/
├── prisma/
│   ├── schema.prisma          # PostgreSQL schema
│   ├── mongo.prisma           # MongoDB schema
│   └── migrations/            # PG migrations (auto-generated)
├── src/
│   ├── config.ts              # App configuration
│   ├── server.ts              # Entry point
│   ├── app.ts                 # Fastify app factory
│   ├── db/
│   │   ├── postgres.ts        # Prisma PG client
│   │   └── mongo.ts           # Prisma Mongo client
│   ├── routes/
│   │   ├── user.routes.ts     # PostgreSQL CRUD
│   │   ├── product.routes.ts  # MongoDB CRUD
│   │   └── log.routes.ts      # MongoDB logs
│   ├── types/
│   │   ├── user.types.ts
│   │   └── product.types.ts
│   └── plugins/
│       └── error-handler.ts
├── .env
├── tsconfig.json
└── package.json
```

---

## Running the App

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

### Regenerate Prisma clients after schema changes

```bash
# PostgreSQL
npx prisma migrate dev --name <migration_name>
npx prisma generate

# MongoDB
npx prisma db push --schema=prisma/mongo.prisma
npx prisma generate --schema=prisma/mongo.prisma
```

---

## Testing the API

Use `curl` or any HTTP client (Postman, HTTPie, etc.):

```bash
# Health check
curl http://localhost:3000/health

# Create a user (PostgreSQL)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "alice@example.com", "name": "Alice"}'

# Get all users
curl http://localhost:3000/api/users

# Create a product (MongoDB)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 9.99, "tags": ["sale", "new"]}'

# Get all products
curl http://localhost:3000/api/products

# Create a log (MongoDB)
curl -X POST http://localhost:3000/api/logs \
  -H "Content-Type: application/json" \
  -d '{"level": "info", "message": "Server started", "meta": {"port": 3000}}'

# Get error logs only
curl "http://localhost:3000/api/logs?level=error"
```

---

## Key Takeaways

- **Fastify** gives you a fast, schema-friendly HTTP server with excellent TypeScript support out of the box.
- **Prisma** acts as a unified ORM across both PostgreSQL and MongoDB — same query API, different underlying engines.
- **PostgreSQL** uses `prisma migrate dev` for schema migrations; **MongoDB** uses `prisma db push` since it is schemaless by nature.
- **Multiple Prisma schemas** are managed with the `--schema` flag, generating separate clients for each database.
- **Graceful shutdown** ensures both database connections are properly closed before the process exits.
- **`@fastify/sensible`** adds handy HTTP error helpers like `reply.notFound()` and `reply.conflict()`.
