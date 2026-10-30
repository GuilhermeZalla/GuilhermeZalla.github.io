import { mkdir, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
await mkdir(new URL('.asset-work/', root), { recursive: true });
await mkdir(new URL('docs/references/', root), { recursive: true });
await mkdir(new URL('public/projects/', root), { recursive: true });
const photo = 'https://media.licdn.com/dms/image/v2/C4E03AQGn8wA6ucUvYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1654802796551?e=1795046400&v=beta&t=mnLaMY7AadOlSCsFVx5Q7vQX-f7UW8lFYr9SOgh0Eb0';
const jobs = [
  ['portrait', photo, '.asset-work/portrait-source'],
  ['pixelrank', 'https://raw.githubusercontent.com/GuilhermeZalla/pixel-rank-app/refs/heads/main/docs/screenshots/home-desktop.png', '.asset-work/pixelrank.png'],
  ['movieslib', 'https://raw.githubusercontent.com/GuilhermeZalla/react-movieslib/refs/heads/main/docs/screenshots/home-desktop.png', '.asset-work/movieslib.png'],
  ['sneakers', 'https://raw.githubusercontent.com/GuilhermeZalla/sneakers-store/refs/heads/main/docs/screenshots/home-desktop.png', '.asset-work/sneakers.png'],
  ['saldoa', 'https://raw.githubusercontent.com/GuilhermeZalla/react-saldoa-app/main/docs/images/home.gif', '.asset-work/saldoa.gif'],
];
const repositories = { saldoa: 'react-saldoa-app', pixelrank: 'pixel-rank-app', sneakers: 'sneakers-store', movieslib: 'react-movieslib' };
const results = [];
await Promise.all(jobs.map(async ([id, source, file]) => {
  try {
    const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!response.headers.get('content-type')?.startsWith('image/')) throw new Error('Response is not an image');
    await writeFile(new URL(file, root), bytes);
    results.push({ id, source, file, bytes: bytes.length, contentType: response.headers.get('content-type') });
    console.log(`Downloaded ${id}: ${bytes.length} bytes`);
  } catch (error) { results.push({ id, source, error: error.message }); console.log(`Unavailable ${id}: ${error.message}`); }
}));
await Promise.all(Object.entries(repositories).map(async ([id, repository]) => {
  for (const [filename, destination] of [
    ['README.md', `docs/references/${id}-README.md`],
    ['docs/STATUS.md', `docs/references/${id}-STATUS.md`],
  ]) {
    const source = `https://raw.githubusercontent.com/GuilhermeZalla/${repository}/main/${filename}`;
    const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
    if (response.ok) { await writeFile(new URL(destination, root), await response.text()); console.log(`Saved ${id} ${filename}`); }
    else console.log(`Missing ${id} ${filename}: HTTP ${response.status}`);
  }
}));
await writeFile(new URL('docs/references/imported-assets.json', root), `${JSON.stringify(results, null, 2)}\n`);
