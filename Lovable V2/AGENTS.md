# Lovable V2 workflow

The latest user instruction authorizes reconstructing every existing service, frontend and local deployment in this folder, using ../loveable-main as the read-only implementation reference. This overrides the older whole-service import granularity and previous Auth-only stop point.

- Use the existing outer Git repository and preserve all earlier history. No nested repository or remote push.
- Build functional slices: setup, then registration, login, refresh, logout, profile, project creation/events/runtime, file operations, sync, AI conversations/tools/streaming, template, frontend flows, local infrastructure.
- Each functional feature gets a new feature/v2-* branch from current main, implementation and checks, accurate current-time commits, then a reviewed local merge.
- Keep small confirmed bug fixes in separate commits. Preserve stack and API contracts; avoid unnecessary abstractions and production-scale additions.
- Preserve all seven lockfiles; exclude real environment files, credentials, generated output and user/runtime data.
- Local disposable Docker/Kubernetes/MongoDB/RabbitMQ/Redis/S3-compatible services are authorized. Do not use cloud infrastructure or real AI calls until a key and authorization are supplied.
- Record actual checks and limits in docs/progress.md. Do not create .superpowers artifacts. Never claim mocked checks are live integrations.
