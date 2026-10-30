import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
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

test('shows the four supplied projects in the approved order, with no invented links', () => {
  render(<App />);
  expect(screen.getAllByRole('article').map(article => article.querySelector('h3').textContent)).toEqual(['Saldoa', 'PixelRank', 'Sneakers Store', 'MoviesLib']);
  expect(screen.queryByText('[SALDOA_REPO]')).toBeNull();
  expect(screen.getAllByRole('link', { name: 'Read case study' })).toHaveLength(4);
  expect(screen.getAllByRole('link', { name: /Email/ })[0].getAttribute('href')).toBe('mailto:zallaguilherme@gmail.com');
  expect(screen.queryByRole('link', { name: /Logos|Banners/ })).toBeNull();
  expect(screen.getAllByRole('link', { name: /Download résumé/ })[0].getAttribute('href')).toMatch(/\.pdf(?:\?|$)/);
});

test('changes the complete interface and document language to Portuguese and saves the choice', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'PT', exact: true }));
  expect(await screen.findByRole('heading', { name: 'Projetos em destaque' })).toBeTruthy();
  expect(document.documentElement.lang).toBe('pt-BR');
  expect(localStorage.getItem('portfolio-language')).toBe('pt');
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
  expect(container.querySelector('.case-image-link img').getAttribute('src')).toMatch(/^\/projects\/.+\.webp$/);
  expect(container.querySelectorAll('.case-section')).toHaveLength(4);
  expect(document.title).toContain(name);
  fireEvent.click(screen.getByRole('button', { name: 'PT', exact: true }));
  expect(await screen.findByRole('navigation', { name: 'Nesta página' })).toBeTruthy();
  expect(screen.queryByText('Conteúdo a confirmar')).toBeNull();
});
