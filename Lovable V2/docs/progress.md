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
