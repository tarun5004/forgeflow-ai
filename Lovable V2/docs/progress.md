# Implementation progress

The reference directory is read-only. Commits use actual timestamps.

Latest user direction: finish feature commits first; application tests and fixes are deferred. Earlier checks below are historical results, not verification of the final complete project.

| Feature | Verification | Result |
| --- | --- | --- |
| Project setup | Git scope, ignore policy and source snapshot | Started |
| feature/v2-auth-base | TypeScript build passed; HTTP liveness test passed; no database connection was mocked as live | Verified locally |
| feature/v2-auth-registration | Accepts account details, hashes passwords and returns a signed session. Verification: TypeScript build and 4 HTTP tests passed; persistence mocked. | Verified locally |
| feature/v2-auth-login | Verifies stored password hashes and returns a signed session; wrong passwords return 401. Build and 6 HTTP tests passed; persistence mocked. | Verified locally |
| feature/v2-auth-profile | Validates bearer tokens and returns only the signed-in user profile. Build and 8 HTTP tests passed; persistence mocked. | Verified locally |
| feature/v2-auth-refresh | Issues renewed sessions from refresh cookies. Build passed; five token/error regression cases reproduced failures. Fix and rerun deferred by user. | Known failures; fix deferred |
| docs: prioritize functional commits before verification | Complete the code in focused commits, then verify each feature and address confirmed defects separately. | Tests deferred by user |
| feat(auth): add logout and session revocation | Clear the refresh cookie and stored session hash when signing out; complete token response and persistence helpers. | Tests deferred by user |
| feat(projects): configure project persistence and HTTP service | Define project ownership and lifecycle states, connect MongoDB, and expose service status endpoints. | Tests deferred by user |
| feat(projects): add durable project event publishing | Initialize the AMQP channel and publish project lifecycle messages to durable queues. | Tests deferred by user |
| feat(projects): list projects for the authenticated owner | Validate bearer sessions and return the caller's projects ordered by creation time. | Tests deferred by user |
| feat(projects): create titled projects and announce them | Validate project titles, persist the owner relationship, and send project_created events for downstream AI records. | Tests deferred by user |
| feat(runtime): provision and remove Kubernetes project resources | Create the shared-volume Next.js, file API and sync pod plus its service; provide cleanup operations for lifecycle failures. | Tests deferred by user |
| feat(runtime): track preview activity in Redis | Refresh an expiring activity key and publish access events so runtime lifetime can follow actual traffic. | Tests deferred by user |
| feat(projects): launch owned project runtimes | Reserve the launching state, provision runtime resources, save the preview address, and clean up failed launches. | Tests deferred by user |
| feat(runtime): reclaim idle preview resources | Subscribe to Redis expiry events, coordinate teardown across replicas, and reset project runtime state after cleanup. | Tests deferred by user |
| feat(runtime): proxy preview and file service traffic | Route runtime hostnames to their Kubernetes services, cache proxy handlers, and invalidate them after idle teardown. | Tests deferred by user |
| feat(files): expose the runtime file tree | Walk the runtime folder, omit configured generated paths, and return a sorted project-relative file tree. | Tests deferred by user |
| feat(files): read selected runtime files | Parse requested filenames, resolve project-relative paths, and return UTF-8 contents through the file API. | Tests deferred by user |
| feat(files): create update and delete runtime files | Validate filename-to-content payloads, create parent directories, write files, and remove selected paths. | Tests deferred by user |
| feat(sync): add project-scoped S3 object storage | Configure the S3 client, project prefixes, file filters, bounded transfers, and object upload download list and delete operations. | Tests deferred by user |
| feat(sync): restore project files during runtime startup | Restore remote files when a project has saved objects; otherwise seed storage from the local runtime template. | Tests deferred by user |
| feat(sync): batch runtime file changes for persistence | Watch file changes with debounce and maximum-wait bounds, limit parallel uploads, batch deletions, and close the watcher on shutdown. | Tests deferred by user |
| feat(ai): configure persisted AI project service | Initialize project metadata storage, required provider configuration, centralized errors, and HTTP status endpoints. | Tests deferred by user |
| feat(ai): consume project creation events | Connect the message broker and create AI-side project records from project_created messages. | Tests deferred by user |
| feat(ai): manage conversations within owned projects | Authenticate callers, enforce project ownership, and create or list their conversations. | Tests deferred by user |
| feat(ai): return conversation message history | Persist user assistant and tool messages while exposing only readable user and assistant content to conversation owners. | Tests deferred by user |
| feat(ai): add runtime filesystem tools | Expose validated file-tree read create update and delete tools against the selected runtime file service. | Tests deferred by user |
| feat(ai): orchestrate the coding agent and conversation titles | Configure the Mistral agent with filesystem tools and project instructions; generate structured titles and stream agent messages. | Tests deferred by user |
| feat(ai): stream coding conversations over server-sent events | Resolve conversation ownership, persist prompts and tool results, and stream metadata tokens completion and errors to clients. | Tests deferred by user |
| feat(template): configure the Next.js runtime package | Define the runtime scripts, TypeScript lint and Tailwind configuration, and template editing guidance. | Tests deferred by user |
| feat(template): add the application layout and visual assets | Provide the root document, theme styles, font configuration, favicon and page illustration assets. | Tests deferred by user |
| feat(template): add the runtime starter page | Render the editable Next.js landing page with learning links and responsive light and dark layouts. | Tests deferred by user |
| build(template): package the preview development server | Install runtime dependencies in the container and expose the Next.js development server on port 3000. | Tests deferred by user |
| feat(frontend): add branded Vite application shell | Configure the Vite entrypoint, shared styles, visual assets, and branded application shell. | Tests deferred by user |
