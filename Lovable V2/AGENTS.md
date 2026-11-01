# Lovable V2 workflow

Use ../loveable-main as the read-only implementation reference. Preserve the service boundaries, APIs, stack, filenames, and all seven package lockfiles.

- Work in the existing outer Git repository; preserve history and use real timestamps. No push or cloud deployment.
- Latest user direction: finish all application code first in small functional commits. Tests, runtime verification, and bug fixes are a separate later phase.
- Commit messages describe the feature's behavior and purpose. Do not add source-provenance boilerplate or invented authorship/history.
- Direct commits on main are authorized; branches and local merge commits are optional. Preserve branches already created.
- Review exact staging paths, secrets, and diffs before each commit. Keep credentials, real .env files, artifacts, generated output, and runtime/user data ignored.
- Preserve known defects for the later feature-by-feature test/fix phase; document them honestly. Never label a deferred or failing check as passed.
- Disposable local infrastructure is authorized, but do not start more infrastructure or provider calls during the code-commit phase. One earlier authorized Mistral request returned HTTP 429; successful live inference is unverified.
- Record progress in docs/progress.md. Do not create .superpowers artifacts.
