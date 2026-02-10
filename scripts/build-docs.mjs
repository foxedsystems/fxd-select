import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const demoSrc = resolve(root, 'demo', 'index.html');
const docsRoot = resolve(root, 'docs');
const docsIndex = resolve(docsRoot, 'index.html');
const docsDist = resolve(docsRoot, 'dist');
const rootDist = resolve(root, 'dist');

await mkdir(docsDist, { recursive: true });

const html = await readFile(demoSrc, 'utf8');
const rewritten = html.replace(/\.\.\/dist\//g, './dist/');
await writeFile(docsIndex, rewritten);

await copyFile(resolve(rootDist, 'fxd-select.css'), resolve(docsDist, 'fxd-select.css'));
await copyFile(resolve(rootDist, 'fxd-select.esm.js'), resolve(docsDist, 'fxd-select.esm.js'));
await copyFile(resolve(rootDist, 'fxd-select.esm.min.js'), resolve(docsDist, 'fxd-select.esm.min.js'));
await copyFile(resolve(rootDist, 'fxd-select.umd.js'), resolve(docsDist, 'fxd-select.umd.js'));
await copyFile(resolve(rootDist, 'fxd-select.umd.min.js'), resolve(docsDist, 'fxd-select.umd.min.js'));
await copyFile(resolve(rootDist, 'fxd-select.esm.js.map'), resolve(docsDist, 'fxd-select.esm.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.esm.min.js.map'), resolve(docsDist, 'fxd-select.esm.min.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.umd.js.map'), resolve(docsDist, 'fxd-select.umd.js.map'));
await copyFile(resolve(rootDist, 'fxd-select.umd.min.js.map'), resolve(docsDist, 'fxd-select.umd.min.js.map'));
