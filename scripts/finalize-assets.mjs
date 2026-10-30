import { readFile, writeFile, unlink } from 'node:fs/promises';
const dataPath = new URL('../src/assets/json/projects.json', import.meta.url);
const provenancePath = new URL('../docs/project-assets.json', import.meta.url);
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const provenance = JSON.parse(await readFile(provenancePath, 'utf8'));
// Both old TODO entries link to unrelated projects. Preserve original data,
// but do not present third-party pages as evidence of this user's work.
for (const id of [5, 6]) {
  const project = data.projects.find(project => project.id === id);
  const entry = provenance.find(entry => entry.id === id);
  project.thumbnail = `/projects/project-${id}.svg`;
  project.previewAvailable = false;
  project.sourceUrl = project.sourceUrl ?? project.url;
  project.url = '';
  entry.file = project.thumbnail;
  entry.status = 'unavailable';
  entry.reason = 'Existing demo URL points to a different project; correct URL or original image required';
  delete entry.demo;
  delete entry.pageTitle;
}
await unlink(new URL('../public/projects/project-6-demo.png', import.meta.url)).catch(error => { if (error.code !== 'ENOENT') throw error; });
await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`);
console.log('Excluded unrelated demo captures.');
