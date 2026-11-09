import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export const UPLOAD_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR ?? "./uploads");

const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Only names we generated can be read or deleted. */
export const SAFE_NAME = /^[0-9a-f-]{36}\.(jpg|png|webp|avif)$/;

export function contentTypeFor(name: string) {
  const ext = name.split(".").pop();
  return Object.entries(TYPES).find(([, e]) => e === ext)?.[0] ?? "application/octet-stream";
}

export async function saveUpload(file: File) {
  const ext = TYPES[file.type];
  if (!ext) throw new Error("Use a JPEG, PNG, WebP or AVIF image.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Images must be 5 MB or smaller.");
  await mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(
    path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name),
    Buffer.from(await file.arrayBuffer()),
  );
  return name;
}

export async function deleteUpload(name: string) {
  if (!SAFE_NAME.test(name)) return;
  await unlink(path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name)).catch(() => {});
}
