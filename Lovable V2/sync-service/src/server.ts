import { bootstrap } from "./service/sync.service.js";

bootstrap().catch((error) => {
  console.error("[sync] bootstrap failed", error);
  process.exitCode = 1;
});
