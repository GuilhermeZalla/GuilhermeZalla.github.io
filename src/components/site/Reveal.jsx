import { useEffect, useRef, useState } from 'react';

export function Reveal({ as: Element = 'div', className = '', children, ...props }) {
  const ref = useRef(null);
  // Visible until an observer is available; unsupported browsers never lose content.
  const [state, setState] = useState('visible');
  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (motion?.matches || !window.IntersectionObserver) return;
    let observer;
    const stop = () => {
      observer?.disconnect();
      setState('visible');
    };
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) stop();
    }, { threshold: 0.08, rootMargin: '0px 0px -16px 0px' });
    setState('pending');
    observer.observe(ref.current);
    const onChange = event => { if (event.matches) stop(); };
    motion?.addEventListener('change', onChange);
    return () => {
      observer.disconnect();
      motion?.removeEventListener('change', onChange);
    };
  }, []);
  return <Element ref={ref} className={`reveal ${className}`} data-reveal={state} {...props}>{children}</Element>;
}
