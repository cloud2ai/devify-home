# 安装指南

本指南带你从零（克隆代码）到运行起 Devify——涵盖本地开发与自托管生产两种场景，默认你对 Docker 和命令行有基本了解。

> 语言：[English](/en/self-hosting/installation.md) | **中文**

## 目录

- [前置条件](#前置条件)
- [1. 获取代码](#1-获取代码)
- [2. 环境配置](#2-环境配置)
- [3. 开发环境](#3-开发环境)
- [4. 生产环境](#4-生产环境)
- [5. Haraka 入站邮件](#5-haraka-入站邮件)
- [6. 首次运行](#6-首次运行)
- [7. 故障排查](#7-故障排查)

---

## 前置条件

- **Docker** 与 **Docker Compose v2**（`docker compose`，而非旧版 `docker-compose`）。
- **Node.js 18+** 与 **npm**——仅开发环境需要（UI 通过 Vite dev server 运行，依赖宿主机的 `node_modules`）。
- **Git**。
- 至少一个受支持的 **LLM 提供商**账号及 API 凭据，且需包含一个**多模态**模型（图像理解与意图识别必需）。
- 用于发送通知的 **SMTP 服务器**。

宿主机最低资源（另见 README 的 "Self-Hosting Requirements"）：

| 资源 | 最低 |
|------|------|
| CPU | 2 核 |
| 内存 | 4 GB |
| 存储 | 20 GB |

---

## 1. 获取代码

```bash
git clone https://github.com/cloud2ai/devify.git
cd devify
```

仓库顶层结构：

```text
devify/                 # Django 后端（应用代码在此）
ui/                     # Vue 3 前端（Vite）
docker/                 # 服务配置（Haraka、Nginx、MySQL）
docker-compose.yml      # 生产栈
docker-compose.dev.yml  # 开发栈
env.sample              # 环境变量模板
```

---

## 2. 环境配置

所有配置由从 `env.sample` 复制出的环境文件驱动。**布尔值必须用小写 `true` / `false`。**

不同栈使用的环境文件名不同：

| 栈 | 环境文件 | Compose 文件 |
|----|----------|--------------|
| 开发 | `.env.dev` | `docker-compose.dev.yml` |
| 生产 | `.env` | `docker-compose.yml` |

### 环境变量参考

先复制模板（用哪个文件名见下面各栈章节），然后逐组检查。

**Django / 运行时**

| 变量 | 用途 |
|------|------|
| `SECRET_KEY` | Django 密钥——生产务必更换 |
| `DJANGO_DEBUG` | 开发 `true`，生产 `false` |
| `ALLOWED_HOSTS` | 逗号分隔的主机名 |
| `CSRF_TRUSTED_ORIGINS`、`CORS_ALLOWED_ORIGINS` | 允许调用 API 的来源 |
| `SITE_DOMAIN`、`SITE_NAME` | 公开站点域名（不含协议）——用于 OAuth 和 webhook |
| `FRONTEND_URL`、`VITE_API_BASE_URL` | 前端地址、以及前端调用的 API 基址 |
| `DJANGO_SUPERUSER_USERNAME` / `_EMAIL` / `_PASSWORD` | 首次运行自动创建的超级用户 |

**数据库**——用 `DB_ENGINE` 选择引擎：

| 引擎 | 变量 |
|------|------|
| `sqlite` | `SQLITE_PATH` |
| `mysql` | `MYSQL_USER`、`MYSQL_PASSWORD`、`MYSQL_HOST`、`MYSQL_PORT`、`MYSQL_DATABASE`、`MYSQL_ROOT_PASSWORD` |
| `postgresql` | `POSTGRES_USER`、`POSTGRES_PASSWORD`、`POSTGRES_HOST`、`POSTGRES_PORT`、`POSTGRES_DB` |

> 两个 compose 栈都自带 **MariaDB** 服务，因此请使用 `DB_ENGINE=mysql`，并设 `MYSQL_HOST=mysql`（服务名）。详见[开发环境](#3-开发环境)的说明。

**Celery / Redis / 缓存**

| 变量 | 用途 |
|------|------|
| `CELERY_BROKER_URL`、`CELERY_RESULT_BACKEND` | 指向 `redis://redis:6379/0` |
| `CELERY_CONCURRENCY`、`CELERY_LOG_LEVEL` | Worker 调优 |
| `CACHE_BACKEND` | `redis` |
| `FLOWER_HOST_PORT` | Flower 监控端口（开发） |

**邮件 / 通知**

| 变量 | 用途 |
|------|------|
| `EMAIL_BACKEND` | 生产用 `smtp`，开发可用 `console` |
| `EMAIL_HOST`、`EMAIL_PORT`、`EMAIL_HOST_USER`、`EMAIL_HOST_PASSWORD`、`EMAIL_USE_TLS` | 发送通知的 SMTP |
| `DEFAULT_FROM_EMAIL` | 发件地址 |
| `AUTO_ASSIGN_EMAIL_DOMAIN` | 自动分配入站邮箱的域名（Haraka） |
| `HARAKA_SMTP_PORT`、`HARAKA_EMAIL_BASE_DIR` | 入站 SMTP 设置 |

**OAuth（可选）**

| 变量 | 用途 |
|------|------|
| `GOOGLE_OAUTH_CLIENT_ID`、`GOOGLE_OAUTH_CLIENT_SECRET` | Google 登录 |
| `ACCOUNT_DEFAULT_HTTP_PROTOCOL` | 开发 `http`，生产 `https` |

**AI 模型 / 提供商**

`env.sample` 里保留了历史的 Azure OpenAI 变量（`AZURE_OPENAI_*`），但**模型提供商主要在启动后的管理控制台里配置**，而非 `.env`。见[首次运行](#6-首次运行)。

**监控（可选）**

`SENTRY_*` 与 `VITE_SENTRY_*`——留空即禁用 Sentry。

---

## 3. 开发环境

开发栈（`docker-compose.dev.yml`）挂载源码实现热重载，UI 跑 Vite dev server，并包含用于 Celery 监控的 Flower。

### 第 1 步 — 创建 `.env.dev`

开发 compose 读取的是 **`.env.dev`**（不是 `.env`）：

```bash
cp env.sample .env.dev
```

### 第 2 步 — 配置数据库

开发栈会启动一个 MariaDB 服务，其容器必须通过健康检查后 API 才会启动。这需要数据库凭据，因此在 `.env.dev` 中设置：

```dotenv
DB_ENGINE=mysql
MYSQL_USER=devify
MYSQL_PASSWORD=devify
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DATABASE=devify
MYSQL_ROOT_PASSWORD=devify_root
```

> **为什么必须这样：** `env.sample` 默认 `DB_ENGINE=sqlite` 且 MySQL 段被注释。如果 `MYSQL_ROOT_PASSWORD` 未设置，MariaDB 容器会以 *“Database is uninitialized and password option is not specified”* 退出并陷入崩溃重启循环，而 API 因等待数据库健康检查而永远无法启动。

### 第 3 步 — 安装 UI 依赖

开发 compose 会把宿主机的 `ui/node_modules` 挂进 UI 容器，因此必须先在宿主机安装依赖，否则容器会报 `sh: vite: not found`：

```bash
cd ui && npm install && cd ..
```

### 第 4 步 — 构建并启动

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml up -d --build
```

> **重要 —— `--env-file .env.dev`：** compose 文件里的 `env_file:` 只把变量注入**容器内部**。而端口映射如 `${DJANGO_HOST_PORT}`、`${FLOWER_HOST_PORT}` 的插值来自项目默认的 `.env` 或 shell，**不来自 `env_file`**。加上 `--env-file .env.dev` 才能让你自定义的端口（及其他被插值的值）生效；不加则端口回退到默认值。

### 开发端口

| 服务 | 默认宿主端口 | 变量 |
|------|--------------|------|
| 应用（经 Nginx → UI + API） | `8000` | `DJANGO_HOST_PORT` |
| Flower（Celery 监控） | `5555` | `FLOWER_HOST_PORT` |
| Haraka（入站 SMTP） | `25` | `HARAKA_SMTP_PORT` |

若某端口在宿主机已被占用，改 `.env.dev` 里对应变量，并带 `--env-file .env.dev` 重跑 `up`。

### 验证

```bash
docker compose -f docker-compose.dev.yml ps          # 所有服务 healthy/up
curl -f http://127.0.0.1:8000/health                 # HTTP 200
```

---

## 4. 生产环境

生产栈（`docker-compose.yml`）使用预构建镜像，并由 Nginx 承接前端流量。

### 第 1 步 — 创建 `.env`

```bash
cp env.sample .env
```

至少设置这些生产值：

- `DJANGO_DEBUG=false`、强随机 `SECRET_KEY`
- `ALLOWED_HOSTS`、`SITE_DOMAIN`、`FRONTEND_URL`、`VITE_API_BASE_URL`、`CSRF_TRUSTED_ORIGINS`、`CORS_ALLOWED_ORIGINS`
- 数据库：`DB_ENGINE=mysql`，`MYSQL_HOST=mysql`，并设强 `MYSQL_ROOT_PASSWORD` / `MYSQL_PASSWORD`
- `EMAIL_*` 用于发送通知
- 若使用入站邮件，设 `AUTO_ASSIGN_EMAIL_DOMAIN`
- `ACCOUNT_DEFAULT_HTTP_PROTOCOL=https`

### 第 2 步 — 构建并启动

```bash
docker compose build
docker compose up -d
```

生产栈包含：API（gunicorn）、worker、scheduler、UI、Nginx、MariaDB、Redis、Haraka。

### 生产端口

Nginx 对外发布应用；请在其前面放置你自己的 HTTPS 反向代理。

| 变量 | 默认 | 用途 |
|------|------|------|
| `NGINX_HTTP_PORT` | `10080` | HTTP 入口 |
| `NGINX_HTTPS_PORT` | `10443` | HTTPS 入口 |
| `NGINX_ADMIN_PORT` | `19443` | 管理端口 |
| `HARAKA_SMTP_PORT` | `25` | 入站 SMTP |

HTTPS 建议在反向代理（**Nginx Proxy Manager**、**Traefik**、**Caddy** 等）处终止 TLS，再转发到 `NGINX_HTTP_PORT`。

---

## 5. Haraka 入站邮件

Devify 内置 [Haraka](https://haraka.github.io/)，让用户可以在自动分配的地址收信：

```text
{用户名}@{AUTO_ASSIGN_EMAIL_DOMAIN}
```

Haraka 监听 SMTP 25 端口，把原始邮件写入 `data/haraka/emails`，worker/scheduler 再将其接入正常的邮件处理流程。

生产环境需在**三处**配置邮件域名：

1. `.env`：`AUTO_ASSIGN_EMAIL_DOMAIN=example.com`
2. `docker/haraka/config/host_list.prod`：加入 `example.com`
3. DNS：为 `example.com` 添加指向 Haraka 主机的 **MX** 记录。

推荐 DNS 记录：

```text
example.com.        MX   10 mail.example.com.
mail.example.com.   A    <服务器公网IP>
example.com.        TXT  "v=spf1 mx -all"
_dmarc.example.com. TXT  "v=DMARC1; p=quarantine; rua=mailto:admin@example.com"
```

25 端口必须可从公网访问。如需 STARTTLS：

```bash
HARAKA_DOMAIN=mail.example.com HARAKA_CERT_EMAIL=admin@example.com \
  ./scripts/manage-haraka-certs.sh apply
```

详见 [`docker/haraka/README.md`](https://github.com/cloud2ai/devify/blob/main/docker/haraka/README.md)。

---

## 6. 首次运行

1. **超级用户**——首次启动时按 `DJANGO_SUPERUSER_*` 自动创建，确认能登录。

2. **配置 LLM 提供商**（模型提供商主要在此配置，而非 `.env`）：
   - 打开 `/management/llm/config`。
   - 新增一个或多个 `LLMConfig`；填写 `api_key`、`api_base`、`model`、`deployment`（Azure），以及可选的 `max_tokens`、`temperature`、`top_p`、超时。
   - 用内置的**连接测试**验证每一项。

   > 对推理型模型，`max_tokens` 要给足——它是**输出**预算且包含推理 token，设得太小会截断 JSON 输出并静默丢字段（如标签）。

3. **绑定模型**：在 `/management/app-settings` 和 `/management/threadline/config` 中绑定多模态模型（图像理解）、文本模型（摘要）以及智能投递渠道模型。

4. **健康检查**：

   ```bash
   # 开发
   curl -f http://127.0.0.1:8000/health
   # 生产（经 Nginx）
   curl -f http://127.0.0.1:10080/health
   ```

控制台使用与 Threadline 流程见[使用手册](/zh/self-hosting/user-guide.md)。

---

## 7. 故障排查

**MariaDB 崩溃重启：“Database is uninitialized and password option is not specified”**
环境文件里没设 `MYSQL_ROOT_PASSWORD`（及其他 `MYSQL_*`）。补上（见[开发环境第 2 步](#第-2-步-配置数据库)）后重建：`docker compose ... up -d`。

**UI 容器不断重启 / `sh: vite: not found`**
宿主机 `ui/node_modules` 为空或属主是 root。在宿主机 `ui/` 下执行 `npm install`；若报 `EACCES`，先修属主：`sudo chown -R "$USER" ui/node_modules` 再重装。

**自定义端口不生效 / `port is already allocated`**
启动开发栈时没带 `--env-file .env.dev`，端口变量回退成默认值。带上 `--env-file .env.dev` 重跑，或修改冲突的端口变量（`DJANGO_HOST_PORT`、`FLOWER_HOST_PORT`、`HARAKA_SMTP_PORT`）。

**API 启动后 unhealthy 持续约一分钟**
首次启动时 API 会先跑数据库迁移与初始化，之后 web 服务才接受请求；完成后健康检查即通过。用 `docker logs devify-api-dev`（开发）或 `docker logs devify-api`（生产）查看进度。

**LLM 分析缺少标签/摘要且无报错**
多半是所绑定模型配置的 `max_tokens` 过小导致输出截断。在 `/management/llm/config` 调高 `max_tokens`；查看已记录的 token 用量（`completion_tokens` 是否顶到上限）可确认。
