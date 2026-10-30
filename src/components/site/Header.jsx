import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useDisclosure } from '../../hooks/useDisclosure';

const sections = ['projects', 'about', 'stack', 'contact'];

export function Header({ mode, setMode }) {
  const { t, i18n } = useTranslation();
  const menu = useDisclosure();
  const themes = useDisclosure();
  const Icon = mode === 'dark' ? FiMoon : mode === 'light' ? FiSun : FiMonitor;
  const closeMenu = () => { if (menu.current) menu.current.open = false; };
  return (
    <>
      <a className="skip-link" href="#main" onClick={event => {
        event.preventDefault();
        document.getElementById('main')?.focus();
      }}>{t('nav.skip')}</a>
      <div className="topbar">
        <header className="site-header container">
          <Link to="/" className="brand" aria-label={t('nav.home')}>Guilherme Zalla</Link>
          <nav className="navigation" aria-label={t('nav.label')}>
            {sections.map(section => <Link key={section} to={`/${section}`}>{t(`nav.${section}`)}</Link>)}
          </nav>
          <div className="header-tools">
            <div className="languages" role="group" aria-label={t('language')}>
              {['en', 'pt'].map(language => <button key={language} type="button" lang={language}
                aria-pressed={i18n.resolvedLanguage === language}
                onClick={() => i18n.changeLanguage(language)}>{language.toUpperCase()}</button>)}
            </div>
            <details className="theme-picker" ref={themes}>
              <summary className="theme-button" aria-label={`${t('theme.label')}: ${t(`theme.${mode}`)}`}><Icon aria-hidden="true" /></summary>
              <div className="theme-options" role="group" aria-label={t('theme.label')}>
                {['system', 'light', 'dark'].map(value => <button key={value} type="button" aria-pressed={mode === value}
                  onClick={() => { setMode(value); themes.current.open = false; themes.current.querySelector('summary').focus(); }}>
                  {t(`theme.${value}`)}<span aria-hidden="true">{mode === value ? '✓' : ''}</span>
                </button>)}
              </div>
            </details>
          </div>
          <details className="mobile-nav" ref={menu}>
            <summary>{t('nav.menu')}</summary>
            <nav aria-label={t('nav.label')}>
              {sections.map(section => <Link key={section} to={`/${section}`} onClick={closeMenu}>{t(`nav.${section}`)}</Link>)}
            </nav>
          </details>
        </header>
      </div>
    </>
  );
}
