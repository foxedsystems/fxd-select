import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const docsRoot = resolve(root, 'docs');
const docsDist = resolve(docsRoot, 'dist');
const rootDist = resolve(root, 'dist');

await mkdir(docsDist, { recursive: true });

await copyFile(resolve(rootDist, 'fxd-select.css'), resolve(docsDist, 'fxd-select.css'));
await copyFile(resolve(rootDist, 'fxd-select.esm.js'), resolve(docsDist, 'fxd-select.esm.js'));
await copyFile(resolve(rootDist, 'fxd-select.esm.min.js'), resolve(docsDist, 'fxd-select.esm.min.js'));
await copyFile(resolve(rootDist, 'fxd-select.umd.js'), resolve(docsDist, 'fxd-select.umd.js'));
await copyFile(resolve(rootDist, 'fxd-select.umd.min.js'), resolve(docsDist, 'fxd-select.umd.min.js'));
await copyFile(resolve(rootDist, 'fxd-select.esm.js.map'), resolve(docsDist, 'fxd-select.esm.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.esm.min.js.map'), resolve(docsDist, 'fxd-select.esm.min.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.umd.js.map'), resolve(docsDist, 'fxd-select.umd.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.umd.min.js.map'), resolve(docsDist, 'fxd-select.umd.min.js.map'));

await copyFile(resolve(rootDist, 'fxd-select.auto.esm.js'), resolve(docsDist, 'fxd-select.auto.esm.js'));
await copyFile(resolve(rootDist, 'fxd-select.auto.esm.min.js'), resolve(docsDist, 'fxd-select.auto.esm.min.js'));
await copyFile(resolve(rootDist, 'fxd-select.auto.umd.js'), resolve(docsDist, 'fxd-select.auto.umd.js'));
await copyFile(resolve(rootDist, 'fxd-select.auto.umd.min.js'), resolve(docsDist, 'fxd-select.auto.umd.min.js'));
await copyFile(resolve(rootDist, 'fxd-select.auto.esm.js.map'), resolve(docsDist, 'fxd-select.auto.esm.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.auto.esm.min.js.map'), resolve(docsDist, 'fxd-select.auto.esm.min.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.auto.umd.js.map'), resolve(docsDist, 'fxd-select.auto.umd.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.auto.umd.min.js.map'), resolve(docsDist, 'fxd-select.auto.umd.min.js.map'));
