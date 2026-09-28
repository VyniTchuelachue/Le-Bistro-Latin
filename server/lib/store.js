import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data');

// Tiny JSON-file collection. Writes are serialised through a promise chain so
// concurrent requests can't clobber each other. Good enough for a single
// restaurant; swap for a real database if traffic grows.
export function createCollection(name) {
  const file = path.join(DATA_DIR, `${name}.json`);
  let queue = Promise.resolve();

  async function readAll() {
    try {
      return JSON.parse(await readFile(file, 'utf8'));
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  async function writeAll(items) {
    await mkdir(DATA_DIR, { recursive: true });
    const tmp = `${file}.tmp`;
    await writeFile(tmp, JSON.stringify(items, null, 2));
    await rename(tmp, file);
  }

  function insert(data) {
    const record = { id: randomUUID(), createdAt: new Date().toISOString(), ...data };
    const run = queue.then(async () => {
      const items = await readAll();
      items.push(record);
      await writeAll(items);
      return record;
    });
    queue = run.catch(() => {});
    return run;
  }

  return { readAll, insert };
}
