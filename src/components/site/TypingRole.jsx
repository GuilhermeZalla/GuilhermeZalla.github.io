import { useEffect, useState } from 'react';

const phrases = ['Software Engineer', 'Full Stack Developer', 'always learning', 'always building'];

export function TypingRole() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(120);

  useEffect(() => {
    const fullText = phrases[loopNum % phrases.length];
    const ticker = setTimeout(() => {
      const updated = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);
      setText(updated);

      if (!isDeleting && updated === fullText) {
        setDelta(1400);
        setIsDeleting(true);
      } else if (isDeleting && updated === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(300);
      } else {
        setDelta(isDeleting ? 60 : 120);
      }
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, delta]);

  return (
    <span className="typing-role" aria-label={phrases[0]}>
      {text}
      <span className="typing-caret" aria-hidden="true">|</span>
    </span>
  );
}