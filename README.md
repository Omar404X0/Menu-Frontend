<div align="center">

<img src="assets/banner.svg" alt="Layali" width="100%"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=22&duration=3200&pause=900&color=DFC1D3&center=true&vCenter=true&width=760&height=40&lines=A+caf%C3%A9+menu+that+feels+alive+%E2%98%95;Floating+beans+%C2%B7+Whipped+clouds+%C2%B7+Chocolate+drips;Glassmorphism+admin+panel+with+live+editing;Next.js+%C2%B7+TypeScript+%C2%B7+Tailwind+%C2%B7+Vercel" alt="Typing animation" />
</a>

<br/>

<a href="https://menu-backend-fagr.vercel.app/"><img src="https://img.shields.io/badge/%E2%98%95%20%20VIEW%20LIVE%20MENU-dfc1d3?style=for-the-badge&labelColor=2a1a12" alt="Live menu"/></a>
<a href="https://menu-backend-fagr.vercel.app/edit"><img src="https://img.shields.io/badge/%F0%9F%94%90%20%20ADMIN%20PANEL-9dbb6b?style=for-the-badge&labelColor=2a1a12" alt="Admin"/></a>
<a href="https://github.com/Omar404X0/Menu-Backend"><img src="https://img.shields.io/badge/%E2%9A%99%EF%B8%8F%20%20BACKEND%20REPO-e0a878?style=for-the-badge&labelColor=2a1a12" alt="Backend"/></a>

<br/><br/>

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,vercel,nodejs&theme=dark" alt="stack"/>

<br/><br/>

