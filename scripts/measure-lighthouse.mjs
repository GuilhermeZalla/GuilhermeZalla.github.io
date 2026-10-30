import lighthouse from 'lighthouse';
import desktop from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
import { serveBuild } from './local-server.mjs';

const server = await serveBuild();
const slug = process.argv.find(argument => argument.startsWith('--case='))?.slice(7);
if (slug && !['saldoa', 'pixelrank', 'sneakers', 'movieslib'].includes(slug)) throw new Error('Unknown case study');
const prefix = slug ? `${slug}-` : '';
const target = slug ? `${server.origin}/#/projects/${slug}` : server.origin;
const directory = new URL('../docs/performance/', import.meta.url);
await mkdir(directory, { recursive: true });
const chrome = await launch({ chromePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run'] });
const summaries = [];
try {
  for (const [name, configuration] of [['mobile', undefined], ['desktop', desktop]]) {
    const result = await lighthouse(target, { port: chrome.port, output: ['html', 'json'], logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] }, configuration);
    if (result.lhr.runtimeError) throw new Error(result.lhr.runtimeError.message);
    await writeFile(new URL(`${prefix}lighthouse-${name}.html`, directory), result.report[0]);
    const summary = {
      formFactor: name,
      page: slug ?? 'home',
      scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
      metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift'].map(key => [key, result.lhr.audits[key].displayValue])),
      failedAudits: Object.values(result.lhr.audits).filter(audit => audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== 'informative').map(({ id, title, displayValue }) => ({ id, title, displayValue })),
      note: 'Local production build, simulated throttling. Scores may differ on public hosting.',
    };
    summaries.push(summary);
    console.log(JSON.stringify(summary, null, 2));
  }
} finally {
  await writeFile(new URL(`${prefix}summary.json`, directory), `${JSON.stringify(summaries, null, 2)}\n`);
  await chrome.kill();
  await server.close();
}
