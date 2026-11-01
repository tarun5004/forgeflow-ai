import path from "node:path";
import { WORK_FOLDER } from "../config/env.js";

export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

/** Converts an absolute path back to the "/app/page.tsx" style API path. */
export function toApiPath(absolutePath: string): string {
  return `/${path.relative(WORK_FOLDER, absolutePath).split(path.sep).join("/")}`;
}

