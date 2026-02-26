# Contributing to Brand Style Generator

Thanks for your interest in contributing! This guide will help you get started.

Please note that this project is released with a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

> **Found a security vulnerability?** Please report it privately — see [SECURITY.md](SECURITY.md).

## Development Setup

1. Fork and clone the repo
2. Install dependencies: `pnpm install`
3. Copy the example env file: `cp .env.example .env.local`
4. Start the dev server: `pnpm dev`
5. Open [http://localhost:3000](http://localhost:3000)

The builder works fully without a backend — auth and project saving are optional.

### With Nhost Backend (optional)

To enable authentication and project saving locally:

```bash
nhost up   # starts PostgreSQL, Hasura, Auth + applies migrations
```

Set `NHOST_SUBDOMAIN=local` and `NHOST_REGION=local` in `.env.local`.

## Code Style

- **TypeScript** — strict mode, explicit type annotations
- **Tailwind CSS 4** — use design tokens from `globals.css`, not hardcoded values
- **pnpm** — never use npm or yarn
- **Lucide React** — only icon library allowed
- **No `NEXT_PUBLIC_` env vars** — expose via `next.config.ts` `env` block

### Type Conventions

- Explicit types on all variables, parameters, and return types
- `import type` for type-only imports
- Never use `any` — use `unknown` with type guards
- `=== undefined` for null checks, not truthy checks

## Making Changes

1. Create a branch from `main`: `git checkout -b feature/my-change`
2. Make your changes
3. Run type checking: `pnpm typecheck`
4. Run linting: `pnpm lint`
5. Test manually in the browser
6. Commit with a descriptive message
7. Push and open a Pull Request

## Commit Messages

Use clear, descriptive commit messages:

```
feat: add gradient support to color palette
fix: correct font weight mapping in brand guide
refactor: simplify export modal tab logic
docs: update README with deployment steps
```

## Pull Requests

- Keep PRs focused — one feature or fix per PR
- Describe what changed and why
- Link related issues
- Include screenshots for UI changes

## Reporting Issues

- Use the [bug report template](https://github.com/SchalaVentures/brand-style-generator/issues/new?template=bug_report.md)
- Include steps to reproduce
- Include browser and OS info
- Include screenshots if applicable

## Good First Issues

Look for issues labeled [`good first issue`](https://github.com/SchalaVentures/brand-style-generator/labels/good%20first%20issue) — these are great starting points for new contributors.
