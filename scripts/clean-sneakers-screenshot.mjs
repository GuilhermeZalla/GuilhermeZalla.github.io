import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';

// Keep the supplied screenshot intact; crop only its 15px browser scrollbar.
const source = await readFile(new URL('../.asset-work/sneakers.png', import.meta.url));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(`<img alt="" src="data:image/png;base64,${source.toString('base64')}">`);
  const result = await page.evaluate(async () => {
    const image = document.querySelector('img');
    await image.decode();
    if (image.naturalWidth !== 1440 || image.naturalHeight !== 1000) throw new Error('Unexpected source dimensions');
    const crop = document.createElement('canvas');
    crop.width = 1425;
    crop.height = 1000;
    crop.getContext('2d').drawImage(image, 0, 0);
    const preview = document.createElement('canvas');
    preview.width = 720;
    preview.height = Math.round(crop.height * preview.width / crop.width);
    preview.getContext('2d').drawImage(crop, 0, 0, preview.width, preview.height);
    return {
      png: crop.toDataURL('image/png').split(',')[1],
      full: crop.toDataURL('image/webp', .88).split(',')[1],
      preview: preview.toDataURL('image/webp', .84).split(',')[1],
    };
  });
  for (const [key, path] of [
    ['png', 'docs/references/sneakers-home-clean.png'],
    ['full', 'public/projects/sneakers-home.webp'],
    ['preview', 'public/projects/sneakers-preview.webp'],
  ]) {
    await writeFile(new URL(`../${path}`, import.meta.url), Buffer.from(result[key], 'base64'));
  }
  const metadataUrl = new URL('../docs/references/prepared-assets.json', import.meta.url);
  const metadata = JSON.parse(await readFile(metadataUrl, 'utf8'));
  Object.assign(metadata.find(asset => asset.id === 'sneakers'), {
    width: 1425, height: 1000, bytes: Buffer.from(result.full, 'base64').length,
  });
  await writeFile(metadataUrl, `${JSON.stringify(metadata, null, 2)}\n`);
  console.log('Sneakers screenshot cropped to 1425x1000; full and preview WebP updated.');
} finally {
  await browser.close();
}
