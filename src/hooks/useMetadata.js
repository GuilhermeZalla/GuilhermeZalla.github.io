import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useMetadata(project) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const portuguese = i18n.resolvedLanguage === 'pt';
    document.documentElement.lang = portuguese ? 'pt-BR' : 'en';
    const title = project ? `${project.name} | Guilherme Zalla — Software Engineer` : 'Guilherme Zalla | Software Engineer';
    const description = project ? project.description[portuguese ? 'pt' : 'en'] : t('metadata.description');
    document.title = title;
    const values = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[name="twitter:title"]': title,
      'meta[property="og:description"]': description,
      'meta[name="twitter:description"]': description,
      'meta[property="og:locale"]': portuguese ? 'pt_BR' : 'en_US',
      'meta[property="og:image:alt"]': t('metadata.imageAlt'),
      'meta[name="twitter:image:alt"]': t('metadata.imageAlt'),
    };
    Object.entries(values).forEach(([selector, content]) => document.querySelector(selector)?.setAttribute('content', content));
  }, [t, i18n.resolvedLanguage, project]);
}
