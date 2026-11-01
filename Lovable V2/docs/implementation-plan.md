# Implementation plan

Current phase: complete all seven packages and deployment configuration in small functional commits on main. The latest user instruction defers builds, tests, infrastructure execution, and bug fixes until all code is present. Earlier feature branches and history remain preserved.

1. Complete Auth endpoints and token persistence utilities.
2. Add Project configuration/model, event publishing, owned listing/creation, Kubernetes resources, runtime launch, Redis idle cleanup, and runtime proxying.
3. Add file tree, reads, writes, and deletion APIs.
4. Add S3 object operations, startup restore, and debounced filesystem synchronization.
5. Add AI configuration/models, broker events, conversations/history, filesystem tools, model orchestration, and SSE streaming.
6. Add Next.js setup, layout/assets, page, and container recipe.
7. Add frontend shell, session/forms, projects, file editor, conversations/chat, and preview.
8. Add deployment manifests, RBAC, sanitized secret templates, Skaffold, reviewed deployment notes, and local dependency configuration.
9. Verify file completeness, lockfile equality, credential exclusions, staging scope, and commit coverage. These are repository-integrity checks, not application tests.
10. Later, test each feature and fix confirmed defects in separate commits. Then run the local cross-service/browser flow when Docker resources and provider availability allow it.

No architecture rewrite or new application dependency is planned. Do not backdate, rewrite existing commits, push, or deploy cloud resources.
