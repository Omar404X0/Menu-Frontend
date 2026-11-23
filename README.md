<div align="center">

<img src="assets/banner.svg" alt="Layali" width="100%"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=20&duration=3000&pause=900&color=9DBB6B&center=true&vCenter=true&width=760&lines=POST+%2Fedit%2Flogin+%E2%86%92+bcrypt+%2B+Redis+session;Token+expires+automatically+after+1+hour;Containerised+with+Docker;Tested+with+pytest;Deployed+on+Render+%2B+Neon" alt="Typing animation" />
</a>

<br/>

[![API Live](https://img.shields.io/badge/%E2%9A%99%EF%B8%8F_API-Live_on_Render-9dbb6b?style=for-the-badge&labelColor=2a1a12)](https://menu-backend-grr7.onrender.com/health)
[![Docs](https://img.shields.io/badge/%F0%9F%93%9A_Swagger-/docs-dfc1d3?style=for-the-badge&labelColor=2a1a12)](https://menu-backend-grr7.onrender.com/docs)
[![Frontend](https://img.shields.io/badge/%E2%98%95_Frontend-Vercel-e0a878?style=for-the-badge&labelColor=2a1a12)](https://menu-backend-fagr.vercel.app/)

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Pytest](https://img.shields.io/badge/pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![Neon](https://img.shields.io/badge/Neon-00E599?style=flat-square&logo=neon&logoColor=black)

<br/><br/>

<img src="https://skillicons.dev/icons?i=python,fastapi,postgres,redis,docker,pytest,sqlalchemy&theme=dark" alt="stack"/>

</div>

<img src="assets/divider.svg" width="100%" alt=""/>


## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🌐 Live](#-live)
- [🏗️ Architecture](#️-architecture)
- [🔐 Authentication Flow](#-authentication-flow)
- [📡 API Reference](#-api-reference)
- [🗄️ Data Model](#️-data-model)
- [🛡️ Security Notes](#️-security-notes)
- [📂 Project Structure](#-project-structure)
- [🔧 Environment Variables](#-environment-variables)
- [🚀 Run Locally](#-run-locally)
- [🐳 Docker](#-docker)
- [🧪 Testing](#-testing)
- [☁️ Deployment](#️-deployment)
- [🧠 What I Learned](#-what-i-learned)
- [🗺️ Roadmap](#️-roadmap)
- [🔗 Related Repository](#-related-repository)

<img src="assets/divider.svg" width="100%" alt=""/>


## ✨ Overview

The backend of **Layali Menu**, a café menu with an admin dashboard. It exposes a small, fast REST API that:

- 🍽️ serves the public menu,
- 🔐 authenticates the café admin with **bcrypt**-hashed passwords,
- ⏱️ keeps login sessions in **Redis** with an automatic **1-hour expiry**,
- ✏️ lets the admin **add, edit and delete** products,
- 🗄️ persists everything in **PostgreSQL (Neon)**, with a SQLite fallback for local development.

<div align="center">
  <img src="docs/screenshots/admin-dashboard.png" alt="Admin dashboard powered by this API" width="90%"/>
  <br/><sub>The admin dashboard (frontend repo) consuming this API</sub>
</div>

<img src="assets/divider.svg" width="100%" alt=""/>


## 🌐 Live

| Resource | URL |
|----------|-----|
| API base | https://menu-backend-grr7.onrender.com |
| Health check | https://menu-backend-grr7.onrender.com/health |
| Interactive docs (Swagger) | https://menu-backend-grr7.onrender.com/docs |
| Menu website | https://menu-backend-fagr.vercel.app/ |
| Admin panel | https://menu-backend-fagr.vercel.app/edit |

> ⏳ Render's free tier sleeps when idle, so the first request may take ~30–50 s.

<img src="assets/divider.svg" width="100%" alt=""/>


## 🏗️ Architecture

```mermaid
flowchart TB
    FE[🖥️ Next.js Frontend<br/>Vercel] -- HTTPS / JSON --> CORS{CORS<br/>FRONTEND_URL}
    CORS --> API

    subgraph Render["☁️ Render: Docker container"]
      API[⚡ FastAPI]
      API --> ORM[SQLAlchemy ORM]
      API --> PW[passlib / bcrypt]
    end

    ORM --> DB[(🐘 Neon PostgreSQL<br/>menu · admin)]
    API -- "SET session:token EX 3600" --> R[(🔴 Redis)]

    style API fill:#3a2418,stroke:#9dbb6b,color:#fff
    style DB fill:#2a1a12,stroke:#e0a878,color:#fff
    style R fill:#2a1a12,stroke:#dc382d,color:#fff
```

<img src="assets/divider.svg" width="100%" alt=""/>


## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant A as FastAPI
    participant D as PostgreSQL
    participant R as Redis

    C->>A: POST /edit/login {email, password}
    A->>D: SELECT admin WHERE email = ?
    D-->>A: admin row (bcrypt hash)
    A->>A: verify_password(plain, hash)
    alt valid credentials
        A->>A: token = secrets.token_urlsafe(32)
        A->>R: SET session:{token} = admin.id  (EX 3600)
        A-->>C: 200 { token }
    else invalid
        A-->>C: 401 Wrong In email or password
    end

    Note over C,R: Every protected request sends the token

    C->>A: POST /edit/item { token, ... }
    A->>R: GET session:{token}
    alt exists
        A->>D: UPDATE menu
        A-->>C: { ok: true }
    else missing / expired
        A-->>C: 401 Token invalid or expired
    end
```

**Why Redis for sessions?** Sessions are short-lived key/value data, which is exactly what Redis is built for. `EX 3600` makes every session **self-destruct after an hour** with no cleanup job, and the API stays stateless and horizontally scalable.

<img src="assets/divider.svg" width="100%" alt=""/>


## 📡 API Reference

Base URL: `https://menu-backend-grr7.onrender.com`

| Method | Endpoint | Auth | Description |
|:------:|----------|:----:|-------------|
| `GET` | `/health` | ❌ | Liveness probe → `{"status": "ok"}` |
| `GET` | `/` | ❌ | List all menu items |
| `GET` | `/edit/get` | ❌ | List all items (admin view) |
| `POST` | `/edit/login` | ❌ | Exchange credentials for a session token |
| `POST` | `/edit/item` | ✅ | Update an item |
| `POST` | `/edit/delete` | ✅ | Delete an item |
| `POST` | `/edit/add` | ✅ | Create an item |

<details>
<summary><b>📥 GET /</b></summary>

```bash
curl https://menu-backend-grr7.onrender.com/
```

```json
[
  { "id": 1, "name": "Cappuccino", "price": 112.0, "category": "hot" },
  { "id": 9, "name": "Iced Latte", "price": 112.0, "category": "cold" },
  { "id": 13, "name": "Carrot Cake", "price": 130.0, "category": "cake" }
]
```
</details>

<details>
<summary><b>🔑 POST /edit/login</b></summary>

```bash
curl -X POST $API/edit/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "••••••••"}'
```

**200**
```json
{ "token": "k3J...secure-random-string" }
```
**401**
```json
{ "detail": "Wrong In email or password" }
```
</details>

<details>
<summary><b>➕ POST /edit/add</b></summary>

```bash
curl -X POST $API/edit/add \
  -H "Content-Type: application/json" \
  -d '{"token": "<TOKEN>", "name": "Mocha", "price": 120, "category": "hot"}'
```
```json
{ "ok": true }
```
</details>

<details>
<summary><b>✏️ POST /edit/item</b></summary>

```bash
curl -X POST $API/edit/item \
  -H "Content-Type: application/json" \
  -d '{"token": "<TOKEN>", "id": 1, "name": "Cappuccino", "price": 115, "category": "hot"}'
```
```json
{ "ok": true }
```
</details>

<details>
<summary><b>🗑️ POST /edit/delete</b></summary>

```bash
curl -X POST $API/edit/delete \
  -H "Content-Type: application/json" \
  -d '{"token": "<TOKEN>", "id": 1}'
```
```json
{ "ok": true }
```
`404` is returned if the item doesn't exist.
</details>

<img src="assets/divider.svg" width="100%" alt=""/>


## 🗄️ Data Model

```mermaid
erDiagram
    MENU {
        int    id PK
        string name "unique, not null"
        string category "hot | cold | cake | custom"
        float  price "not null"
    }
    ADMIN {
        int    id PK
        string email "unique, not null"
        string password "bcrypt hash"
    }
```

On first run, tables are created automatically via `Base.metadata.create_all`. Set `SEED_MENU=1` to seed the default 16-item menu, and `ADMIN_EMAIL` + `ADMIN_PASSWORD` to auto-create the admin account (stored as a bcrypt hash).

<img src="assets/divider.svg" width="100%" alt=""/>


## 🛡️ Security Notes

| Concern | How it's handled |
|---------|------------------|
| Password storage | `passlib` + **bcrypt**, never stored in plain text |
| Sessions | Random 256-bit `secrets.token_urlsafe(32)`, stored in Redis |
| Expiry | Redis TTL of **3600 s** |
| CORS | Only the origin in `FRONTEND_URL` is allowed |
| Secrets | All credentials come from environment variables |
| DB connection | `pool_pre_ping` + `pool_recycle` for serverless Postgres (Neon) |

<img src="assets/divider.svg" width="100%" alt=""/>


## 📂 Project Structure

```text
.
├── main.py            # FastAPI app: routes, CORS, Redis sessions
├── db.py              # SQLAlchemy models, engine, seeding, bcrypt helpers
├── tests/             # pytest suite
├── Dockerfile
├── requirements.txt
├── .env.example
└── docs/screenshots/
```

<img src="assets/divider.svg" width="100%" alt=""/>


## 🔧 Environment Variables

| Variable | Required | Description | Example |
|----------|:--------:|-------------|---------|
| `DATABASE_URL` | prod | PostgreSQL URL (`postgres://` is auto-fixed to `postgresql://`). Falls back to local SQLite | `postgresql://user:pass@host/db` |
| `REDIS_URL` | ✅ | Redis connection string | `redis://localhost:6379/0` |
| `FRONTEND_URL` | ✅ | Allowed CORS origin | `https://menu-backend-fagr.vercel.app` |
| `ADMIN_EMAIL` | first run | Creates the admin if missing | `admin@layali.com` |
| `ADMIN_PASSWORD` | first run | Admin password (hashed on save) | `••••••••` |
| `SEED_MENU` | optional | `1` seeds the default menu when the table is empty | `1` |

<img src="assets/divider.svg" width="100%" alt=""/>


## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/Omar404X0/Menu-Backend.git
cd Menu-Backend

# 2. Virtual env
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install
pip install -r requirements.txt

# 4. Start Redis (see Docker section) and set env
export REDIS_URL=redis://localhost:6379/0
export FRONTEND_URL=http://localhost:3000
export ADMIN_EMAIL=admin@layali.com
export ADMIN_PASSWORD=change-me
export SEED_MENU=1

# 5. Run
uvicorn main:app --reload
```

API → **http://localhost:8000** · Swagger → **http://localhost:8000/docs**

<img src="assets/divider.svg" width="100%" alt=""/>


## 🐳 Docker

Run only Redis:

```bash
docker run -d --name layali-redis -p 6379:6379 redis:7-alpine
```

Build and run the API:

```bash
docker build -t layali-api .
docker run -d -p 8000:8000 --env-file .env --name layali-api layali-api
```

Or with Docker Compose (API + Redis):

```yaml
services:
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  api:
    build: .
    ports: ["8000:8000"]
    env_file: .env
    environment:
      REDIS_URL: redis://redis:6379/0
    depends_on: [redis]
```

```bash
docker compose up --build
```

<img src="assets/divider.svg" width="100%" alt=""/>


## 🧪 Testing

```bash
pip install pytest httpx
pytest -v
```

Suggested coverage:

- ✅ `GET /health` returns `{"status": "ok"}`
- ✅ `GET /` returns the list of items
- ✅ Login with wrong credentials → `401`
- ✅ Login with correct credentials → returns a `token`
- ✅ Protected routes without a valid token → `401`
- ✅ Add → Edit → Delete full lifecycle

<img src="assets/divider.svg" width="100%" alt=""/>


## ☁️ Deployment

| Service | Provider | Notes |
|---------|----------|-------|
| API | **Render** | Deploys from GitHub, with env vars set in the dashboard |
| Database | **Neon** | Serverless PostgreSQL, handled by `pool_pre_ping` and `pool_recycle` |
| Redis | Managed Redis | Provided via `REDIS_URL` |
| Frontend | **Vercel** | See the frontend repo |

<img src="assets/divider.svg" width="100%" alt=""/>


## 🧠 What I Learned

- 🔴 **Redis** for session storage with TTL-based expiry
- 🐳 **Docker** for reproducible environments
- 🧪 **pytest** for API testing
- 🔐 Password hashing with bcrypt and token-based auth
- 🌩️ Shipping a full stack with Render, Neon and Vercel

<img src="assets/divider.svg" width="100%" alt=""/>


## 🗺️ Roadmap

- [ ] Send the token via `Authorization: Bearer` header instead of the body
- [ ] Protect `GET /edit/get` with auth (or remove the duplicate route)
- [ ] Return `404` in `/edit/item` when the id doesn't exist
- [ ] Rate-limit `/edit/login`
- [ ] Logout endpoint (delete the Redis key)
- [ ] Alembic migrations
- [ ] GitHub Actions CI (pytest + Docker build)

<img src="assets/divider.svg" width="100%" alt=""/>


## 🔗 Related Repository

| Repo | Description |
|------|-------------|
| **[Frontend](https://github.com/Omar404X0/Menu-Frontend)** (`Menu-Frontend`) | Next.js + TypeScript + Tailwind: the animated menu and admin dashboard |

<img src="assets/divider.svg" width="100%" alt=""/>


<div align="center">

Made with ☕ and 🐍 by **[Omar Elmallah](https://github.com/Omar404X0)**

<img src="assets/divider.svg" width="100%" alt=""/>

</div>
