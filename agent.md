# Agent Operating Plan — Loveable Monorepo

## 1. Role

Act as a senior software engineer, repository maintainer, and careful Git operator. Your job is to bring the user's already-written project into a clean, reviewable Git repository feature by feature, identify and fix confirmed defects in that existing implementation, and verify the integrated result.

Do not behave as a greenfield code generator. The complete application already exists in the working tree. Use it as the sole implementation source.

## 2. Project context

The **source root** is the directory containing these existing components. In the inspected layout it is `loveable-main/`, one level below the actual Git root. Do not assume the Git root and source root are the same; verify both from the filesystem and Git commands before acting.


- `auth-service/` — Express + TypeScript authentication API, MongoDB/Mongoose, JWT.
- `project-service/` — project lifecycle, Kubernetes runtime management, Redis activity/idle handling, AMQP/RabbitMQ publishing, preview and runtime-file proxying.
- `ai-service/` — Express + TypeScript AI API, conversations/messages, LangChain/LangGraph, Mistral integration, file-editing agent, AMQP/RabbitMQ consumer.
- `express-file-server/` — runtime file tree/read/create/update/delete API.
- `sync-service/` — runtime filesystem ↔ S3 persistence and file watching.
- `frontend/` — React + Vite workspace, authentication, project UI, editor, chat, preview, and API clients.
- `nextjs-boilerplate/` — Next.js template copied into project runtimes.
- `k8s/` — Kubernetes Deployments, Services, ingress, RBAC, and example secret manifest.
- `skaffold-eks.yaml`, `loveable.excalidraw`, and the supplied HTML deployment/reference documents.

There are seven independent npm packages, each with its own manifest and lockfile. There is no established root npm workspace. Preserve that arrangement unless a proven defect makes a minimal change necessary.

## 3. Mission

Complete these outcomes:

1. Inspect the real Git root, current branch, commits, refs, remotes, working tree, ignored files, and the actual source-tree root.
2. Protect the existing code and detect secrets or machine-specific files before staging.
3. Establish or preserve `main` safely.
4. Introduce the already-existing code into Git in coherent, service/feature-sized increments, using short-lived feature branches and merging each verified branch into `main`.
5. Identify concrete defects by reading and tracing the existing implementation—not by guessing from filenames or audit summaries.
6. Fix confirmed bugs with focused changes and regression checks.
7. Verify the individual packages and the important cross-service flows as far as the available local environment allows.
8. Provide an evidence-based final report: commits, branches, tests/builds actually run, fixes made, known gaps, and anything not verified.

## 4. Mandatory working method

### Phase A — Preflight, read-only

- Read `AGENTS.md`, `agent.md`, and `rule.md` fully.
- Run Git inspection commands before changing anything: `git rev-parse --show-toplevel`, `git status --short --branch`, `git branch --all`, `git log --oneline --decorate -10`, `git remote -v`, and inspect `.gitignore` / local excludes.
- Establish whether `.git` is at the actual project root or at a parent workspace. Do not create a nested repository and do not move/delete any `.git` directory.
- Find all nested `.git` directories, existing `AGENTS.md` / overrides, package manifests, lockfiles, `.env*`, credential-like files, generated directories, and user-specific editor settings.
- If an existing remote, commit, tag, or non-empty history is present, preserve it. Never overwrite or replace an existing history.
- If Git state or project root is ambiguous, report the exact paths and stop before any Git mutation.

### Phase B — Git hygiene and safe start

- Review existing ignore rules before changing them. Add only minimal missing protections for real secrets, local environment files, credentials, kubeconfigs, private keys, logs, caches, dependency folders, build outputs, coverage, and runtime/user project data.
- Keep sanitized environment templates (for example `.env.example`) tracked. Review parent and nested ignore-rule interactions so examples are not accidentally excluded.
- Keep all seven package lockfiles. Do not regenerate or normalize lockfiles without a demonstrated need.
- Inspect machine-specific files such as absolute-path VS Code settings. Do not commit another machine's local settings unchanged; preserve user content and explain any proposed exclusion or sanitization.
- Inspect all staged candidate files for secrets and generated data. Never use `git add .` or `git add -A` as a shortcut.
- If there is no commit history, create one minimal, honest repository-governance starting commit on `main` only after reviewing the exact staged files. Include the three instruction files (`AGENTS.md`, `agent.md`, `rule.md`) at the actual Git root and the root `.gitignore` only if needed. Do not include application/service source in this setup commit. Do not create an empty commit.

### Phase C — Feature-wise source introduction

Use the actual directories and files in the working tree. Do not recreate source files from memory. Stage explicit paths only. Keep each feature commit internally coherent (for example, its source, package manifest, lockfile, TypeScript configuration, and relevant Dockerfile together).

Recommended dependency-aware order:

1. `feature/auth-service` — `auth-service/`
2. `feature/express-file-server` — `express-file-server/`
3. `feature/sync-service` — `sync-service/`
4. `feature/project-service` — `project-service/`
5. `feature/ai-service` — `ai-service/`
6. `feature/nextjs-runtime` — `nextjs-boilerplate/`
7. `feature/frontend` — `frontend/`
8. `feature/kubernetes-infra` — `k8s/`, `skaffold-eks.yaml`, and related deployment/reference assets after reviewing them for secrets and machine-specific content.

Before creating each branch:

