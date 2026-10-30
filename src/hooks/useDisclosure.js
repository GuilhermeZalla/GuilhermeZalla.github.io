import { useEffect, useRef } from 'react';

export function useDisclosure() {
  const ref = useRef(null);
  useEffect(() => {
    const closeOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) ref.current.open = false;
    };
    const closeOnEscape = event => {
      if (event.key !== 'Escape' || !ref.current?.open) return;
      const hadFocus = ref.current.contains(document.activeElement);
      ref.current.open = false;
      if (hadFocus) ref.current.querySelector('summary').focus();
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);
  return ref;
}
