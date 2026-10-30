import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { serveBuild } from './local-server.mjs';

const server = await serveBuild();
const output = new URL('../docs/verification/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const report = { responsive: [], accessibility: [], preferences: {}, navigation: {}, motion: {} };

async function revealPage(page) {
  for (const section of await page.locator('.reveal').all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(element => element.dataset.reveal === 'visible', await section.elementHandle());
  }
  for (const image of await page.locator('img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(image => image.decode()); }
}
try {
  for (const width of [360, 390, 768, 1440]) {
    for (const language of ['en', 'pt']) {
      for (const colorScheme of ['light', 'dark']) {
        const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 1000 }, colorScheme, reducedMotion: 'reduce' });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(server.origin)) errors.push(`${response.status()} ${response.url()}`); });
        await page.goto(server.origin);
        if (language === 'pt') await page.getByRole('button', { name: 'PT', exact: true }).click();
        await revealPage(page);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow ${width}px ${language} ${colorScheme}`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), colorScheme);
        assert.equal(await page.locator('html').getAttribute('lang'), language === 'pt' ? 'pt-BR' : 'en');
        assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
        assert.deepEqual(await page.locator('article h3').allTextContents(), ['Saldoa', 'PixelRank', 'Sneakers Store', 'MoviesLib']);
        assert.equal(await page.getByRole('link', { name: language === 'en' ? 'Read case study' : 'Ver estudo de caso', exact: true }).count(), 4);
        assert.equal(await page.locator('a[href="mailto:zallaguilherme@gmail.com"]').count() >= 2, true);
        assert.equal(await page.locator('figure').evaluateAll(figures => figures.every(figure => {
          const caption = figure.querySelector('figcaption');
          return !caption || caption.getBoundingClientRect().bottom <= figure.getBoundingClientRect().bottom - 1;
        })), true, `Project caption clipped at ${width}px ${language}`);
        assert.deepEqual(errors, []);
        report.responsive.push({ width, language, theme: colorScheme, overflow: false, pageErrors: errors });
        if (width === 390 || width === 1440) {
          const analysis = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
          report.accessibility.push({ width, language, theme: colorScheme, violations: analysis.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) })) });
          assert.deepEqual(analysis.violations.map(violation => violation.id), [], `Accessibility ${width}px ${language} ${colorScheme}`);
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: fileURLToPath(new URL(`home-${width}-${language}-${colorScheme}.png`, output)), fullPage: true });
        }
        await context.close();
      }
    }
    console.log(`Responsive, EN/PT and both themes: ${width}px passed`);
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto(server.origin);
  assert.equal(await page.locator('h1').evaluate(element => getComputedStyle(element).animationName), 'hero-enter');
  const target = page.locator('#stack');
  await page.waitForFunction(() => document.getElementById('stack').dataset.reveal === 'pending');
  await target.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.getElementById('stack').dataset.reveal === 'visible');
  await page.evaluate(() => scrollTo(0, 0));
  assert.equal(await target.getAttribute('data-reveal'), 'visible');
  report.motion.revealOnce = true;
  report.motion.heroAnimation = true;
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('h1').evaluate(element => getComputedStyle(element).animationName), 'none');
  assert.equal(await page.locator('#contact').evaluate(element => getComputedStyle(element).opacity), '1');
  report.motion.reducedMotion = true;

  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.mobile-nav > summary').click();
  await page.locator('.mobile-nav').getByRole('link', { name: 'About', exact: true }).click();
  await page.waitForFunction(() => document.activeElement?.id === 'about');
  assert.equal(await page.locator('.mobile-nav').getAttribute('open'), null);
  await page.reload();
  await page.waitForFunction(() => Math.abs(document.getElementById('about').getBoundingClientRect().top) < 120);
  report.navigation.mobileAndReload = true;
  const pdf = await page.getByRole('link', { name: /Download résumé/ }).first().getAttribute('href');
  const pdfResponse = await context.request.get(server.origin + pdf);
  assert.equal(pdfResponse.status(), 200);
  assert.ok(pdfResponse.headers()['content-type'].includes('application/pdf'));
  report.navigation.curriculum = true;

  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await page.locator('.theme-picker > summary').click();
  await page.getByRole('button', { name: 'Escuro', exact: true }).click();
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.locator('.theme-picker > summary').click();
  await page.getByRole('button', { name: 'Sistema', exact: true }).click();
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  report.preferences = { languagePersisted: true, manualThemePersisted: true, systemThemeReactsToOS: true };

  await page.locator('.floating-contact > summary').click();
  await page.getByRole('link', { name: 'WhatsApp' }).focus();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.floating-contact').getAttribute('open'), null);
  assert.equal(await page.locator('.floating-contact > summary').evaluate(element => element === document.activeElement), true);
  report.navigation.contactEscapeFocus = true;
  await page.locator('.floating-contact > summary').click();
  const openPanel = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  assert.deepEqual(openPanel.violations.map(violation => violation.id), []);
  report.accessibility.push({ state: 'contact-open', width: 390, language: 'pt', theme: 'dark', violations: [] });
  await page.locator('h1').click();
  assert.equal(await page.locator('.floating-contact').getAttribute('open'), null);
  await context.close();

  const keyboardContext = await browser.newContext({ reducedMotion: 'reduce' });
  const keyboard = await keyboardContext.newPage();
  await keyboard.goto(server.origin);
  await keyboard.keyboard.press('Tab');
  assert.equal(await keyboard.evaluate(() => document.activeElement.className), 'skip-link');
  assert.notEqual(await keyboard.locator('.skip-link').evaluate(element => getComputedStyle(element).outlineStyle), 'none');
  await keyboard.keyboard.press('Enter');
  assert.equal(await keyboard.evaluate(() => document.activeElement.id), 'main');
  await keyboard.goto(`${server.origin}/#/portfolio/all`);
  await keyboard.getByRole('heading', { name: 'Selected projects' }).waitFor();
  await keyboard.goto(`${server.origin}/#/missing-page`);
  await keyboard.getByRole('heading', { name: 'Page not found.' }).waitFor();
  report.navigation.keyboardSkipAndLegacyRoutes = true;
  await keyboardContext.close();
  report.caseStudies = [];
  for (const [slug, name] of [['saldoa', 'Saldoa'], ['pixelrank', 'PixelRank'], ['sneakers', 'Sneakers Store'], ['movieslib', 'MoviesLib']]) {
    for (const width of [390, 1440]) {
      for (const language of ['en', 'pt']) {
        const theme = language === 'en' ? 'light' : 'dark';
        const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${server.origin}/#/projects/${slug}`);
        await page.getByRole('heading', { level: 1, name, exact: true }).waitFor();
        if (language === 'pt') await page.getByRole('button', { name: 'PT', exact: true }).click();
        await revealPage(page);
        assert.equal(await page.locator('.case-section').count(), 4);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.equal(await page.locator('.case-image-link img').evaluate(image => image.naturalWidth > 0 && !image.src.endsWith('.gif')), true);
        assert.ok((await page.title()).includes(name));
        const analysis = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        assert.deepEqual(analysis.violations.map(violation => violation.id), [], `${slug} ${width} ${language} accessibility`);
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: fileURLToPath(new URL(`case-${slug}-${width}-${language}.png`, output)), fullPage: true });
        await page.locator('.case-index').getByRole('link', { name: language === 'en' ? '02 Technical decisions' : '02 Decisões técnicas', exact: true }).click();
        await page.waitForFunction(() => document.activeElement?.id === 'decisions');
        await page.reload();
        await page.waitForFunction(() => document.activeElement?.id === 'decisions');
        assert.equal(await page.locator('.case-index [aria-current="location"]').count(), 1);
        await page.locator('.back-link').click();
        await page.waitForFunction(() => document.activeElement?.id === 'projects');
        assert.deepEqual(errors, []);
        report.caseStudies.push({ slug, width, language, theme, image: 'static-local', sections: 4, directRouteAndReload: true, indexAndBackFocus: true, violations: [], errors });
        await context.close();
      }
    }
    console.log(`Case study: ${slug}, desktop/mobile, EN/PT, accessibility and hash navigation passed`);
  }
  console.log('Preferences, keyboard navigation, motion and contact checks passed');
} finally {
  await writeFile(new URL('../docs/site-verification.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  await server.close();
}
