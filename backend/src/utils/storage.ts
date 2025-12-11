import fs from "fs";

export function readJSON<T = unknown>(
  path: string,
  fallback: T = [] as unknown as T
): T {
  if (!fs.existsSync(path)) {
    return fallback;
  }

  const content = fs.readFileSync(path, "utf8");
  return JSON.parse(content) as T;
}

export function writeJSON(path: string, data: unknown): void {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
