# 使用手册

本手册讲解 Devify 的日常使用：控制台导航、端到端的 Threadline 流程、向 Jira 或飞书的智能投递配置，以及账户管理。

> 语言：[English](/en/self-hosting/user-guide.md) | **中文**
>
> 初次使用？请先按[安装指南](/zh/self-hosting/installation.md)搭好实例。

## 目录

- [核心概念](#核心概念)
- [1. 登录](#1-登录)
- [2. 控制台概览](#2-控制台概览)
- [3. Threadline 流程（端到端）](#3-threadline-流程端到端)
- [4. 使用会话（Chats）](#4-使用会话chats)
- [5. 智能投递（Relay）](#5-智能投递relay)
- [6. 待办（TODOs）](#6-待办todos)
- [7. 账户、计费与 OAuth](#7-账户计费与-oauth)
- [8. 管理控制台（管理员）](#8-管理控制台管理员)

---

## 核心概念

- **Threadline**——核心工作流，把转发进来的对话（聊天记录、邮件往来、截图）转成结构化摘要。
- **会话（Chat）**——一条处理完成的对话。邮件进、结构化摘要出；结果在**会话**中浏览。
- **智能投递（Relay）**——一个订阅"工作流完成"事件、并把结果投递到外部目标（Jira、飞书多维表格）的应用。
- **LLM 配置**——绑定的模型提供商条目。Devify 用多模态模型处理图像、文本模型做摘要。

---

## 1. 登录

打开你的 Devify 地址并登录：

- **用户名 / 密码**，或
- **Google**（若已配置 OAuth，见 [OAuth](#7-账户计费与-oauth)）。

新用户可在 `/register` 注册；登录页提供找回密码。

<!-- ![登录页](images/user-guide/login.png) -->

---

## 2. 控制台概览

登录后进入仪表盘。主导航：

| 区域 | 路径 | 作用 |
|------|------|------|
| 仪表盘 | `/dashboard` | 概览与近期动态 |
| 会话 | `/chats` | 浏览处理完成的对话 |
| 待办 | `/todos` | 从对话中抽取的行动项 |
| 应用中心 | `/apps` | 启用并打开应用（如 Relay） |
| 计费 | `/billing` | credits 与套餐 |
| 设置 | `/settings` | 个人资料与偏好 |

<!-- ![控制台导航](images/user-guide/console.png) -->

---

## 3. Threadline 流程（端到端）

从原始对话到投递摘要的典型流程：

```text
邮件转发  ──▶  入站（Haraka / IMAP）  ──▶  Worker 处理
                                            │  图像理解
                                            │  LLM 内容分析
                                            │  摘要 + 元数据
                                            ▼
                                    结构化会话  ──▶  智能投递
                                    （在 /chats 查看）   （Jira / 飞书）
```

### 第 1 步 — 用邮件把内容发进来

把聊天记录、邮件往来或截图转发到你的 Devify 收信地址：

```text
{你的用户名}@{AUTO_ASSIGN_EMAIL_DOMAIN}
```

支持文本与图片附件。（若你的实例用 IMAP 采集而非 Haraka，则转发到配置的邮箱。）

### 第 2 步 — 自动处理

Worker 取到邮件后运行流程：多模态图像理解与意图识别、LLM 内容分析，再生成摘要与元数据（标题、关键词/标签、待办）。处理中可在会话上看到状态。

### 第 3 步 — 查看结果

打开**会话**（`/chats`）并选中该对话，即可看到结构化摘要、抽取的元数据和待办。见[使用会话](#4-使用会话chats)。

### 第 4 步 — 向下游投递（可选）

若已配置 Relay 渠道，处理完成的结果会自动投递到外部目标。见[智能投递](#5-智能投递relay)。

---

## 4. 使用会话（Chats）

在**会话**（`/chats`）中，每一项是一条处理完成的对话。打开某条（`/chats/:id`）可见：

- 生成的**摘要**（标题与正文），
- 抽取的**元数据**（关键词/标签等），
- 带识别到截止时间的**待办**，
- 原始内容与附件。

**分享**——会话可通过只读链接（`/chats/share/:token`）分享给无账户的人。

<!-- ![会话详情](images/user-guide/chat-detail.png) -->

---

## 5. 智能投递（Relay）

Relay 把完成的工作流结果投递到外部系统。从**应用中心** → **Relay**（`/apps/relay`）打开。

### 添加投递渠道

1. 在 Relay 中新建渠道并选择**目标类型**：
   - **飞书多维表格**——向飞书多维表格写入一条记录。
   - **Jira**——创建一个 issue。
2. 填写目标的连接信息（见下）。
3. 保存前用**测试投递**，以样例数据和附件验证配置。

### 飞书多维表格渠道

| 字段 | 说明 |
|------|------|
| App ID / App Secret | 飞书自建应用凭据 |
| App Token 类型 | `多维表格`（填链接里的 App Token）或 `Wiki`（填 Wiki 节点 token，后端自动解析出可写 token） |
| App Token / Wiki 节点 token | 按上面的类型填 |
| 表名 | 必须与飞书表名完全一致 |
| 字段映射 | 左侧飞书列名 → 右侧系统内部字段 |
| 附件字段名 | 接收附件的飞书列 |

常用内部字段：`summary_title`、`summary_content`、`llm_content`、`title`、`description`。若只需数量而非文件，用 `attachment_count`。

> **权限：** 飞书应用必须对目标表有**写/编辑**权限（附件还需 drive 上传权限）。如果读成功、写却报 *forbidden*，请检查应用在该 Wiki 节点 / 多维表格上的协作者权限。

### Jira 渠道

提供 Jira 地址、凭据（用户名 + API token），以及字段配置（项目 key、issue 类型、优先级、摘要前缀、描述处理方式）。

### 投递记录与重试

Relay 页面列出近期投递及其状态。失败的投递可从其记录**重试**。

<!-- ![Relay 渠道编辑器](images/user-guide/relay.png) -->

---

## 6. 待办（TODOs）

从对话中抽取的行动项显示在**待办**（`/todos`），包含处理时识别到的截止时间。可作为跨所有对话的轻量跟进清单。

---

## 7. 账户、计费与 OAuth

- **设置**（`/settings`）——个人资料与偏好。
- **计费**（`/billing`）——credits 余额与套餐。部分 AI 操作会消耗 credits，余额在此显示。
- **OAuth 登录**——若管理员已配置，可用 Google 登录。首次 OAuth 登录会完成一次简短的账户绑定，把外部身份关联到你的 Devify 账户。

---

## 8. 管理控制台（管理员）

管理员在管理控制台配置运行时设置（不再只有 Django Admin）：

| 路径 | 用途 |
|------|------|
| `/management/llm/config` | 提供商凭据、模型、默认值、连接测试 |
| `/management/app-settings` | 全局设置、Threadline 模型绑定、通知渠道、Relay 渠道模型绑定 |
| `/management/threadline/config` | Threadline 工作流模型设置 |
| `/management/threadline/periodic-tasks` | 定时任务 |
| `/management/notifier/channels` | Webhook 与通知渠道 |
| `/management/notifier/settings` | 通知设置 |
| `/management/billing/settings` | 计费运行时设置 |

管理员首次配置的典型顺序：

1. 在 `/management/llm/config` 添加 LLM 提供商并运行连接测试。
2. 在 `/management/app-settings` 和 `/management/threadline/config` 绑定多模态模型与文本模型。
3.（可选）配置通知渠道与定时任务。

Django Admin 仍可用于底层检查与历史遗留操作。

---

*上文引用的截图为占位——请按需补充你自己实例的截图。*