![Status](https://img.shields.io/badge/status-live-9dbb6b?style=flat-square&labelColor=2a1a12)
![Deployed](https://img.shields.io/badge/deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Responsive](https://img.shields.io/badge/layout-responsive-dfc1d3?style=flat-square&labelColor=2a1a12)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-e0a878?style=flat-square&labelColor=2a1a12)

</div>

<img src="assets/divider.svg" width="100%" alt=""/>

<table align="center">
  <tr>
    <td align="center" width="25%"><h1>3</h1><sub><b>MENU CATEGORIES</b><br/>hot · cold · cake</sub></td>
    <td align="center" width="25%"><h1>9</h1><sub><b>LOOPING VIDEO CARDS</b><br/>3 per section</sub></td>
    <td align="center" width="25%"><h1>3</h1><sub><b>ANIMATED SCENES</b><br/>beans · clouds · drips</sub></td>
    <td align="center" width="25%"><h1>1h</h1><sub><b>SECURE SESSION</b><br/>Redis-backed token</sub></td>
  </tr>
</table>

<img src="assets/divider.svg" width="100%" alt=""/>

## 📖 Table of Contents

<table>
  <tr>
    <td>

- [✨ Overview](#-overview)
- [🌐 Live Demo](#-live-demo)
- [🎯 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🔄 Admin Flow](#-admin-flow)

</td>
    <td>

- [🧩 Component Breakdown](#-component-breakdown)
- [🎨 Design System](#-design-system)
- [🚀 Getting Started](#-getting-started)
- [☁️ Deployment](#️-deployment)
- [🗺️ Roadmap](#️-roadmap)

</td>
  </tr>
</table>

<img src="assets/divider.svg" width="100%" alt=""/>

## ✨ Overview

**Layali** is a café menu that feels alive. Instead of a boring price list, customers get a hand-crafted scrolling experience: **floating coffee beans**, a **whipped-cream cloud** that melts into the iced section, and a **chocolate drip** that pours into the cakes section, with stacked **looping video cards** beside every category.

Behind the scenes, the café owner gets a private **glassmorphism admin dashboard** to add, edit and delete products in real time, with no code and no redeploy.

> [!NOTE]
> The public menu and the admin panel are two parts of **one** Next.js app, and both talk to the same FastAPI backend.

<img src="assets/divider.svg" width="100%" alt=""/>

## 🌐 Live Demo

<table>
  <tr>
    <td align="center" width="50%">
      <h3>☕ Public Menu</h3>
      <a href="https://menu-backend-fagr.vercel.app/">menu-backend-fagr.vercel.app</a>
      <br/><sub>What your customers see</sub>
    </td>
    <td align="center" width="50%">
      <h3>🔐 Admin Dashboard</h3>
      <a href="https://menu-backend-fagr.vercel.app/edit">menu-backend-fagr.vercel.app/edit</a>
      <br/><sub>Where the owner manages products</sub>
    </td>
  </tr>
</table>

> [!TIP]
> The API runs on a free Render instance. If it has been idle, the **first request can take ~30–50 seconds** while the server wakes up. After that it's instant.

<img src="assets/divider.svg" width="100%" alt=""/>

## 🎯 Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🍽️ Dynamic Menu</h3>
      Items come straight from the API, grouped by category, with dotted “leader” lines between name and price. Nothing is hard-coded.
    </td>
    <td width="50%" valign="top">
      <h3>🎞️ Stacked Video Cards</h3>
      Autoplay, loop and muted clips in tilted cards. Hover straightens a card, scales it up and brings it to the front.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎨 Scenery Per Section</h3>
      <code>CoffeeBeans</code>, whipped-cream <code>IcedFoam</code> and a dripping <code>ChocolateDrip</code>, each with its own colour theme.
    </td>
    <td width="50%" valign="top">
      <h3>📱 Fully Responsive</h3>
      A single-column layout on phones and a split layout on desktop, tuned with Tailwind breakpoints.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🔐 Secure Admin Login</h3>
      Email + password against the backend. The session token lives in <code>sessionStorage</code> and expires server-side after one hour.
    </td>
    <td width="50%" valign="top">
      <h3>✏️ Full CRUD</h3>
      Add a product (pick or create a category on the fly), edit name, price and category in a modal, or delete it instantly.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Optimistic UI</h3>
      Edits and deletes update the screen immediately, then sync with the server.
    </td>
    <td width="50%" valign="top">
      <h3>⌨️ Keyboard Friendly</h3>
      <code>Enter</code> moves or submits, <code>Esc</code> closes modals, and every field is validated before anything is sent.
    </td>
  </tr>
</table>

<img src="assets/divider.svg" width="100%" alt=""/>

## 🏗️ Architecture

```mermaid
flowchart LR
    U([👤 Customer]) -->|GET /| FE
    A([🧑‍🍳 Admin]) -->|/edit| FE

    subgraph Vercel
      FE[Next.js Frontend<br/>React + TypeScript + Tailwind]
    end

    subgraph Render
      API[FastAPI Backend]
    end

    FE -->|REST / JSON| API
    API -->|SQLAlchemy| DB[(Neon PostgreSQL)]
    API -->|session:token, TTL 1h| R[(Redis)]

    style FE fill:#3a2418,stroke:#dfc1d3,color:#fff
    style API fill:#3a2418,stroke:#9dbb6b,color:#fff
    style DB fill:#2a1a12,stroke:#e0a878,color:#fff
    style R fill:#2a1a12,stroke:#e0a878,color:#fff
```

<img src="assets/divider.svg" width="100%" alt=""/>

## 🔄 Admin Flow

```mermaid
sequenceDiagram
    autonumber
    actor Admin
    participant UI as Next.js (/edit)
    participant API as FastAPI
    participant Redis
    participant DB as PostgreSQL

    Admin->>UI: Enter email + password
    UI->>API: POST /edit/login
    API->>DB: Find admin by email
    API->>API: Verify bcrypt hash
    API->>Redis: SET session:<token> (EX 3600)
    API-->>UI: { token }
    UI->>UI: sessionStorage.setItem("token")
    UI->>API: GET /  (load the menu)
    API-->>UI: items[]

    Admin->>UI: Add / Edit / Delete
    UI->>API: POST /edit/add | /edit/item | /edit/delete { token, ... }
    API->>Redis: Is the session alive?
    alt token valid
        API->>DB: Write change
        API-->>UI: { ok: true }
        UI->>UI: Update list
    else token expired
        API-->>UI: 401 – please login again
    end
```

<img src="assets/divider.svg" width="100%" alt=""/>

## 🧩 Component Breakdown

```text
app/
├── page.tsx              # Public menu (Home)
├── edit/
│   └── page.tsx          # Admin dashboard (login + CRUD)
├── CoffeeBeans.tsx       # Floating beans scenery (hot section)
├── MatchaPowder.tsx      # `IcedFoam`: whipped cream clouds (iced section)
├── ChocolateDrip.tsx     # Dripping chocolate (cakes section)
public/
├── coffee.mp4  Tea.mp4  latte.mp4
├── iced.mp4    iced2.mp4  iced3.mp4
└── cake.mp4    cake2.mp4  cake3.mp4
```

<details>
<summary><b>🔎 What each component does</b></summary>

<br/>

| Component | Responsibility |
|-----------|----------------|
| `Home` | Fetches items once, filters per category with `by(category)` and renders three themed sections |
| `MenuSection` | Layout of one section: title + list on one side, video stack on the other |
| `MenuList` | Renders `name ····· price` rows with dotted leaders |
| `VideoStack` | Three absolutely-positioned, rotated video cards (`POS` array) with hover effects |
| `AdminLogin` | One component with 3 states: login, dashboard, and modals (edit/add) |

</details>

<img src="assets/divider.svg" width="100%" alt=""/>

## 🎨 Design System

<table>
  <tr>
    <td align="center"><img src="https://placehold.co/90x40/2a1a12/2a1a12.png" alt=""/><br/><b>Espresso</b><br/><code>#2a1a12</code><br/><sub>Admin background</sub></td>
    <td align="center"><img src="https://placehold.co/90x40/dfc1d3/dfc1d3.png" alt=""/><br/><b>Orchid</b><br/><code>#dfc1d3</code><br/><sub>Accent & focus rings</sub></td>
    <td align="center"><img src="https://placehold.co/90x40/f3d9c8/f3d9c8.png" alt=""/><br/><b>Peach</b><br/><code>#f3d9c8</code><br/><sub>Prices & highlights</sub></td>
    <td align="center"><img src="https://placehold.co/90x40/9dbb6b/9dbb6b.png" alt=""/><br/><b>Matcha</b><br/><code>#9dbb6b</code><br/><sub>Iced section orb</sub></td>
    <td align="center"><img src="https://placehold.co/90x40/e0dcd1/e0dcd1.png" alt=""/><br/><b>Cream</b><br/><code>#e0dcd1</code><br/><sub>Menu background</sub></td>
  </tr>
</table>

Typography uses a handwritten script for the public menu and **Poppins** for the admin UI.

<img src="assets/divider.svg" width="100%" alt=""/>

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/Omar404X0/Menu-Frontend.git
cd Menu-Frontend

# 2. Install
npm install

# 3. Configure
cp .env.example .env.local     # then edit the API URL

# 4. Run
npm run dev
```

Open **http://localhost:3000** for the menu and **http://localhost:3000/edit** for the admin panel.

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend | `https://menu-backend-grr7.onrender.com` |

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> [!IMPORTANT]
> Run the backend locally first (default `http://localhost:8000`). See the [Menu-Backend](https://github.com/Omar404X0/Menu-Backend) repo for setup.

<img src="assets/divider.svg" width="100%" alt=""/>

## ☁️ Deployment

<table>
  <tr>
    <td align="center" width="25%"><h3>1️⃣</h3><b>Push</b><br/><sub>Push the repo to GitHub</sub></td>
    <td align="center" width="25%"><h3>2️⃣</h3><b>Import</b><br/><sub>Import it on <a href="https://vercel.com">Vercel</a></sub></td>
    <td align="center" width="25%"><h3>3️⃣</h3><b>Configure</b><br/><sub>Add <code>NEXT_PUBLIC_API_URL</code> in Environment Variables</sub></td>
    <td align="center" width="25%"><h3>4️⃣</h3><b>Ship</b><br/><sub>Every push to <code>master</code> redeploys automatically</sub></td>
  </tr>
</table>

> [!WARNING]
> Add your Vercel domain to the backend's `FRONTEND_URL`, otherwise **CORS** will block the requests.

<img src="assets/divider.svg" width="100%" alt=""/>

## 🧠 What I Learned

This project was my hands-on playground for turning new tools into one real, deployed product:

| | Tool | What I practised |
|---|------|------------------|
| 🔴 | **Redis** | Server-side sessions with automatic expiry |
| 🐳 | **Docker** | Containerising for consistent environments |
| 🧪 | **pytest** | Testing the API endpoints |
| 🌩️ | **Cloud** | Vercel (frontend) · Render (API) · Neon (PostgreSQL) |
| 🎨 | **Frontend craft** | Glassmorphism, animation and responsive layouts |

<img src="assets/divider.svg" width="100%" alt=""/>

## 🗺️ Roadmap

- [x] Public animated menu
- [x] Admin login with Redis sessions
- [x] Add / edit / delete products
- [ ] Send the token via an `Authorization: Bearer` header
- [ ] Toast notifications instead of `alert()`
- [ ] Image upload for products
- [ ] Arabic / RTL language toggle
- [ ] Drag-and-drop ordering of items

<img src="assets/divider.svg" width="100%" alt=""/>

<div align="center">

### Enjoyed it? Drop a ⭐ and check the [backend repo](https://github.com/Omar404X0/Menu-Backend)

Made with ☕ and 💜 by **[Omar Elmallah](https://github.com/Omar404X0)**

<img src="assets/divider.svg" width="100%" alt=""/>

</div>
