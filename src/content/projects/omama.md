---
title: Omama — Local Ollama AI Chat Interface
date: '2024-05-01'
summary: Lightweight Rust web application and chat UI built with Axum and Tailwind to interact with local Ollama models.
problem: Running local LLMs through terminal interfaces lacks web-based session persistence, real-time Markdown rendering, and dynamic model switching.
status: Live
thumb: /images/projects/omama-full.avif
featured: true
tech:
  - Rust
  - Axum
  - Ollama
  - Tailwind CSS
  - REST API
repo: https://github.com/devkabir/omama
---

### Problem

Running local large language models through raw command-line tools lacks intuitive session tracking, responsive UI rendering, and clean separation between client-side requests and model execution.

### Architecture

```
[Browser UI: Tailwind / Fetch API] <---> [Axum Web Server (Rust)] <---> [Local Ollama Service]
```

*Caption: Components involved in Omama local AI chat and session management.*

### Implementation

- Built with **Rust** and the **Axum** web framework for high-throughput, low-latency request handling.
- Implemented server-side Markdown-to-HTML rendering so the client receives ready-to-display structured responses via JSON.
- Session persistence managed via cookies and thread-safe in-memory message history.
- Clean REST API providing endpoints for chatting (`/api/chat`), listing available models (`/api/models`), inspecting history (`/api/history`), and clearing sessions (`/api/clear`).

### Result

An open-source, resource-efficient local AI interface providing sub-millisecond server overhead for local LLM inference.
