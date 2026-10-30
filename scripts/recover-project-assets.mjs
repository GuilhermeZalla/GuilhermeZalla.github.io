import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const dataPath = new URL('../src/assets/json/projects.json', import.meta.url);
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const outputDirectory = new URL('../public/projects/', import.meta.url);
await mkdir(outputDirectory, { recursive: true });
await mkdir(new URL('../docs/', import.meta.url), { recursive: true });
const results = [];
for (let offset = 0; offset < data.projects.length; offset += 3) {
  await Promise.all(data.projects.slice(offset, offset + 3).map(async project => {
    const source = project.sourceThumbnail ?? project.thumbnail;
    project.sourceThumbnail = source;
    try {
      const response = await fetch(source, { signal: AbortSignal.timeout(25000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      if ((!png && !jpeg) || bytes.length < 1500) throw new Error('Unavailable or invalid preview');
      const filename = `project-${project.id}.${png ? 'png' : 'jpg'}`;
      await writeFile(new URL(filename, outputDirectory), bytes);
      project.thumbnail = `/projects/${filename}`;
      project.previewAvailable = true;
      results.push({ id: project.id, name: project.name, source, file: project.thumbnail, status: 'recovered', bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
      console.log(`Recovered: ${project.name} (${bytes.length} bytes)`);
    } catch (error) {
      const filename = `project-${project.id}.svg`;
      const title = project.name.replace(/[<>&"']/g, '');
      await writeFile(new URL(filename, outputDirectory), `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="#f1f2f4"/><text x="320" y="185" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#20242c">${title}</text><text x="320" y="225" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#555d69">Preview unavailable</text></svg>\n`);
      project.thumbnail = `/projects/${filename}`;
      project.previewAvailable = false;
      results.push({ id: project.id, name: project.name, source, file: project.thumbnail, status: 'unavailable', reason: error.message });
      console.log(`Unavailable: ${project.name} (${error.message})`);
    }
  }));
}
results.sort((a, b) => a.id - b.id);
await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
await writeFile(new URL('../docs/project-assets.json', import.meta.url), `${JSON.stringify(results, null, 2)}\n`);
