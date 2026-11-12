import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

export function ProjectCard({ project, index, compact = false }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en';
  return (
    <Reveal as="article" className={compact || !project.featured ? 'small-project' : 'project'} aria-labelledby={`project-${project.id}`}>
      <figure className={`project-cover${project.image ? ' has-image' : ''}${project.id === 'saldoa' || project.id === 'taskflow' ? ' project-cover--full-image' : ''}`}>
        {project.image ? <img src={project.preview ?? project.image} alt={t('projects.imageAlt', { name: project.name })} width="720" height="500" loading="lazy" decoding="async" /> : <>
          <div><div className="cover-name">{project.name}</div><div className="cover-type">{project.category[language]} · {project.stack.slice(0, 2).join(' / ')}</div></div>
          <div className="cover-slot"><svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="5" width="24" height="22" rx="2" /><circle cx="11" cy="12" r="2" /><path d="m5 23 8-7 5 4 5-8 5 11" /></svg><span>{t('projects.preview')}</span><span>{t('projects.imagePending')}</span></div>
          <figcaption className="cover-caption">{project.name} · {project.category[language]}</figcaption>
        </>}
      </figure>
      <div className="project-copy">
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {t('projects.type')} · <span aria-label={project.year ? undefined : t('projects.yearPending')}>{project.yearLabel?.[language] ?? project.year ?? '[YEAR]'}</span>{project.languages?.length ? ` · ${project.languages.map(code => code.toUpperCase()).join(' / ')}` : ''}</p>
        <h3 id={`project-${project.id}`}>{project.name}</h3>
        <p>{project.description[language]}</p>
        <ul className="tags" aria-label={`${project.name} stack`}>{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
        <div className="project-links">
          <Link to={`/projects/${project.id}`}>{t('projects.caseStudy')} <span aria-hidden="true">↗</span></Link>
          {project.repository ? <a href={project.repository}>{t('projects.repository')} <span aria-hidden="true">↗</span></a> : <span className="pending">{project.repositoryPlaceholder ?? '[REPOSITORY]'}</span>}
          {project.website && <a href={project.website}>{t('projects.website')} <span aria-hidden="true">↗</span></a>}
          {project.androidApp && <a href={project.androidApp}>{t('projects.androidPreview')} <span aria-hidden="true">↗</span></a>}
          {project.demo && <a href={project.demo}>{t('projects.demo')} <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </Reveal>
  );
}
