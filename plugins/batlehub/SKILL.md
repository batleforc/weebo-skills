---
name: batlehub
description: Use this skill to set up BatleHub (a self-hosted package registry proxy and cache) and batlehub-cli in a developer's project. Covers server installation via Docker Compose or source, config.toml generation, registry configuration (npm, Cargo, Go, PyPI, Maven, etc.), CLI installation and configuration, and per-package-manager proxy wiring.
user-invocable: true
---

Read `README.md` within this skill to become an expert on BatleHub before taking any action.

When the user invokes this skill, first determine their intent by asking **focused questions** (one message, not one-by-one):

1. **Goal**: Are they (a) setting up a new BatleHub server, (b) connecting their tooling to an existing BatleHub instance, or (c) both?
2. **Registries**: Which package managers do they want to proxy? (npm, Cargo, Go, PyPI, Maven, RubyGems, Composer, Terraform, Conda, GitHub, OpenVSX, VS Code Marketplace)
3. **Auth method** (server setup only): Token-based, OIDC, Kubernetes ServiceAccount, or GitHub Actions OIDC?
4. **Storage** (server setup only): Filesystem (dev/single-node) or S3-compatible (production)?
5. **Environment**: Local dev machine, Docker/Compose, or cloud/K8s?

Skip questions that are already answered by the user's message.

---

## What's here

- `README.md` — full reference: architecture, config.toml schema, CLI commands, env var overrides, verification steps.
- `templates/config.minimal.toml` — minimal dev config (filesystem storage, token auth, single npm registry).
- `templates/config.production.toml` — production template (PostgreSQL cache, S3 storage, OIDC auth, multiple registries).
- `templates/docker-compose.yml` — ready-to-use Compose file (PostgreSQL + BatleHub server).

---

## Setup playbook

### A — New server via Docker Compose (most common)

1. Copy `templates/docker-compose.yml` into the user's project directory.
2. Copy the appropriate `templates/config.*.toml` to `config.toml` and fill in secrets.
3. Run `podman compose up -d` (or `docker compose up -d`).
4. Verify with `curl http://localhost:8080/api/openapi.json`.

### B — New server from source

1. Ensure Rust 1.87+ is installed (`rustup update stable`).
2. `cargo build --release -p batlehub-server`
3. Copy and edit `config.toml`, then `./target/release/batlehub --config config.toml`.

### C — CLI only (connecting to existing server)

1. Install: `mise install batlehub-cli` OR `cargo install --git https://github.com/batleforc/batlehub batlehub-cli` OR download a pre-built binary from GitHub Releases.
2. `batlehub-cli config init` — enter the server URL and an API token.
3. `batlehub-cli auth whoami` — verify connectivity.

### D — Wire package managers to the proxy

Generate the appropriate snippet for each selected registry. Examples:

**npm** → `.npmrc` in the project root:
```
registry=http://<host>:8080/npm/<registry-name>/
//:<host>:8080/:_authToken=<token>
```

**Cargo** → `.cargo/config.toml`:
```toml
[source.crates-io]
replace-with = "batlehub"

[source."batlehub"]
registry = "sparse+http://<host>:8080/cargo/<registry-name>/"
```

**pip** → `pip.conf` or `pyproject.toml` `[tool.uv.sources]`:
```ini
[global]
index-url = http://<host>:8080/pypi/<registry-name>/simple/
```

**Go** → environment variable:
```bash
export GOPROXY=http://<host>:8080/go/<registry-name>/,direct
```

**Conda** → `.condarc` (project root or `~/.condarc`):
```yaml
channels:
  - http://<host>:8080/conda/<registry-name>/
  - defaults
```
With token auth, embed credentials in the URL:
```yaml
channels:
  - http://token:<token>@<host>:8080/conda/<registry-name>/
```
Or add to `~/.netrc`:
```
machine <host>
login token
password <token>
```

Always substitute `<host>`, `<port>`, `<registry-name>`, and `<token>` with the user's actual values.

---

## Quick config reference

| Section | Key fields |
|---|---|
| `[server]` | `port`, `bind`, `static_dir` |
| `[database]` | `url` (PostgreSQL DSN) |
| `[cache]` | `type` — `memory` / `postgres` / `redis` |
| `[auth]` | `type` — `token` / `oidc` / `kubernetes` / `github_actions` |
| `[storage]` | `type` — `filesystem` / `s3` / cloud variants |
| `[[registries]]` | `type`, `name`, `[rbac]` (anonymous/user/admin permissions) |

Environment variable override pattern: `PROXY_CACHE__<SECTION>__<FIELD>` (e.g. `PROXY_CACHE__DATABASE__URL`).

---

## Avoid

- Committing `config.toml` with real tokens to version control — always offer to add it to `.gitignore`.
- Using `memory` cache in production — it resets on restart.
- Omitting `[rbac]` on registries — it defaults to no anonymous access, which breaks unauthenticated tooling.
