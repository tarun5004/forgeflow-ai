# Deferred feature verification

The user requested finishing all code commits before testing and fixing features. No new package build, lint, application test, container startup, or model request was started during this commit-first phase.

## Known findings to verify and fix separately

1. Auth: earlier HTTP regression checks reproduced five failing cases involving refresh-token uniqueness/replay, concurrent rotation, revocation races, invalid JWT status handling, and malformed JSON. Password hashing and token behavior remain unchanged in this phase. Keep fixes separate from feature commits.
2. File API: earlier isolated checks reproduced access to protected files, symlink escapes, and workspace-root deletion. The original behavior remains pending the dedicated test/fix phase; do not expose the runtime file gateway publicly.
3. Sync: earlier isolated checks reproduced lost pending changes after upload errors, incomplete shutdown draining, and unhandled per-object delete errors. Retest the committed version before applying the prepared narrow fixes. Review all .env variants and path handling.
4. Frontend: the runtime file URL and bearer-token path need the recorded focused regression checks before the routing fix is applied.
5. Cross-service source audit leads: broker acknowledgement timing/idempotency; project-save versus publish failure; runtime readiness; file-proxy ownership and JSON forwarding; provider port configuration; tracing defaults; storage startup ordering. These have not all been runtime verified.

## Verification sequence

1. Auth build and endpoint regressions, then local Mongo integration; address confirmed token/error/logout defects in focused fix commits.
2. Project ownership and create/list contracts; RabbitMQ project_created ingestion and duplicate/failure behavior.
3. File APIs against a temporary runtime directory; protected paths, symlinks, and root-operation regressions.
4. Sync restore/upload/change/delete/retry/shutdown behavior against local S3-compatible storage. Add the optional endpoint adapter separately when testing local storage.
5. AI conversation ownership/history/tool/SSE checks. Provider fixtures are tests, not evidence of successful real generation.
6. Next.js package build, frontend lint/build, browser auth/project/editor/chat/preview flows, and API contract alignment.
7. Local Kubernetes runtime lifecycle and cleanup, then the complete browser-to-storage flow suitable for the demo recording.

## Environment limits

- Local Compose configuration and ignored environment setup are committed. No deployment was performed in this phase. The Kubernetes manifests and image references still require the later localhost configuration pass.
- Earlier local infrastructure work encountered severe host-memory pressure and Docker HTTP 500/timeouts. RabbitMQ readiness and the complete dependency stack are unverified; no kind cluster was completed. Existing unrelated containers were preserved.
- The one previously authorized real Mistral request returned HTTP 429. Successful inference and generated-code execution are unverified. Do not make further provider calls without fresh authorization.
- No cloud deployment or remote push is authorized.
