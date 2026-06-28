# BatleHub Setup Reference

**Source:** https://github.com/batleforc/batlehub

BatleHub is a self-hosted intelligent proxy and artifact cache that sits between developer tooling and upstream package registries. It downloads artifacts once from upstream and serves them locally on subsequent requests, while enforcing role-based access control. Supports 12 registry types: npm, Cargo, Go, Maven, Terraform, RubyGems, Composer, PyPI, Conda, GitHub, OpenVSX, and VS Code Marketplace.

---

## Architecture

```
Developer tool  ──►  BatleHub (HTTP proxy)  ──►  Upstream registry
                            │
                       PostgreSQL (metadata)
                       Filesystem / S3 (artifacts)
```

- **Server binary**: `batlehub-server` (Rust/actix-web)
- **Database**: PostgreSQL 15+ (required — no alternatives)
- **Artifact storage**: Filesystem or S3-compatible
- **Metadata cache**: in-memory (dev), PostgreSQL, or Redis
- **CLI**: `batlehub-cli` — separate binary for managing the server

---

## System Requirements

| Component | Minimum |
|---|---|
| Rust (build from source) | 1.87+ |
| Node.js (frontend only) | 24+ |
| PostgreSQL | 15+ (17 recommended) |
| Container runtime | Docker or Podman with Compose |

---

## Installation

### Option 1: Docker Compose (recommended)

```bash
git clone https://github.com/batleforc/batlehub
cd batlehub
cp config.example.toml config.toml
# Edit config.toml — set database URL and auth tokens
podman compose up -d   # or: docker compose up -d
```

Server starts on `http://localhost:8080` by default.

### Option 2: Build from source

```bash
# Install Rust if needed
curl https://sh.rustup.rs -sSf | sh
rustup update stable

# Build server
cargo build --release -p batlehub-server

# Optional: build frontend (Vue 3 + Tailwind)
cd ui && npm ci && npm run build && cd ..

# Run
./target/release/batlehub --config config.toml
```

---

## config.toml Reference

### [server]

```toml
[server]
port = 8080
bind = "0.0.0.0"
# static_dir = "./ui/dist"   # serve built frontend
```

### [database]

```toml
[database]
url = "postgresql://batlehub:changeme@localhost:5432/batlehub"
# max_connections = 10       # connection pool size (default: 10)
```

### [cache]

Controls metadata caching (not artifact storage).

```toml
[cache]
type = "memory"      # options: memory | postgres | redis
# url = "redis://localhost:6379"   # required if type = "redis"
```

- `memory` — fastest, resets on restart. Dev only.
- `postgres` — persists across restarts, uses the same DB.
- `redis` — best for multi-node HA deployments.

### [auth]

Supports multiple auth providers — list them all as `[[auth]]` blocks.

**Token auth (simplest):**
```toml
[[auth]]
type = "token"

[[auth.tokens]]
value = "my-secret-token"
role = "admin"
user_id = "admin"

[[auth.tokens]]
value = "read-only-token"
role = "user"
user_id = "ci-bot"
```

**OIDC (Authentik, Keycloak, etc.):**
```toml
[[auth]]
type = "oidc"
issuer = "https://auth.example.com/application/o/batlehub/"
client_id = "batlehub"
client_secret = "..."
```

**Kubernetes ServiceAccount:**
```toml
[[auth]]
type = "kubernetes"
```

**GitHub Actions OIDC:**
```toml
[[auth]]
type = "github_actions"
```

### [storage]

**Filesystem:**
```toml
[storage]
type = "filesystem"
path = "./cache"
```

**S3-compatible:**
```toml
[storage]
type = "s3"
bucket = "batlehub-artifacts"
region = "us-east-1"
endpoint = "https://s3.amazonaws.com"   # or MinIO endpoint
access_key_id = "..."
secret_access_key = "..."
```

### [[registries]]

Each registry is an `[[registries]]` block. The `name` field becomes the URL path segment.

```toml
[[registries]]
type = "npm"
name = "npm"

[registries.rbac]
anonymous = ["releases:read", "source:read"]
user      = ["releases:read", "source:read"]
admin     = ["*"]
```

**Supported `type` values:**
`npm`, `cargo`, `go`, `maven`, `terraform`, `rubygems`, `composer`, `pypi`, `conda`, `github`, `openvsx`, `vscode`

**RBAC permission strings:**
- `releases:read` — download packages
- `source:read` — read package metadata/source
- `releases:write` — publish packages
- `*` — all permissions

---

## Environment Variable Overrides

Any config key can be overridden with:

```
PROXY_CACHE__<SECTION>__<FIELD>=value
```

Examples:
```bash
PROXY_CACHE__DATABASE__URL="postgresql://..."
PROXY_CACHE__SERVER__PORT=9090
PROXY_CACHE__STORAGE__PATH="/data/cache"
```

Useful for secrets in container environments — keep `config.toml` secret-free and inject via env.

---

## CLI: batlehub-cli

### Installation

