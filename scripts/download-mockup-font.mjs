import { mkdir, writeFile } from 'node:fs/promises';
const directory = new URL('../docs/mockups/assets/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const [source, destination] of [
  ['https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/InterVariable.woff2', 'InterVariable.woff2'],
  ['https://raw.githubusercontent.com/rsms/inter/master/LICENSE.txt', 'Inter-LICENSE.txt'],
]) {
  const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Font download: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(new URL(destination, directory), bytes);
  console.log(`${destination}: ${bytes.length} bytes`);
}
