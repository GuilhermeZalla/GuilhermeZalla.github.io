import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const dataPath = new URL('../src/assets/json/projects.json', import.meta.url);
const provenancePath = new URL('../docs/project-assets.json', import.meta.url);
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const provenance = JSON.parse(await readFile(provenancePath, 'utf8'));
await mkdir(new URL('../public/projects/', import.meta.url), { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const probe = await fetch('https://i.imgur.com/ZDRxiYA.png', { signal: AbortSignal.timeout(15000) });
  const bytes = Buffer.from(await probe.arrayBuffer());
  console.log(`Imgur response: status=${probe.status}, type=${probe.headers.get('content-type')}, bytes=${bytes.length}`);
  if (bytes.subarray(1, 4).toString() === 'PNG') console.log(`Imgur dimensions: ${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`);
  const candidates = data.projects.filter(project => !project.previewAvailable && /^https:\/\/[^/]+\.netlify\.app/.test(project.url));
  for (let offset = 0; offset < candidates.length; offset += 3) {
    await Promise.all(candidates.slice(offset, offset + 3).map(async project => {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
      try {
        const response = await page.goto(project.url, { waitUntil: 'networkidle', timeout: 25000 });
        const title = await page.title();
        const text = await page.locator('body').innerText();
        if (!response?.ok() || /site not found|page not found|not found - request id/i.test(`${title} ${text}`)) throw new Error(`Demo unavailable (HTTP ${response?.status()})`);
        if (text.trim().length < 30) throw new Error('Demo did not render enough content to identify the project');
        // Existing data assigns the countries demo to TODO APP. Do not publish a misleading screenshot.
        if ([5, 6].includes(project.id)) throw new Error('Existing demo URL points to a different project');
        const filename = `project-${project.id}-demo.png`;
        await page.screenshot({ path: new URL(`../public/projects/${filename}`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), fullPage: false });
        project.thumbnail = `/projects/${filename}`;
        project.previewAvailable = true;
        const entry = provenance.find(entry => entry.id === project.id);
        entry.file = project.thumbnail;
        entry.status = 'captured-from-existing-demo';
        entry.demo = project.url;
        entry.pageTitle = title;
        delete entry.reason;
        console.log(`Captured ${project.name}: ${title}`);
      } catch (error) {
        console.log(`Pending ${project.name}: ${error.message.split('\n')[0]}`);
      } finally { await page.close(); }
    }));
  }
} finally { await browser.close(); }
await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`);
