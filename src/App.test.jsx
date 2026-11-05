import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import App from './App';
import i18n from './i18n';

beforeEach(async () => {
  localStorage.clear();
  window.location.hash = '#/';
  vi.stubGlobal('matchMedia', vi.fn(query => ({ matches: query.includes('color-scheme: dark'), addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.stubGlobal('requestAnimationFrame', callback => { callback(); return 1; });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  HTMLElement.prototype.scrollIntoView = vi.fn();
  await i18n.changeLanguage('en');
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

test('shows the four supplied projects in the approved order, with verified links', () => {
  const { container } = render(<App />);
  expect(screen.getByText(/web applications with React and mobile apps with React Native/)).toBeTruthy();
  expect(container.querySelector('.stack-list').textContent).toContain('React Native');
  for (const image of container.querySelectorAll('.project-cover img')) {
    expect(existsSync(resolve('public', image.getAttribute('src').slice(1)))).toBe(true);
  }
  expect(screen.getAllByRole('article').map(article => article.querySelector('h3').textContent)).toEqual(['Saldoa', 'PixelRank', 'Sneakers Store', 'MoviesLib']);
  expect(screen.queryByText('[SALDOA_REPO]')).toBeNull();
  expect(screen.getAllByRole('link', { name: 'Read case study' })).toHaveLength(4);
  expect(screen.getAllByRole('link', { name: /Email/ })[0].getAttribute('href')).toBe('mailto:zallaguilherme@gmail.com');
  expect(screen.queryByRole('link', { name: /Logos|Banners/ })).toBeNull();
  expect(screen.getAllByRole('link', { name: /Download résumé/ })[0].getAttribute('href')).toMatch(/\.pdf(?:\?|$)/);
});

test('shows Saldoa website and Android preview links on the card and case study', async () => {
  render(<App />);
  const saldoaCard = screen.getAllByRole('article').find(article => article.querySelector('h3').textContent === 'Saldoa');
  expect(within(saldoaCard).getByRole('link', { name: 'Repository' }).getAttribute('href')).toBe('https://github.com/GuilhermeZalla/react-saldoa-app');
  expect(within(saldoaCard).getByText('2025 web · 2026 app')).toBeTruthy();
  expect(within(saldoaCard).getByRole('list', { name: 'Saldoa stack' }).textContent).toContain('React Native');
  expect(within(saldoaCard).getByRole('list', { name: 'Saldoa stack' }).textContent).toContain('Expo');
  expect(screen.getByRole('link', { name: /Visit website/ }).getAttribute('href')).toBe('https://saldoa-app.duckdns.org');
  expect(screen.getByRole('link', { name: /Android app preview/ }).getAttribute('href')).toBe('https://github.com/GuilhermeZalla/react-saldoa-app/releases/tag/mobile-v1.0.0-preview.1');

  fireEvent.click(screen.getAllByRole('link', { name: 'Read case study' })[0]);
  expect(await screen.findByRole('heading', { name: 'Saldoa', level: 1 })).toBeTruthy();
  expect(screen.getAllByText('2025 web · 2026 app')).toHaveLength(1);
  expect(screen.getByText(/recurring transactions, exports and a financial dashboard/)).toBeTruthy();
  expect(screen.getByText(/Android APK is an ARM64 pre-release signed with a debug key/)).toBeTruthy();
  expect(screen.getByText(/Email delivery for password recovery and account-deletion confirmation is not yet configured/)).toBeTruthy();
  expect(screen.getByText('Laravel · Sanctum · React · Inertia · TypeScript · Tailwind CSS · Expo · React Native')).toBeTruthy();
  expect(screen.getByRole('link', { name: /Visit website/ }).getAttribute('href')).toBe('https://saldoa-app.duckdns.org');
  expect(screen.getByRole('link', { name: /Android app preview/ }).getAttribute('href')).toBe('https://github.com/GuilhermeZalla/react-saldoa-app/releases/tag/mobile-v1.0.0-preview.1');

  fireEvent.click(screen.getByRole('button', { name: 'PT', exact: true }));
  expect(await screen.findByText('Web 2025 · App 2026')).toBeTruthy();
  expect(screen.getByText(/O app Android usa React Native e Expo/)).toBeTruthy();
  expect(screen.getByText(/assinada com chave de depuração, ainda sem distribuição pela Google Play/)).toBeTruthy();
  expect(screen.getByText(/envio de e-mails para recuperação de senha e confirmação da exclusão da conta ainda não está configurado/)).toBeTruthy();
  expect(await screen.findByRole('link', { name: /Acessar site/ })).toBeTruthy();
  expect(screen.getByRole('link', { name: /App Android \(prévia\)/ }).getAttribute('href')).toBe('https://github.com/GuilhermeZalla/react-saldoa-app/releases/tag/mobile-v1.0.0-preview.1');
});

test('changes the complete interface and document language to Portuguese and saves the choice', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'PT', exact: true }));
  expect(await screen.findByRole('heading', { name: 'Projetos em destaque' })).toBeTruthy();
  expect(document.documentElement.lang).toBe('pt-BR');
  expect(localStorage.getItem('portfolio-language')).toBe('pt');
  expect(screen.getByText(/aplicações web com React e apps mobile com React Native/)).toBeTruthy();
  expect(screen.getByText(/Um aplicativo de finanças pessoais/)).toBeTruthy();
});

test('uses the system theme until an explicit choice, and supports returning to system', async () => {
  render(<App />);
  expect(document.documentElement.dataset.theme).toBe('dark');
  const picker = screen.getByLabelText('Color theme: System');
  picker.parentElement.open = true;
  fireEvent.click(screen.getByRole('button', { name: 'Light', exact: true }));
  await waitFor(() => expect(document.documentElement.dataset.theme).toBe('light'));
  expect(localStorage.getItem('portfolio-theme')).toBe('light');
  picker.parentElement.open = true;
  fireEvent.click(screen.getByRole('button', { name: 'System', exact: true }));
  await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'));
});

test('keeps old portfolio URLs usable and closes the contact panel with Escape', async () => {
  window.location.hash = '#/portfolio/all';
  const { container } = render(<App />);
  expect(screen.getByRole('heading', { name: 'Selected projects' })).toBeTruthy();
  const disclosure = container.querySelector('.floating-contact');
  disclosure.open = true;
  const whatsapp = screen.getByRole('link', { name: /WhatsApp/ });
  whatsapp.focus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(disclosure.open).toBe(false);
  expect(document.activeElement).toBe(disclosure.querySelector('summary'));
});

test.each([['saldoa', 'Saldoa'], ['pixelrank', 'PixelRank'], ['sneakers', 'Sneakers Store'], ['movieslib', 'MoviesLib']])('opens the %s case study directly, with a static local image and translated sections', async (slug, name) => {
  window.location.hash = `#/projects/${slug}`;
  const { container } = render(<App />);
  expect(await screen.findByRole('heading', { name, level: 1 })).toBeTruthy();
  const imageSource = container.querySelector('.case-image-link img').getAttribute('src');
  expect(imageSource).toMatch(/^\/projects\/.+\.(?:webp|svg)$/);
  expect(existsSync(resolve('public', imageSource.slice(1)))).toBe(true);
  expect(container.querySelectorAll('.case-section')).toHaveLength(4);
  expect(document.title).toContain(name);
  fireEvent.click(screen.getByRole('button', { name: 'PT', exact: true }));
  expect(await screen.findByRole('navigation', { name: 'Nesta página' })).toBeTruthy();
  expect(screen.queryByText('Conteúdo a confirmar')).toBeNull();
});
