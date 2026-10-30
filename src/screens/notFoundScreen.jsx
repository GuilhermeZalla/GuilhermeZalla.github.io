import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFoundScreen() {
  const { t } = useTranslation();
  return <main className="container not-found"><h1>{t('notFound.title')}</h1><p>{t('notFound.body')}</p><Link className="button primary" to="/">{t('notFound.home')}</Link></main>;
}
