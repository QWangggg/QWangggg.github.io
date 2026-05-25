# AI Coding Skill Workflow Platform

A personal AI Coding Skill workflow platform built with React, TypeScript, UmiJS, and Ant Design.

## Current MVP

- Search-first homepage for describing a current task, blocker, or question
- Secondary scenario entry for narrowing from common AI Coding flows
- Results page that helps judge which Skill is worth opening
- Skill detail page with full usage information and lightweight history
- Manual create/edit flow backed by browser-side persistence

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:8000`.

### Build for Production

```bash
npm run build
```

## Project Structure

```text
.
|-- STRATEGY.md
|-- docs/
|   |-- brainstorms/
|   `-- plans/
|-- src/
|   |-- features/skills/         # Skill data model, storage, search
|   |-- layouts/                 # Shared app shell
|   `-- pages/                   # Home, results, detail, manage
`-- .umirc.ts                    # Umi routes and app config
```

## Notes

- MVP intentionally excludes backend, permissions, auto-import, and auto-recommendation.
- Skill data is persisted in browser `localStorage` for the current single-user workflow.
