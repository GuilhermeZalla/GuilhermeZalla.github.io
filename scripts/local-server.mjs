import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.json': 'application/json' };
export async function serveBuild() {
  const root = fileURLToPath(new URL('../dist/', import.meta.url));
  const server = createServer(async (request, response) => {
    const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const target = path.resolve(root, route === '/' ? 'index.html' : route.replace(/^\//, ''));
    if (!target.startsWith(root)) { response.writeHead(403).end(); return; }
    try { response.setHeader('Content-Type', mime[path.extname(target)] ?? 'application/octet-stream'); response.end(await readFile(target)); }
    catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { origin: `http://127.0.0.1:${server.address().port}`, close: () => new Promise(resolve => server.close(resolve)) };
}
