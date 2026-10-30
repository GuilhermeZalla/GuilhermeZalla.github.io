import { chromium } from '@playwright/test';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const root = new URL('../', import.meta.url);
const results = [];
try {
  for (const [id, source, mime] of [
    ['portrait', '.asset-work/portrait-source', 'image/jpeg'],
    ['saldoa', '.asset-work/saldoa.gif', 'image/gif'],
    ...['pixelrank', 'sneakers', 'movieslib'].map(id => [id, `.asset-work/${id}.png`, 'image/png']),
  ]) {
    const bytes = await readFile(new URL(source, root));
    const page = await browser.newPage();
    await page.setContent(`<img alt="" src="data:${mime};base64,${bytes.toString('base64')}">`);
    const encoded = await page.evaluate(async ({ id }) => {
      const image = document.querySelector('img');
      await image.decode();
      // Freeze the GIF onto a canvas immediately. Runtime assets are static only.
      const frame = document.createElement('canvas');
      // The supplied Sneakers capture includes a 15px browser scrollbar.
      frame.width = image.naturalWidth - (id === 'sneakers' ? 15 : 0);
      frame.height = image.naturalHeight;
      frame.getContext('2d').drawImage(image, 0, 0);
      const encode = (maximum, quality, type = 'image/webp') => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(maximum, frame.width);
        canvas.height = Math.round(frame.height * canvas.width / frame.width);
        canvas.getContext('2d').drawImage(frame, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL(type, quality).split(',')[1];
      };
      return { width: frame.width, height: frame.height, full: encode(id === 'portrait' ? 420 : 1440, .88), preview: id !== 'portrait' ? encode(720, .84) : null, png: id === 'saldoa' ? encode(1440, 1, 'image/png') : null };
    }, { id });
    const fullPath = id === 'portrait' ? 'src/assets/images/portrait.webp' : `public/projects/${id}-home.webp`;
    await writeFile(new URL(fullPath, root), Buffer.from(encoded.full, 'base64'));
    if (encoded.preview) await writeFile(new URL(`public/projects/${id}-preview.webp`, root), Buffer.from(encoded.preview, 'base64'));
    if (encoded.png) await writeFile(new URL('public/projects/saldoa-home.png', root), Buffer.from(encoded.png, 'base64'));
    results.push({ id, width: encoded.width, height: encoded.height, full: fullPath, bytes: Buffer.from(encoded.full, 'base64').length });
    console.log(`${id}: ${encoded.width}x${encoded.height} -> ${Buffer.from(encoded.full, 'base64').length} bytes`);
    await page.close();
  }
  await copyFile(new URL('.asset-work/portrait-source', root), new URL('src/assets/images/portrait-source.jpg', root));
  await writeFile(new URL('docs/references/prepared-assets.json', root), `${JSON.stringify(results, null, 2)}\n`);
} finally { await browser.close(); }
