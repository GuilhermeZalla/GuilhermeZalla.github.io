import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const [source, output, width, height] of [
    ['social-card.svg', 'social-card.png', 1200, 630],
    ['favicon.svg', 'apple-touch-icon.png', 180, 180],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(fileURLToPath(new URL(`../public/${source}`, import.meta.url))).href);
    await page.screenshot({ path: fileURLToPath(new URL(`../public/${output}`, import.meta.url)), fullPage: false });
    await page.close();
    console.log(`Rendered ${output}: ${width}x${height}`);
  }
  // Encode a smaller derivative for the 210 px portrait; preserve the original.
  const original = await readFile(new URL('../src/assets/images/portrait-source.jpg', import.meta.url));
  const page = await browser.newPage();
  await page.setContent(`<img alt="" src="data:image/jpeg;base64,${original.toString('base64')}">`);
  const encoded = await page.evaluate(async () => {
    const image = document.querySelector('img');
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(420, image.naturalWidth);
    canvas.height = Math.round(image.naturalHeight * canvas.width / image.naturalWidth);
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/webp', 0.86).split(',')[1];
  });
  const optimized = Buffer.from(encoded, 'base64');
  await writeFile(new URL('../src/assets/images/portrait.webp', import.meta.url), optimized);
  await page.close();
  console.log(`Portrait WebP: ${original.length} -> ${optimized.length} bytes; original retained.`);
} finally { await browser.close(); }