```bash
# Via mise (recommended)
mise install batlehub-cli

# Via cargo
cargo install --git https://github.com/batleforc/batlehub batlehub-cli

# Pre-built binary (Linux, macOS, Windows)
# Download from: https://github.com/batleforc/batlehub/releases
```

### Initial configuration

```bash
batlehub-cli config init   # prompts for server URL and token
batlehub-cli config show   # verify saved config (~/.config/batlehub/config.toml)
batlehub-cli auth whoami   # test connectivity
```

### Registry commands

```bash
batlehub-cli registry list          # list all accessible registries
batlehub-cli registry info <name>   # show registry details and RBAC
```

### Package commands

```bash
batlehub-cli package list                            # search cached packages
batlehub-cli package versions <registry> <name>      # show cached versions
batlehub-cli version yank   <registry> <name> <ver>  # mark version unavailable
batlehub-cli version unyank <registry> <name> <ver>  # reverse a yank
batlehub-cli version delete <registry> <name> <ver>  # permanently remove
batlehub-cli publish <file>                          # upload artifact (auto-detects format)
```

### Auth / token management

```bash
batlehub-cli auth token create <name>   # create a new API token
batlehub-cli auth token list            # list your tokens
batlehub-cli auth token revoke <id>     # revoke a token
```

### Admin commands

```bash
batlehub-cli admin quota              # monitor / reset user quotas
batlehub-cli admin ip-block           # manage IP restrictions
batlehub-cli admin cache              # clear/inspect artifact cache
batlehub-cli admin audit-log          # view audit trail
```

### Interactive TUI

```bash
batlehub-cli tui   # full-screen terminal UI for browsing and publishing
```

---

## Wiring package managers to the proxy

Replace `<host>`, `<port>`, `<registry-name>`, and `<token>` with actual values.

### npm / pnpm / yarn

`.npmrc` (project root or `~/.npmrc`):
```ini
registry=http://<host>:<port>/npm/<registry-name>/
//:<host>:<port>/:_authToken=<token>
```

For scoped packages:
```ini
@myorg:registry=http://<host>:<port>/npm/<registry-name>/
```

### Cargo

`.cargo/config.toml` (project root or `~/.cargo/config.toml`):
```toml
[source.crates-io]
replace-with = "batlehub"

[source.batlehub]
registry = "sparse+http://<host>:<port>/cargo/<registry-name>/"
```

With auth (`~/.cargo/credentials.toml`):
```toml
[registry.batlehub]
token = "<token>"
```

### pip / uv

`pip.conf` (`~/.config/pip/pip.conf` or project `pip.conf`):
```ini
[global]
index-url = http://<host>:<port>/pypi/<registry-name>/simple/
extra-index-url = https://pypi.org/simple/
```

`pyproject.toml` (uv):
```toml
[tool.uv]
index-url = "http://<host>:<port>/pypi/<registry-name>/simple/"
```

### Go

```bash
export GOPROXY="http://<host>:<port>/go/<registry-name>/,direct"
export GONOSUMCHECK="*"    # if running without sum database
```

Or in `go.env`:
```
GOPROXY=http://<host>:<port>/go/<registry-name>/,direct
```

### Conda

`.condarc` (project root or `~/.condarc`):
```yaml
channels:
  - http://<host>:<port>/conda/<registry-name>/
  - defaults
```

With token auth — embed credentials in the channel URL:
```yaml
channels:
  - http://token:<token>@<host>:<port>/conda/<registry-name>/
  - defaults
```

Or use `~/.netrc` (avoids storing the token in `.condarc`):
```
machine <host>
login token
password <token>
```

Verify the channel is reachable:
```bash
conda search --channel http://<host>:<port>/conda/<registry-name>/ numpy
```

### Maven

`~/.m2/settings.xml`:
```xml
<settings>
  <mirrors>
    <mirror>
      <id>batlehub</id>
      <url>http://<host>:<port>/maven/<registry-name>/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  <servers>
    <server>
      <id>batlehub</id>
      <username>token</username>
      <password><token></password>
    </server>
  </servers>
</settings>
```

---

## Verification

After starting the server:

```bash
# Check the API is alive
curl http://localhost:8080/api/openapi.json

# List registries (authenticated)
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/v1/registries

# Swagger UI (if frontend built)
open http://localhost:8080/swagger-ui/
```

With the CLI:
```bash
batlehub-cli auth whoami
batlehub-cli registry list
```

---

## Security notes

- Never commit `config.toml` with real tokens — add it to `.gitignore` and use environment variable overrides in CI/CD.
- RBAC defaults vary by registry — always explicitly set `[rbac]` to avoid unintended anonymous access.
- For production: use `postgres` or `redis` cache (not `memory`), TLS termination in front of the server, and scoped tokens per service.
- Rotate tokens via `batlehub-cli auth token revoke` + create a new token — do not reuse.

---

## Useful links

- Repository: https://github.com/batleforc/batlehub
- Swagger UI: `http://<host>:<port>/swagger-ui/` (after server starts)
- Runtime API spec: `http://<host>:<port>/api/openapi.json`