- Confirm `main` contains the previously merged work and has no modified or staged tracked files. The other extracted service directories that have not yet been introduced are expected to remain untracked in the working tree. Record that expected-untracked inventory once; do not mistake it for user edits, do not stage it early, and do not require `git status` to be completely empty.
- Confirm the branch name is unused. Never reset or reuse an existing branch without inspection.
- Create a short-lived branch from the current `main`.
- Review the exact files belonging to that feature and identify its actual dependencies/contracts.
- Stage only those explicit paths; inspect `git diff --cached --stat`, `git diff --cached --check`, and the complete staged diff.
- Make one coherent source-introduction commit for the feature. Do not split pre-existing files into artificial file-by-file commits to imply that they were authored at different times.
- Run the relevant existing checks for that package. Record failures accurately. Fix a confirmed defect in a separate, focused fix commit on the same branch (or a dedicated fix branch when cross-cutting).
- Merge the branch into `main` only after review and verification. Prefer a non-fast-forward merge when it preserves a useful feature-branch boundary and the repository state permits it.
- After each merge, confirm there are no modified or staged tracked files. The not-yet-introduced source directories may still appear as expected untracked paths; preserve them and continue. Never delete, stash, or bulk-stage them just to make `git status` appear clean.

If a branch cannot be safely verified or merged, stop that branch, report the blocker, and do not hide the failure by weakening checks.

### Phase D — Existing-code audit and bug fixing

After the component introduction, trace each issue through the actual caller, callee, configuration, and deployment path before changing code. Audit at least:

- Auth token issuance, refresh/logout behavior, shared JWT verification configuration, and ownership checks.
- Project creation and the `project_created` RabbitMQ/AMQP event contract with AI Service.
- RabbitMQ consumer acknowledgement, async processing completion, retries/requeue/dead-letter behavior if configured, and duplicate/idempotency handling.
- Project save versus event publish failure behavior; avoid introducing a new distributed transaction system unless the existing implementation demonstrably requires it and the user approves the scope.
- Kubernetes Pod/Service lifecycle, readiness versus resource creation, cleanup, RBAC permissions, runtime ID ownership, and preview/file proxy routing.
- File-server authorization boundary, path containment, symlink traversal, direct-file access versus file-tree filtering, and runtime hostname/ingress routing.
- Sync watcher queue/buffer behavior, upload failure recovery, startup restore, shutdown flush, S3 prefix isolation, and environment-file exclusions.
- Frontend runtime file URL construction, API authentication behavior, SSE cancellation/timeouts, and refresh-token retry behavior.
- Environment configuration consistency between Dockerfiles, Kubernetes manifests, Skaffold, and service code.

Known audit leads to verify against source before fixing (not assumptions to copy blindly):

- Runtime file requests may bypass authentication at the project proxy/file-server boundary.
- Lexical path checks may not prevent symlink escapes.
- The AI RabbitMQ consumer may acknowledge before its async database work completes.
- Sync may clear pending changes before S3 upload succeeds and may fail to flush on shutdown.
- The frontend runtime file URL may be relative or bypass the intended project-service proxy.
- Runtime status may be set to `running` before the application is actually ready.
- LangSmith tracing may be enabled by default and could expose prompt/code data.

For each confirmed issue:

1. Explain the actual failure path and its impact.
2. Make the smallest robust fix consistent with the existing design.
3. Add or update a focused regression test using existing tooling where possible.
4. Run the targeted test and relevant package check.
5. Commit the fix separately with an accurate message.

Do not implement speculative fixes for findings that cannot be reproduced or supported by source evidence. Report uncertainty explicitly.

### Phase E — Integration verification

Verify what can run locally without inventing external infrastructure. At minimum inspect and, where available, run package scripts/builds for all seven packages. If dependencies are absent, use `npm ci` inside the relevant package only when installation is needed and permitted; rely on the existing lockfile, do not use `npm install`, and do not update manifests or lockfiles. Run checks sequentially if resource limits make parallel installs/builds risky. If network access or installation is unavailable, report the blocker rather than changing dependencies.

The initial audit found placeholder test scripts in three services. Inspect each `test` script before interpreting its result. A known placeholder failure (for example, a script that deliberately exits with status 1 because no test suite exists) is not a newly discovered product regression. Record it accurately and continue with build/typecheck/lint and source-level verification where safe. Stop only for an actual unresolved safety, integrity, or integration blocker—not merely because a placeholder test script fails.

Trace the main end-to-end contract:

`Frontend auth → Auth Service → Project Service → project_created event → AI Service project record → runtime Pod/Service → file API → AI file tool → shared runtime volume → S3 persistence/restore → preview proxy → idle cleanup`.

Distinguish clearly between:

- static source inspection;
- package-level lint/typecheck/build/test results;
- integration tests using local dependencies;
- real cloud/Kubernetes/Mistral/S3 verification.

Never claim live integration, security, or production readiness unless it was actually tested in the corresponding environment.

## 5. Git branch and commit conventions

Use `main` as the integration branch. Use the feature branch names listed above, or a clear `feature/<component>` equivalent if a name already exists.

Commit messages should be concise and accurate. For existing code being introduced into this repository, use wording such as:

- `feat(auth-service): add authentication service source`
- `feat(project-service): add project lifecycle service source`
- `feat(ai-service): add AI agent and broker integration source`

The commit body must not claim that these files were newly authored during the commit if they already existed in the working tree. Actual defect fixes can use messages such as `fix(sync-service): retain pending changes after upload failure`.

Use the configured local Git identity; do not change global Git identity. Use actual commit timestamps. Do not fabricate authors, dates, development milestones, or original chronology.

## 6. Reporting

After every feature branch, report briefly:

- branch name;
- exact directories/files included;
- commit hash and message;
- checks actually run and their results;
- merge result;
- unresolved issue/blocker.

At completion, report the branch/commit graph, all confirmed fixes, package check matrix, integration verification limits, and remaining risks. Do not call the project production-ready merely because commits were created.