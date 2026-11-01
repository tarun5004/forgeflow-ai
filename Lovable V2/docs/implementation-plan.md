# Implementation plan

Build each slice on a dedicated `feature/v2-*` branch from current main. Commits describe work actually performed now, with the original implementation as reference. Verify the slice, review its diff, then merge locally. Do not stage incomplete later features.

1. Project setup and local data services.
2. Auth: application/model configuration, registration, login, access/profile, refresh rotation, logout. Fix reproduced token/error defects separately; retain existing contracts.
3. Projects: owned project metadata, project-created AMQP event, Kubernetes runtime lifecycle, authenticated runtime file proxy, Redis idle cleanup.
4. File API: safe path handling and file tree, reads, writes/deletes. Verify hostile paths and direct secret-file access.
5. Sync: S3 storage/bootstrap, watcher batching, upload recovery and shutdown flush.
6. AI: persisted project/conversations, broker ingestion, filesystem tools, real-provider streaming and history. Real calls wait for the user's key.
7. Next.js runtime: complete existing template and container integration.
8. Frontend: shell/session, registration/login pages, projects, file explorer/editor, conversations/chat, preview. Fix confirmed URL/contract defects.
9. Infrastructure: original manifests and reviewed reference assets, disposable local Kubernetes deployment and local S3-compatible storage support.
10. Build/check all packages; run local auth/project/broker/file/storage/preview/browser integration and provide video-ready localhost instructions. Report real-provider verification separately.

No additional application dependency is planned. Use Node's built-in test runner and existing package tools. A local Kubernetes CLI/container and data-service images are development infrastructure, not architecture replacements.
