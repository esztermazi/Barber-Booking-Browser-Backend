import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readJSON, writeJSON } from "./storage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_FILE = path.join(__dirname, "test.json");

describe("storage utils", () => {
  afterEach(() => {
    if (fs.existsSync(TEST_FILE)) {
      fs.unlinkSync(TEST_FILE);
    }
  });

  test("returns fallback if file does not exist", () => {
    const result = readJSON(TEST_FILE, []);
    expect(result).toEqual([]);
  });

  test("writes and reads JSON correctly", () => {
    const data = { name: "Test" };
    writeJSON(TEST_FILE, data);

    const result = readJSON(TEST_FILE, {});
    expect(result).toEqual(data);
  });
});
