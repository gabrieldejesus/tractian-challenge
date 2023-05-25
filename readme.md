<p align="center">
  <img src="./public/images/cover.png" alt="A Front End Software Engineer challenge to Tractian company.">
</p>

<br />

<div align="center"><strong>Challenge: Front End Software Engineer</strong></div>
<div align="center">A Front End Software Engineer challenge to Tractian company.</div>

<div align="center">
  <sub>Created by <a href="https://github.com/gabrieldejesus">Gabriel de Jesus</a>.</sub>
</div>

<br />

## ✨ Features

- ⚡️ Next.js 13
- ⚛️ React 18
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚓 Commitlint — To make sure your commit messages follow the convention
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 🗂 Path Mapping — Import components or images using the `@` prefix

## 🚀 Quick Start

**Clone repository**

```bash
git clone https://github.com/gabrieldejesus/tractian-challenge
```

```bash
cd tractian-challenge
```

**Install dependencies**

```bash
npm install
```

**Copy example environment variables**

```bash
cp .env.local.example .env.local
```

Add all environment variables

Replace the variable values with the required values (ask for this information to me in private so that I can send it to you securely)

## 🦾 Development

To start the project locally on development, run:

```bash
npm run dev
```

Open <a href="http://localhost:3000">http://localhost:3000</a> with your client to see the result.

## 🐳 Docker

This repo is configured to be built with Docker, and Docker compose. To build this app just run:

```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build --parallel
```

**Start prod in detached mode**

```bash
docker-compose -f docker-compose.yml up -d
```

## 📜 Documentation

### 🚨 Requirements

- Node.js >= 12.22.0

### 🗂️ Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, tests and styles.

### 🦾 Scripts

- `npm run dev` — Starts the application in development mode at `http://localhost:3000`.
- `npm run build` — Creates an optimized production build of your application.
- `npm run start` — Starts the application in production mode.
- `npm run type-check` — Validate code using TypeScript compiler.
- `npm run lint` — Runs ESLint for all files in the `src` directory.
- `npm run format` — Runs Prettier for all files in the `src` directory.

### 🗂️ Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import Container from '@/components/Container';

// To import images or other files from the public folder
import Logo from '@/public/logo.svg';
```

## 🐞 Bugs, help, issues or new updates

If you need any help tu run this app or want to make new updates just contact me at: <a href="mailto:hi@gabrieldejesus.dev">hi@gabrieldejesus.dev</a>
