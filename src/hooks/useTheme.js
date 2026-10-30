import { useEffect, useState } from 'react';

function readMode() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch { /* Storage may be disabled. */ }
  return 'system';
}

export function useTheme() {
  const [mode, setMode] = useState(readMode);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const theme = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!query) return;
    const onChange = event => setSystemDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#15171B' : '#F7F8FA');
    try { localStorage.setItem('portfolio-theme', mode); } catch { /* Optional preference. */ }
  }, [theme, mode]);

  return { mode, theme, setMode };
}
