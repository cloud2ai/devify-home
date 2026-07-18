# User Guide

This guide explains how to use Devify day to day: navigating the console,
running the Threadline workflow end to end, configuring smart delivery to Jira
or Feishu, and managing your account.

> Language: **English** | [中文](/zh/self-hosting/user-guide.md)
>
> New to Devify? Set up a running instance first with the
> [Installation Guide](/en/self-hosting/installation.md).

## Contents

- [Concepts](#concepts)
- [1. Signing in](#1-signing-in)
- [2. Console overview](#2-console-overview)
- [3. Threadline workflow (end to end)](#3-threadline-workflow-end-to-end)
- [4. Working with chats](#4-working-with-chats)
- [5. Smart delivery (Relay)](#5-smart-delivery-relay)
- [6. TODOs](#6-todos)
- [7. Account, billing & OAuth](#7-account-billing-oauth)
- [8. Management console (admin)](#8-management-console-admin)

---

## Concepts

- **Threadline** — the core workflow that turns forwarded conversations (chat
  records, email threads, screenshots) into a structured summary.
- **Chat** — one processed conversation. Email in, structured summary out; you
  browse the results under **Chats**.
- **Smart delivery (Relay)** — an app that subscribes to workflow-completion
  events and delivers the result to an external target (Jira, Feishu Bitable).
- **LLM config** — a bound model provider entry. Devify uses a multimodal model
  for images and a text model for summarization.

---

## 1. Signing in

Open your Devify URL and sign in with:

- **Username / password**, or
- **Google** (if OAuth is configured — see [OAuth](#7-account-billing-oauth)).

New users can register at `/register`; password reset is available from the
login screen.

<!-- ![Login screen](images/user-guide/login.png) -->

---

## 2. Console overview

After signing in you land on the dashboard. Primary navigation:

| Area | Path | What it's for |
|------|------|---------------|
| Dashboard | `/dashboard` | Overview and recent activity |
| Chats | `/chats` | Browse processed conversations |
| TODOs | `/todos` | Action items extracted from conversations |
| App Center | `/apps` | Enable and open apps (e.g., Relay) |
| Billing | `/billing` | Credits and plan |
| Settings | `/settings` | Profile and preferences |

<!-- ![Console navigation](images/user-guide/console.png) -->

---

## 3. Threadline workflow (end to end)

The typical flow, from raw conversation to delivered summary:

```text
Forward by email  ──▶  Inbound (Haraka / IMAP)  ──▶  Worker processing
                                                        │  image understanding
                                                        │  LLM content analysis
                                                        │  summary + metadata
                                                        ▼
                                              Structured Chat  ──▶  Smart delivery
                                              (view under /chats)     (Jira / Feishu)
```

### Step 1 — Send content in by email

Forward the chat record, email thread, or screenshots to your Devify inbox
address:

```text
{your-username}@{AUTO_ASSIGN_EMAIL_DOMAIN}
```

Both text and image attachments are supported. (If your instance uses IMAP
collection instead of Haraka, forward to the configured mailbox.)

### Step 2 — Automatic processing

The worker picks up the message and runs the workflow: multimodal image
understanding and intent detection, LLM content analysis, then summary and
metadata (title, keywords/tags, TODOs) generation. Processing status is visible
on the chat while it runs.

### Step 3 — Review the result

Open **Chats** (`/chats`) and select the conversation to see its structured
summary, extracted metadata, and any TODOs. See
[Working with chats](#4-working-with-chats).

### Step 4 — Deliver downstream (optional)

If you have a Relay channel configured, the completed result is delivered to
your external target automatically. See
[Smart delivery](#5-smart-delivery-relay).

---

## 4. Working with chats

Under **Chats** (`/chats`) each item is one processed conversation. Open one
(`/chats/:id`) to see:

- the generated **summary** (title and content),
- extracted **metadata** (keywords/tags, etc.),
- **TODOs** with any detected deadlines,
- original content and attachments.

**Sharing** — a chat can be shared via a read-only link (`/chats/share/:token`)
for people without an account.

<!-- ![Chat detail](images/user-guide/chat-detail.png) -->

---

## 5. Smart delivery (Relay)

Relay delivers completed workflow results to an external system. Open it from
the **App Center** → **Relay** (`/apps/relay`).

### Add a delivery channel

1. In Relay, create a new channel and choose a **target type**:
   - **Feishu Bitable** — write a record into a Feishu multi-dimensional table.
   - **Jira** — create an issue.
2. Fill in the connection details for the target (see below).
3. Use **Test delivery** to validate the configuration with a sample payload
   and attachment before saving.

### Feishu Bitable channel

| Field | Notes |
|-------|-------|
| App ID / App Secret | Feishu custom-app credentials |
| App Token type | `Bitable` (paste the App Token from the URL) or `Wiki` (paste the Wiki node token; the backend resolves the writable token automatically) |
| App Token / Wiki node token | Per the type above |
| Table name | Must match the Feishu table name exactly |
| Field mappings | Map Feishu column names (left) to internal fields (right) |
| Attachment field name | The Feishu column that receives attachments |

Common internal fields for mapping: `summary_title`, `summary_content`,
`llm_content`, `title`, `description`. Use `attachment_count` if you only need a
count rather than the files.

> **Permissions:** the Feishu app must have **write/edit** permission on the
> target table (and drive upload permission for attachments). If reads succeed
> but writes fail with a *forbidden* error, re-check the app's collaborator
> permission on the Wiki node / Bitable.

### Jira channel

Provide the Jira URL, credentials (username + API token), and the field
configuration (project key, issue type, priority, summary prefix, and
description handling).

### Delivery records & retry

The Relay page lists recent deliveries with their status. A failed delivery can
be **retried** from its record.

<!-- ![Relay channel editor](images/user-guide/relay.png) -->

---

## 6. TODOs

Action items extracted from conversations appear under **TODOs** (`/todos`),
including any deadlines detected during processing. Use this as a lightweight
follow-up list across all your conversations.

---

## 7. Account, billing & OAuth

- **Settings** (`/settings`) — profile and preferences.
- **Billing** (`/billing`) — credits balance and plan. Certain AI operations
  consume credits; the balance is shown here.
- **OAuth login** — if configured by an admin, you can sign in with Google. On
  first OAuth sign-in you complete a short account-binding step that links the
  external identity to your Devify account.

---

## 8. Management console (admin)

Administrators configure runtime settings from the management console (no longer
only Django Admin):

| Path | Purpose |
|------|---------|
| `/management/llm/config` | Provider credentials, models, defaults, connection testing |
| `/management/app-settings` | Global settings, Threadline model bindings, notification channels, Relay channel model bindings |
| `/management/threadline/config` | Threadline workflow model settings |
| `/management/threadline/periodic-tasks` | Scheduled tasks |
| `/management/notifier/channels` | Webhook and notification channels |
| `/management/notifier/settings` | Notification settings |
| `/management/billing/settings` | Billing runtime settings |

Typical first-time admin setup:

1. Add LLM providers under `/management/llm/config` and run the connection test.
2. Bind a multimodal model and a text model under `/management/app-settings` and
   `/management/threadline/config`.
3. (Optional) Configure notification channels and scheduled tasks.

Django Admin remains available for low-level inspection and legacy operations.

---

*Screenshots referenced above are placeholders — add captures from your own
instance as needed.*
