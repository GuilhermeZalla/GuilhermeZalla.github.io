import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { serveBuild } from '../../scripts/local-server.mjs';

// Real browser captures of the local production build; no external messages are sent.
const root = new URL('../../', import.meta.url);
const screenshots = new URL('../screenshots/', import.meta.url);
const frames = new URL('../../.asset-work/readme-capture/', import.meta.url);
await mkdir(screenshots, { recursive: true });
await mkdir(frames, { recursive: true });
const server = await serveBuild();
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const manifest = { source: 'Local production build, Microsoft Edge / Playwright', screenshots: [], demos: [] };
const errors = [];

async function openPage(width, theme = 'light', language = 'pt', motion = 'reduce') {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 1000 }, colorScheme: theme, reducedMotion: motion });
  await page.addInitScript(({ theme, language }) => {
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-language', language);
  }, { theme, language });
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith(server.origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  return page;
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.filter(image => image.complete).map(image => image.decode())));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
}

async function revealAll(page) {
  await page.locator('h1').waitFor({ state: 'visible' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  for (const element of await page.locator('.reveal, img').all()) {
    await element.scrollIntoViewIfNeeded();
    if (await element.evaluate(element => element.tagName === 'IMG')) await element.evaluate(image => image.decode());
  }
  await settle(page);
}

async function shot(page, name, fullPage = false) {
  await settle(page);
  await page.screenshot({ path: fileURLToPath(new URL(name, screenshots)), fullPage, animations: 'disabled' });
  manifest.screenshots.push({ file: `docs/screenshots/${name}`, width: page.viewportSize().width, fullPage, theme: await page.locator('html').getAttribute('data-theme'), language: await page.locator('html').getAttribute('lang') });
}

async function staticCaptures() {
  for (const width of [1440, 390]) {
    const device = width === 1440 ? 'desktop' : 'mobile';
    for (const theme of ['light', 'dark']) {
      const page = await openPage(width, theme);
      await page.goto(server.origin);
      await revealAll(page);
      await page.evaluate(() => scrollTo(0, 0));
      await shot(page, `home-${device}${theme === 'dark' ? '-dark' : ''}.png`);
      await shot(page, `home-${device}${theme === 'dark' ? '-dark' : ''}-full.png`, true);
      if (theme === 'light') {
        await page.locator('#projects').scrollIntoViewIfNeeded();
        await page.evaluate(() => document.querySelector('#projects').scrollIntoView({ block: 'start' }));
        await shot(page, `projects-${device}.png`);
        await page.goto(server.origin);
        await page.locator('.floating-contact summary').click();
        await shot(page, `header-contact-${device}.png`);
      }
      await page.close();
    }
    for (const slug of ['saldoa', 'pixelrank', 'sneakers', 'movieslib']) {
      const page = await openPage(width);
      await page.goto(`${server.origin}/#/projects/${slug}`);
      await revealAll(page);
      await page.evaluate(() => scrollTo(0, 0));
      await shot(page, `case-${slug}-${device}.png`);
      await shot(page, `case-${slug}-${device}-full.png`, true);
      await page.close();
    }
  }
  console.log(`${manifest.screenshots.length} real screenshots saved.`);
}

async function demo(name, width, sequence, language = 'pt') {
  const page = await openPage(width, 'light', language, 'no-preference');
  const directory = new URL(`${name}/`, frames);
  await mkdir(directory, { recursive: true });
  const captured = [];
  let timer;
  let pending = Promise.resolve();
  let failure;
  const capture = () => {
    if (failure) return;
    const file = fileURLToPath(new URL(`${String(captured.length).padStart(5, '0')}.jpg`, directory));
    captured.push(file);
    pending = page.screenshot({ path: file, type: 'jpeg', quality: 85 }).catch(error => { failure = error; }).finally(() => {
      if (timer !== null) timer = setTimeout(capture, 180);
    });
  };
  try {
    await page.goto(server.origin);
    await page.locator('h1').waitFor({ state: 'visible' });
    await settle(page);
    // Keep the GIF's first frame readable when displayed before playback.
    await page.waitForFunction(() => [...document.querySelectorAll('.hero-enter')].every(element => getComputedStyle(element).opacity === '1'));
    timer = setTimeout(capture, 0);
    await page.waitForTimeout(1000);
    await sequence(page);
    await page.waitForTimeout(1400);
  } finally {
    clearTimeout(timer);
    timer = null;
    await pending;
    await page.close();
  }
  if (failure) throw failure;
  const item = { file: `docs/demo/${name}.gif`, viewport: { width, height: width < 768 ? 844 : 1000 }, frames: captured, frameDuration: 200, outputWidth: width < 768 ? 390 : 800 };
  manifest.demos.push(item);
  console.log(`${name}: ${captured.length} real browser frames.`);
}

async function scrollToSection(page, selector) {
  await page.locator(selector).evaluate(element => element.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  await page.waitForTimeout(1500);
}

try {
  if (process.argv.includes('--demos-only')) {
    manifest.screenshots = JSON.parse(await readFile(new URL('manifest.json', import.meta.url), 'utf8')).screenshots;
  } else {
    await staticCaptures();
  }
  await demo('home-desktop', 1440, async page => {
    await page.locator('.hero .button.primary').click();
    await page.waitForTimeout(1500);
    await scrollToSection(page, '.project:nth-of-type(2)');
    await scrollToSection(page, '.other-projects');
    await scrollToSection(page, '#about');
    await scrollToSection(page, '#stack');
    await scrollToSection(page, '#contact');
  });
  await demo('case-study-desktop', 1440, async page => {
    await scrollToSection(page, '#projects');
    await page.locator('a[href="#/projects/saldoa"]').click();
    await page.waitForTimeout(1400);
    await scrollToSection(page, '.case-visual');
    await scrollToSection(page, '#problem');
    await page.locator('.case-index a[href$="#decisions"]').click();
    await page.waitForTimeout(1500);
    await scrollToSection(page, '#challenges');
    await scrollToSection(page, '#result');
    await page.locator('.case-bottom a[href="#/projects"]').click();
    await page.waitForTimeout(1200);
  });
  await demo('preferences-desktop', 1440, async page => {
    await page.getByRole('button', { name: 'PT', exact: true }).click();
    await page.waitForTimeout(1400);
    await page.locator('.theme-button').click();
    await page.waitForTimeout(650);
    await page.locator('.theme-options').getByRole('button', { name: 'Escuro', exact: true }).click();
    await page.waitForTimeout(1600);
    await page.locator('.floating-contact summary').click();
    await page.waitForTimeout(1800);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.waitForTimeout(1300);
    await page.locator('.theme-button').click();
    await page.waitForTimeout(600);
    await page.locator('.theme-options').getByRole('button', { name: 'Light', exact: true }).click();
  }, 'en');
  await demo('portfolio-mobile', 390, async page => {
    await page.locator('.mobile-nav summary').click();
    await page.waitForTimeout(900);
    await page.locator('.mobile-nav a[href="#/projects"]').click();
    await page.waitForTimeout(1600);
    await page.locator('a[href="#/projects/saldoa"]').click();
    await page.waitForTimeout(1400);
    await scrollToSection(page, '.case-visual');
    await scrollToSection(page, '#problem');
    await scrollToSection(page, '#decisions');
    await page.locator('.mobile-nav summary').click();
    await page.waitForTimeout(700);
    await page.locator('.mobile-nav a[href="#/contact"]').click();
    await page.waitForTimeout(1700);
    await page.locator('.floating-contact summary').click();
  });
  assert.deepEqual(errors, []);
  const workManifest = new URL('manifest.json', frames);
  await writeFile(workManifest, `${JSON.stringify(manifest, null, 2)}\n`);
  const python = process.env.PYTHON_BINARY ?? 'python';
  const encoder = spawn(python, [fileURLToPath(new URL('encode_gifs.py', import.meta.url)), fileURLToPath(workManifest)], { cwd: fileURLToPath(root), stdio: 'inherit' });
  const exitCode = await new Promise((resolve, reject) => { encoder.on('error', reject); encoder.on('exit', resolve); });
  assert.equal(exitCode, 0, 'GIF encoding failed');
  const finalManifest = JSON.parse(await readFile(workManifest, 'utf8'));
  finalManifest.demos = finalManifest.demos.map(({ frames, ...demo }) => ({ ...demo, frameCount: frames.length }));
  finalManifest.pageErrors = errors;
  await writeFile(new URL('manifest.json', import.meta.url), `${JSON.stringify(finalManifest, null, 2)}\n`);
  console.log('Screenshots and animated GIFs verified. No application files changed.');
} finally {
  await browser.close();
  await server.close();
}
