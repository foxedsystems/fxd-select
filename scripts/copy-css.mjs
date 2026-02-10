import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const src = resolve(root, 'src', 'styles', 'fxd-select.css');
const dest = resolve(root, 'dist', 'fxd-select.css');

await mkdir(dirname(dest), { recursive: true });
await copyFile(src, dest);
