import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const phrasesByLanguage = {
  en: ['Software Engineer', 'Full Stack Developer', 'always learning', 'always building'],
  pt: ['Software Engineer', 'Full Stack Developer', 'sempre aprendendo', 'sempre construindo'],
};

export function TypingRole() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en';
  const phrases = phrasesByLanguage[language];

  return (
    <span key={language} className="typing-role" aria-label={phrases[0]}>
      <TypingRoleAnimation phrases={phrases} />
    </span>
  );
}

function TypingRoleAnimation({ phrases }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(120);

  useEffect(() => {
    setText('');
    setIsDeleting(false);
    setLoopNum(0);
    setDelta(120);
  }, [phrases]);

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
  }, [text, isDeleting, loopNum, delta, phrases]);

  return (
    <>
      {text}
      <span className="typing-caret" aria-hidden="true">|</span>
    </>
  );
}
