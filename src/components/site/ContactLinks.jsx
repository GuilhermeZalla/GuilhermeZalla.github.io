import { useTranslation } from 'react-i18next';
import { profile } from '../../data/profile';

export function ContactLinks({ buttons = false, resume = false, githubFirst = false }) {
  const { t } = useTranslation();
  const className = buttons ? 'button' : '';
  const github = <a className={className} href={profile.github}>GitHub <span aria-hidden="true">↗</span></a>;
  const email = profile.email
    ? <a className={className} href={`mailto:${profile.email}`}>{t('contact.email')} <span aria-hidden="true">↗</span></a>
    : <span className={`${className} pending`}>[EMAIL]</span>;
  const linkedin = profile.linkedin
    ? <a className={className} href={profile.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
    : <span className={`${className} pending`}>[LINKEDIN]</span>;
  return <>
    {githubFirst ? <>{github}{linkedin}{email}</> : <>{email}{linkedin}{github}</>}
    {resume && <a className={className} href={profile.curriculumUrl} download>{t('about.resume')} <span aria-hidden="true">↓</span></a>}
  </>;
}
