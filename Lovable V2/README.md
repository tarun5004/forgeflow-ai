# ForgeFlow AI — Application Packages

AI-assisted coding workspace with React, TypeScript APIs, streaming conversations, Kubernetes project runtimes, and S3-backed file persistence.

Read the [project README](../README.md) for the architecture diagram, complete repository structure, service responsibilities, API overview, and local development setup.

- Seven independent npm packages retain separate manifests and lockfiles.
- `compose.local.yml` defines supporting local data services.
- `k8s/` and `skaffold-eks.yaml` contain deployment configuration.
- [Verification backlog](docs/verification-backlog.md): known issues and pending feature/integration checks.
- [Commit guide](docs/commit-guide.md): functional changes and their purposes.

Real environment files, generated output, local backups, and runtime data are excluded from Git. Full-system verification is still in progress.
