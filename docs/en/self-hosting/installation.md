# Installation Guide

This guide takes you from a fresh clone to a running Devify stack — for both
local development and self-hosted production. It assumes basic familiarity with
Docker and the command line.

> Language: **English** | [中文](/zh/self-hosting/installation.md)

## Contents

- [Prerequisites](#prerequisites)
- [1. Get the code](#1-get-the-code)
- [2. Environment configuration](#2-environment-configuration)
- [3. Development stack](#3-development-stack)
- [4. Production stack](#4-production-stack)
- [5. Haraka inbound email](#5-haraka-inbound-email)
- [6. First run](#6-first-run)
- [7. Troubleshooting](#7-troubleshooting)

---

## Prerequisites

- **Docker** and **Docker Compose v2** (`docker compose`, not the legacy
  `docker-compose`).
- **Node.js 18+** and **npm** — only needed for the development stack (the UI
  runs a Vite dev server on the host's `node_modules`).
- **Git**.
- At least one supported **LLM provider** account with API credentials,
  including a **multimodal** model (required for image understanding and intent
  detection).
- An **SMTP server** for outbound notifications.

Minimum host resources (see also the README "Self-Hosting Requirements"):

| Resource | Minimum |
|----------|---------|
| CPU | 2 cores |
| RAM | 4 GB |
| Storage | 20 GB |

---

## 1. Get the code

```bash
git clone https://github.com/cloud2ai/devify.git
cd devify
```

Repository layout (top level):

```text
devify/                 # Django backend (the app code lives here)
ui/                     # Vue 3 frontend (Vite)
docker/                 # Service configs (Haraka, Nginx, MySQL)
docker-compose.yml      # Production stack
docker-compose.dev.yml  # Development stack
env.sample              # Environment template
```

---

## 2. Environment configuration

All configuration is driven by an environment file that you copy from
`env.sample`. **Boolean values must be lowercase `true` / `false`.**

The environment file name differs by stack:

| Stack | Env file | Compose file |
|-------|----------|--------------|
| Development | `.env.dev` | `docker-compose.dev.yml` |
| Production | `.env` | `docker-compose.yml` |

### Environment variable reference

Copy the template first (see the per-stack sections below for which name to
use), then review these groups.

**Django / runtime**

| Variable | Purpose |
|----------|---------|
| `SECRET_KEY` | Django secret key — change for production |
| `DJANGO_DEBUG` | `true` for dev, `false` for production |
| `ALLOWED_HOSTS` | Comma-separated hostnames |
| `CSRF_TRUSTED_ORIGINS`, `CORS_ALLOWED_ORIGINS` | Origins allowed to call the API |
| `SITE_DOMAIN`, `SITE_NAME` | Public site domain (no protocol) — used for OAuth and webhooks |
| `FRONTEND_URL`, `VITE_API_BASE_URL` | Frontend URL and the API base the frontend calls |
| `DJANGO_SUPERUSER_USERNAME` / `_EMAIL` / `_PASSWORD` | Auto-created superuser on first run |

**Database** — select an engine with `DB_ENGINE`:

| Engine | Variables |
|--------|-----------|
| `sqlite` | `SQLITE_PATH` |
| `mysql` | `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_ROOT_PASSWORD` |
| `postgresql` | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB` |

> Both compose stacks ship a **MariaDB** service, so use `DB_ENGINE=mysql` with
> `MYSQL_HOST=mysql` (the service name). See the note in
> [Development stack](#3-development-stack).

**Celery / Redis / cache**

| Variable | Purpose |
|----------|---------|
| `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND` | Point to `redis://redis:6379/0` |
| `CELERY_CONCURRENCY`, `CELERY_LOG_LEVEL` | Worker tuning |
| `CACHE_BACKEND` | `redis` |
| `FLOWER_HOST_PORT` | Flower monitoring port (dev) |

**Email / notifications**

| Variable | Purpose |
|----------|---------|
| `EMAIL_BACKEND` | `smtp` backend for production, `console` for dev |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `EMAIL_USE_TLS` | Outbound SMTP for notifications |
| `DEFAULT_FROM_EMAIL` | From address |
| `AUTO_ASSIGN_EMAIL_DOMAIN` | Domain for auto-assigned inbound mailboxes (Haraka) |
| `HARAKA_SMTP_PORT`, `HARAKA_EMAIL_BASE_DIR` | Inbound SMTP settings |

**OAuth (optional)**

| Variable | Purpose |
|----------|---------|
| `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` | Google login |
| `ACCOUNT_DEFAULT_HTTP_PROTOCOL` | `http` for dev, `https` for production |

**AI models / providers**

`env.sample` includes legacy Azure OpenAI variables
(`AZURE_OPENAI_*`), but **model providers are configured in the management
console after startup**, not primarily through `.env`. See
[First run](#6-first-run).

**Monitoring (optional)**

`SENTRY_*` and `VITE_SENTRY_*` — leave empty to disable Sentry.

---

## 3. Development stack

The development stack (`docker-compose.dev.yml`) mounts the source tree for live
reload, runs a Vite dev server for the UI, and includes Flower for Celery
monitoring.

### Step 1 — Create `.env.dev`

The dev compose file reads **`.env.dev`** (not `.env`):

```bash
cp env.sample .env.dev
```

### Step 2 — Configure the database

The dev stack runs a MariaDB service whose container must pass a health check
before the API starts. That requires database credentials, so set the following
in `.env.dev`:

```dotenv
DB_ENGINE=mysql
MYSQL_USER=devify
MYSQL_PASSWORD=devify
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DATABASE=devify
MYSQL_ROOT_PASSWORD=devify_root
```

> **Why this matters:** `env.sample` defaults to `DB_ENGINE=sqlite` with the
> MySQL block commented out. If `MYSQL_ROOT_PASSWORD` is unset, the MariaDB
> container exits with *"Database is uninitialized and password option is not
> specified"* and crash-loops, and the API never starts because it waits on the
> database's health check.

### Step 3 — Install UI dependencies

The dev compose mounts the host's `ui/node_modules` into the UI container, so
dependencies must be installed on the host first — otherwise the container fails
with `sh: vite: not found`:

```bash
cd ui && npm install && cd ..
```

### Step 4 — Build and start

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml up -d --build
```

> **Important — `--env-file .env.dev`:** the `env_file:` entries in the compose
> file only inject variables **inside** the containers. Port mappings like
> `${DJANGO_HOST_PORT}` and `${FLOWER_HOST_PORT}` are interpolated from the
> project's default `.env` or the shell, **not** from `env_file`. Passing
> `--env-file .env.dev` makes your custom ports (and any other interpolated
> values) take effect. Without it, ports fall back to their defaults.

### Development ports

| Service | Default host port | Variable |
|---------|-------------------|----------|
| App (via Nginx → UI + API) | `8000` | `DJANGO_HOST_PORT` |
| Flower (Celery monitoring) | `5555` | `FLOWER_HOST_PORT` |
| Haraka (inbound SMTP) | `25` | `HARAKA_SMTP_PORT` |

If a port is already in use on your host, change the corresponding variable in
`.env.dev` and re-run the `up` command with `--env-file .env.dev`.

### Verify

```bash
docker compose -f docker-compose.dev.yml ps          # all services healthy/up
curl -f http://127.0.0.1:8000/health                 # HTTP 200
```

---

## 4. Production stack

The production stack (`docker-compose.yml`) uses prebuilt images and fronts the
app with Nginx.

### Step 1 — Create `.env`

```bash
cp env.sample .env
```

Set production values, at minimum:

- `DJANGO_DEBUG=false`, a strong `SECRET_KEY`
- `ALLOWED_HOSTS`, `SITE_DOMAIN`, `FRONTEND_URL`, `VITE_API_BASE_URL`,
  `CSRF_TRUSTED_ORIGINS`, `CORS_ALLOWED_ORIGINS`
- Database: `DB_ENGINE=mysql` with `MYSQL_HOST=mysql` and a strong
  `MYSQL_ROOT_PASSWORD` / `MYSQL_PASSWORD`
- `EMAIL_*` for outbound notifications
- `AUTO_ASSIGN_EMAIL_DOMAIN` if you use inbound email
- `ACCOUNT_DEFAULT_HTTP_PROTOCOL=https`

### Step 2 — Build and start

```bash
docker compose build
docker compose up -d
```

The production stack includes: API (gunicorn), worker, scheduler, UI, Nginx,
MariaDB, Redis, and Haraka.

### Production ports

Nginx publishes the app; put your own HTTPS reverse proxy in front of it.

| Variable | Default | Purpose |
|----------|---------|---------|
| `NGINX_HTTP_PORT` | `10080` | HTTP entry point |
| `NGINX_HTTPS_PORT` | `10443` | HTTPS entry point |
| `NGINX_ADMIN_PORT` | `19443` | Admin |
| `HARAKA_SMTP_PORT` | `25` | Inbound SMTP |

For HTTPS, terminate TLS at a reverse proxy such as **Nginx Proxy Manager**,
**Traefik**, or **Caddy**, and forward to `NGINX_HTTP_PORT`.

---

## 5. Haraka inbound email

Devify bundles [Haraka](https://haraka.github.io/) so users can receive mail at
auto-assigned addresses:

```text
{username}@{AUTO_ASSIGN_EMAIL_DOMAIN}
```

Haraka listens on SMTP port 25, writes raw messages under
`data/haraka/emails`, and the worker/scheduler picks them up into the normal
email workflow.

For production, configure the mail domain in **three** places:

1. `.env`: `AUTO_ASSIGN_EMAIL_DOMAIN=example.com`
2. `docker/haraka/config/host_list.prod`: add `example.com`
3. DNS: an **MX** record for `example.com` pointing to the Haraka host.

Recommended DNS records:

```text
example.com.        MX   10 mail.example.com.
mail.example.com.   A    <server-public-ip>
example.com.        TXT  "v=spf1 mx -all"
_dmarc.example.com. TXT  "v=DMARC1; p=quarantine; rua=mailto:admin@example.com"
```

Port 25 must be reachable from the public internet. For STARTTLS:

```bash
HARAKA_DOMAIN=mail.example.com HARAKA_CERT_EMAIL=admin@example.com \
  ./scripts/manage-haraka-certs.sh apply
```

See [`docker/haraka/README.md`](https://github.com/cloud2ai/devify/blob/main/docker/haraka/README.md) for details.

---

## 6. First run

1. **Superuser** — created automatically from `DJANGO_SUPERUSER_*` on first
   startup. Confirm you can log in.

2. **Configure LLM providers** in the management console (this is the primary
   place model providers are configured — not `.env`):
   - Open `/management/llm/config`.
   - Add one or more `LLMConfig` entries; set `api_key`, `api_base`, `model`,
     `deployment` (Azure), and optional `max_tokens`, `temperature`, `top_p`,
     timeout.
   - Use the built-in **connection test** to validate each entry.

   > Set `max_tokens` generously for reasoning models — the value is the
   > **output** budget and includes reasoning tokens, so a too-small value
   > truncates JSON output and silently drops fields (e.g., tags).

3. **Bind models** in `/management/app-settings` and
   `/management/threadline/config` (multimodal model for image understanding,
   text model for summarization, and the smart-delivery channel model).

4. **Health check**:

   ```bash
   # Dev
   curl -f http://127.0.0.1:8000/health
   # Production (via Nginx)
   curl -f http://127.0.0.1:10080/health
   ```

See the [User Guide](/en/self-hosting/user-guide.md) for using the console and the Threadline
workflow.

---

## 7. Troubleshooting

**MariaDB crash-loops: "Database is uninitialized and password option is not
specified"**
`MYSQL_ROOT_PASSWORD` (and the other `MYSQL_*` vars) are not set in your env
file. Set them (see [Development stack, Step 2](#step-2-configure-the-database))
and recreate: `docker compose ... up -d`.

**UI container restarts / `sh: vite: not found`**
The host `ui/node_modules` is empty or owned by root. Run `npm install` in `ui/`
on the host; if it fails with `EACCES`, fix ownership first:
`sudo chown -R "$USER" ui/node_modules` and re-run `npm install`.

**Custom ports have no effect / `port is already allocated`**
You started the dev stack without `--env-file .env.dev`, so port variables fell
back to defaults. Re-run with `--env-file .env.dev`, or change the conflicting
port variable (`DJANGO_HOST_PORT`, `FLOWER_HOST_PORT`, `HARAKA_SMTP_PORT`).

**API stays `unhealthy` for a minute after start**
On first boot the API runs database migrations and initialization before the
web server accepts requests; the health check passes once that finishes. Check
progress with `docker logs devify-api-dev` (dev) or `docker logs devify-api`
(production).

**LLM analysis missing tags/summary with no error**
Likely output truncation from a too-small `max_tokens` on the bound model
config. Raise `max_tokens` in `/management/llm/config`. Inspect recorded token
usage (`completion_tokens` hitting the ceiling) to confirm.
