import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';
import { useDisclosure } from '../../hooks/useDisclosure';

export function FloatingContact() {
  const { t } = useTranslation();
  const ref = useDisclosure();
  return (
    <details className="floating-contact" ref={ref}>
      <summary><span aria-hidden="true">↗ </span>{t('contact.open')}</summary>
      <div className="contact-panel">
        <h2>{t('contact.panelTitle')}</h2>
        <nav aria-label={t('contact.options')}>
          {profile.email ? <a href={`mailto:${profile.email}`}>{t('contact.email')} ↗</a> : <span className="pending">{t('contact.email')} · [EMAIL]</span>}
          {profile.linkedin ? <a href={profile.linkedin}>LinkedIn ↗</a> : <span className="pending">LinkedIn · [LINKEDIN]</span>}
          <a href={profile.whatsapp}>WhatsApp <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </details>
  );
}
