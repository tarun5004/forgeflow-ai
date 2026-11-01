# Feature commit guide

All entries below use actual commit timestamps. Earlier commits and branches are preserved. Application tests are deferred.

| Commit | Feature or purpose |
| --- | --- |
| `e80ced6` | docs: prioritize functional commits before verification |
| `bd23dd4` | feat(auth): add logout and session revocation |
| `69ad257` | feat(projects): configure project persistence and HTTP service |
| `ef9076b` | feat(projects): add durable project event publishing |
| `7f13136` | feat(projects): list projects for the authenticated owner |
| `a7910c5` | feat(projects): create titled projects and announce them |
| `5f878a6` | feat(runtime): provision and remove Kubernetes project resources |
| `b8463c6` | feat(runtime): track preview activity in Redis |
| `f5fdb76` | feat(projects): launch owned project runtimes |
| `fb9c21f` | feat(runtime): reclaim idle preview resources |
| `b9d393b` | feat(runtime): proxy preview and file service traffic |
| `ccd5ac6` | feat(files): expose the runtime file tree |
| `a0b3d76` | feat(files): read selected runtime files |
| `8dc5569` | feat(files): create update and delete runtime files |
| `985e4a3` | feat(sync): add project-scoped S3 object storage |
| `3d188d1` | feat(sync): restore project files during runtime startup |
| `c8c1d01` | feat(sync): batch runtime file changes for persistence |
| `0771cd7` | feat(ai): configure persisted AI project service |
| `2c8e01f` | feat(ai): consume project creation events |
| `04a1df8` | feat(ai): manage conversations within owned projects |
| `f19b6c3` | feat(ai): return conversation message history |
| `f00ebc1` | feat(ai): add runtime filesystem tools |
| `ac159f8` | feat(ai): orchestrate the coding agent and conversation titles |
| `8d045d5` | feat(ai): stream coding conversations over server-sent events |
| `cb30b58` | feat(template): configure the Next.js runtime package |
| `96e1247` | feat(template): add the application layout and visual assets |
| `606b88e` | feat(template): add the runtime starter page |
| `17ed2da` | build(template): package the preview development server |
| `a77ef4b` | feat(frontend): add branded Vite application shell |
| `758cdc5` | feat(frontend): add registration and session login flows |
| `aa5deb6` | feat(frontend): add project creation and runtime navigation |
| `d7a6ec4` | feat(frontend): add runtime file explorer and editor operations |
| `56cf5d8` | feat(frontend): add conversation history and streaming chat |
| `db6165b` | feat(frontend): add integrated runtime preview controls |
| `bfcf83f` | build(k8s): configure the auth service deployment |
| `a27d725` | build(k8s): configure the project service deployment |
| `7e3bd83` | build(k8s): configure the ai service deployment |
| `a987e7a` | build(k8s): connect ingress runtime permissions and secret templates |
| `3d79236` | build: configure service image and manifest orchestration |
| `30523e7` | docs: add deployment guidance and system diagram |
| `519cb2e` | build(local): configure isolated demo data services |
| `214f285` | build(auth): retain the exact dependency lockfile |

Earlier Auth setup, registration, login, profile, and refresh commits are recorded in docs/progress.md and the Git log.
