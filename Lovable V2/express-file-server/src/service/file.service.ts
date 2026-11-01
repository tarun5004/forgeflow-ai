import fs from "node:fs/promises";
import path from "node:path";
import { IGNORED_DIRS, IGNORED_FILES, WORK_FOLDER } from "../config/env.js";
import { toApiPath } from "../utils/path.util.js";

export async function getFileTree(): Promise<string[]> {
  const files: string[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const absolute = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (IGNORED_DIRS.has(entry.name)) continue;
        await walk(absolute);
      } else if (entry.isFile()) {
        if (IGNORED_FILES.has(entry.name)) continue;
        files.push(toApiPath(absolute));
      }
    }
  }

  await walk(WORK_FOLDER);
  return files.sort();
}

