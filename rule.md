# Mandatory Rules — Loveable Project

These rules are mandatory. If a requested action conflicts with them, explain the conflict and choose the safer valid action.

## A. Existing code is the only implementation source

1. The current extracted codebase is the source of truth.
2. Do not regenerate the project, scaffold a replacement, or rewrite working modules merely to make the history look different.
3. Do not copy code from external repositories, tutorials, websites, or unrelated projects.
4. Do not change the established stack or architecture. Preserve the existing services, APIs, message contracts, package boundaries, and deployment approach unless a confirmed defect requires a minimal change.
5. Do not add features, services, abstractions, dependencies, or tooling unrelated to fixing a proven defect or making the existing project verifiable.
6. Reuse existing implementations and conventions. Search the codebase before creating a new helper or duplicate implementation.
7. Preserve existing filenames, naming conventions, package manifests, and lockfiles unless a concrete issue requires a change.

## B. No fabricated Git history

1. Use real current commit timestamps and the configured Git author identity.
2. Never backdate commits, invent contributors, fabricate a sequence of historical development events, or claim pre-existing files were originally authored during this repository-import workflow.
3. Introduce existing code feature by feature in coherent commits. Commit messages and bodies must accurately describe repository introduction/integration; actual code fixes must be separate, accurately described commits.
4. Never split already-existing source files into artificial micro-commits just to simulate a longer coding timeline.
5. Never rewrite, erase, or replace an existing history. Preserve existing commits, tags, branches, and remotes unless the user explicitly authorizes a specific safe change.
6. Never force-push. Do not push or publish to a remote until the user explicitly asks.

## C. Git safety

1. Inspect `git status`, branch, root, remotes, refs, and history before any Git mutation.
2. Never create a nested repository or move/delete `.git` metadata without explicit approval.
3. Never use `git reset --hard`, `git clean -fd`, `git clean -fdx`, destructive checkout/restore, history-rewriting commands, or force-push as a routine workflow.
4. Never discard user changes or untracked files. If uncertain whether a file is user data, preserve it and ask.
5. Never use `git add .` or `git add -A` without a reviewed file list. Stage explicit paths only.
6. Before every commit, review staged filenames, staged diff, whitespace errors, secret candidates, and generated files.
7. Before each branch switch, ensure tracked changes are committed or safely preserved and verify untracked files will not be overwritten. In this workflow, not-yet-introduced service directories are expected untracked source; preserve them and do not require an entirely empty `git status`.
8. Create feature branches from the latest clean `main`. Do not reuse an existing branch name without inspecting it.
9. Merge only reviewed branches. Do not merge a branch with unresolved failures introduced by its changes. Known baseline failures and placeholder test scripts may be documented and treated separately; do not represent them as passing tests, and do not stop the entire workflow solely because a placeholder script intentionally fails. Ask the user before proceeding when a real unresolved failure affects correctness, security, data integrity, or safe integration.
10. Do not amend commits or rebase shared/published history.

## D. Secret and data protection

1. Never stage or commit real `.env` files, tokens, passwords, JWT secrets, API keys, private keys, certificates, kubeconfigs, cloud credentials, database dumps, user-generated runtime files, or production data.
2. Keep sanitized `.env.example` / sample configuration files when safe and useful. Do not put real values in examples.
3. Review HTML notes, YAML manifests, Dockerfiles, editor settings, and scripts for embedded credentials, account-specific values, absolute paths, or private infrastructure details before staging.
4. Do not print secrets in terminal output, reports, or commit messages. Redact values while reporting the file and type of issue.
5. If a possible real credential is detected, stop staging that file, report it redacted, and request direction. Do not assume a key-shaped string is harmless solely because it appears in documentation.
6. The user has authorized this Codex session to inspect and work on the checked-out project. Do not send source, secrets, or project data to any additional external service, website, plugin, remote, or third-party tool unless the user explicitly authorizes it. Do not push to a Git remote without separate approval.

## E. Bug-fix quality

1. Confirm a bug from source-level execution flow, a failing test, a reproducible local case, or reliable runtime evidence before changing code.
2. Understand callers, callees, data contracts, ownership boundaries, environment variables, and deployment configuration before editing a module.
3. Fix the root cause with the smallest safe change. Do not hide failures, weaken validation, remove authorization, swallow errors, or silently change API contracts to make checks pass.
4. Preserve backward compatibility unless the current contract is demonstrably broken and the impact is documented.
5. Add a focused regression test when the existing test setup supports it. Prefer existing dependencies and test conventions.
6. Do not add a new dependency or test framework without explaining why the current tools are insufficient and getting user approval.
7. Do not claim a test passed unless the command actually ran and exited successfully. Inspect package scripts before running them; report placeholder scripts, skipped tests, and environment blockers explicitly.
8. Do not claim security is fixed based only on code appearance; test the relevant access/path/ownership cases where possible.

## F. Runtime and infrastructure safety

1. Do not access real AWS, EKS, Kubernetes clusters, S3 buckets, ECR, RabbitMQ, MongoDB, Redis, DNS, or external AI APIs unless the user explicitly authorizes the specific environment and action.
2. Never deploy, delete cloud resources, rotate credentials, modify IAM/RBAC in a live environment, or incur paid usage without explicit approval.
3. Local static checks and disposable local test dependencies are preferred.
4. Do not create fake successful health checks or mark a service ready without verifying its actual readiness contract.
5. Do not weaken Kubernetes security, authentication, authorization, or network restrictions to make a demo work.

## G. Change scope and communication

1. Work only on the user's stated goal: bring existing code into Git feature by feature, identify/fix real bugs, and verify the project.
2. No cosmetic refactor, broad formatting sweep, unrelated documentation rewrite, UI redesign, or feature expansion.
3. Keep service-specific changes within the relevant service unless a cross-service contract requires coordinated changes. Explain coordinated changes.
4. If a finding is uncertain, report it as a hypothesis and investigate before editing.
5. If the root, Git state, secret status, or ownership of files is ambiguous, stop before risky actions and ask one focused question.
6. Be concise and factual. Give evidence: file paths, commands, test output summaries, commit hashes, and known limitations.