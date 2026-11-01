# Codex Repository Entry Instructions

This repository uses two additional project instruction files. Before inspecting, planning, or changing code, read both files completely:

1. `agent.md` — project context, workflow, component order, and required execution process.
2. `rule.md` — mandatory constraints for source changes, Git operations, security, testing, commits, and reporting.

Treat both files as repository-level instructions. If either file is missing or unreadable, stop and tell the user rather than guessing.

The existing source tree is the source of truth. Do not redesign or regenerate the application. Follow the staged, feature-by-feature repository workflow in `agent.md`, while obeying every constraint in `rule.md`.