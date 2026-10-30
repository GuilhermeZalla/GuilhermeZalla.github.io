import { readFile, writeFile, unlink } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
for (const filename of ['scripts/build-mockups.mjs', 'docs/mockups/home-light.html', 'docs/mockups/home-dark.html']) {
  const file = new URL(filename, root);
  const before = await readFile(file, 'utf8');
  await writeFile(file, before.replaceAll('src/assets/images/profile.png', 'src/assets/images/portrait-source.jpg').replaceAll('src/assets/pdf/CV%20Guilherme%20Zalla.pdf', 'docs/mockups/Curr%C3%ADculo_Guilherme_Zalla.pdf'));
}
const about = new URL('src/components/about/about.jsx', root);
await writeFile(about, (await readFile(about, 'utf8')).replaceAll('profile.png', 'portrait.webp').replaceAll('../../assets/pdf/CV Guilherme Zalla.pdf', '../../../docs/mockups/Currículo_Guilherme_Zalla.pdf'));
const brand = new URL('scripts/render-brand-assets.mjs', root);
await writeFile(brand, (await readFile(brand, 'utf8')).replaceAll('profile.png', 'portrait-source.jpg').replaceAll('profile.webp', 'portrait.webp').replaceAll('data:image/png;base64', 'data:image/jpeg;base64'));
for (const filename of ['src/assets/images/profile.png', 'src/assets/images/profile.webp']) {
  await unlink(new URL(filename, root)).catch(error => { if (error.code !== 'ENOENT') throw error; });
}
console.log('Updated portrait/CV references and removed the previous portrait files.');
