import { useTranslation } from 'react-i18next';
import { FloatingContact } from './FloatingContact';

export function SiteFooter() {
  const { t } = useTranslation();
  return <>
    <footer className="site-footer container"><span>Guilherme Zalla · Software Engineer</span><span>{t('footer')}</span></footer>
    <FloatingContact />
  </>;
}
