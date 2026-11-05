import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/site/Header';
import { SiteFooter } from '../components/site/SiteFooter';
import { Reveal } from '../components/site/Reveal';
import { useTheme } from '../hooks/useTheme';
import { projects } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { NotFoundScreen } from './notFoundScreen';

export default function CaseStudyScreen() {
  const { slug } = useParams();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useTheme();
  const project = projects.find(item => item.id === slug);
  const study = caseStudies[slug];
  const language = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en';

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(location.hash.slice(1));
      const target = section ?? document.getElementById('main');
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      target?.scrollIntoView({ behavior: section && !reduced ? 'smooth' : 'instant', block: 'start' });
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [slug, location.hash]);

  if (!project || !study) return <NotFoundScreen />;
  return <>
    <Header mode={mode} setMode={setMode} />
    <main id="main" className="container" tabIndex="-1">
      <section className="case-hero" aria-labelledby="case-title">
        <Link to="/projects" className="back-link">← {t('case.back')}</Link>
        <p className="eyebrow">{t('case.label')} / {t('projects.type')}</p>
        <h1 id="case-title">{project.name}</h1>
        <p className="case-description">{study.subtitle[language]}</p>
        <dl className="case-meta">
          <div><dt>{t('case.stack')}</dt><dd>{project.stack.join(' · ')}</dd></div>
          <div><dt>{t('case.year')}</dt><dd aria-label={project.year ? undefined : t('projects.yearPending')}>{project.year ?? '[YEAR]'}</dd></div>
        </dl>
        <div className="actions"><a className="button" href={project.repository}>{t('projects.repository')} ↗</a>{project.demo && <a className="button primary" href={project.demo}>{t('projects.demo')} ↗</a>}</div>
        <figure className={`case-visual${project.id === 'saldoa' ? ' case-visual--full-image' : ''}`}>
          <a className="case-image-link" href={project.image} target="_blank" rel="noreferrer" aria-label={`${t('case.fullImage')}: ${project.name}`}>
            <img src={project.image} alt={t('projects.imageAlt', { name: project.name })} width={project.id === 'saldoa' ? '1920' : '1440'} height={project.id === 'saldoa' ? '1080' : '1000'} decoding="async" />
          </a>
          <figcaption><span>{project.name} · {project.category[language]}</span><a href={project.image} target="_blank" rel="noreferrer">{t('case.fullImage')} ↗</a></figcaption>
        </figure>
      </section>
      <div className="case-body">
        <nav className="case-index" aria-label={t('case.contents')}>
          <span className="eyebrow">{t('case.contents')}</span>
          {study.sections.map((section, index) => <Link key={section.id} to={`${location.pathname}#${section.id}`} aria-current={location.hash === `#${section.id}` ? 'location' : undefined}>{String(index + 1).padStart(2, '0')} {t(`case.${section.id}`)}</Link>)}
        </nav>
        <div className="case-content">
          {study.sections.map((section, index) => <Reveal as="section" key={section.id} id={section.id} className="case-section" tabIndex="-1" aria-labelledby={`heading-${section.id}`}>
            <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {t(`case.${section.id}`)}</p>
            <h2 id={`heading-${section.id}`}>{section.title[language]}</h2>
            <p>{section.body[language]}</p>
            {section.limitation && <aside className="case-limit"><p><strong>{t('case.scope')}</strong>{section.limitation[language]}</p></aside>}
          </Reveal>)}
          <div className="case-bottom"><Link className="button" to="/projects">← {t('case.back')}</Link><a className="button" href={project.repository}>{t('projects.repository')} ↗</a></div>
        </div>
      </div>
    </main>
    <SiteFooter />
  </>;
}
