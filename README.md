# Lab Harmony Backend

TypeScript + Express + Sequelize API with MySQL and JWT authentication.

## Prerequisites

- Node.js 20+
- npm 10+
- Docker + Docker Compose (only for containerized setup)

## Project Structure

- `lab-harmony-back/` (this folder): backend source code
- `../docker-compose.yml`: orchestration for MySQL + backend services

## Environment Variables

A `.env` file already exists in this backend folder. If you need to recreate it, use:

```env
NODE_ENV=development
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3308
DB_USER=root
DB_PASSWORD=password
DB_NAME=lab_database

JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
BCRYPT_ROUNDS=10
```

## Option A: Start Services with Docker Compose (Recommended)

Run these commands from the parent folder (where `docker-compose.yml` is located):

```bash
cd ..
docker compose up --build
```

What this starts:

- MySQL service on `localhost:3308`
- Backend API on `http://localhost:3000`

Useful commands:

```bash
# Start in background
cd ..
docker compose up -d --build

# Check logs
cd ..
docker compose logs -f back

# Stop services
cd ..
docker compose down

# Stop and remove DB volume (full reset)
cd ..
docker compose down -v
```

## Option B: Run Locally (without Docker)

1. Ensure MySQL is running and database credentials match your `.env`.
2. From this backend folder, install dependencies:

```bash
npm install
```

3. Start in development mode:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm start
```

## API URLs

- Health/Home: `http://localhost:3000/`
- Swagger UI: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs.json`

## Quick API Test

Register a user:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ruben Martinez",
    "email": "ruben@example.com",
    "password": "MiClave123"
  }'
```

## Troubleshooting

- Port conflict on `3000` or `3308`: free the port or change `.env`/compose mapping.
- DB connection issues: verify `DB_HOST`, `DB_PORT`, credentials, and container health.
- TypeScript build check:

```bash
npm run build
```
