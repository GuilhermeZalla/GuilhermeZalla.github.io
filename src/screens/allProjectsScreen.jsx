import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/site/Header';
import { SiteFooter } from '../components/site/SiteFooter';
import { ProjectCard } from '../components/site/ProjectCard';
import { Reveal } from '../components/site/Reveal';
import { useTheme } from '../hooks/useTheme';
import { useMetadata } from '../hooks/useMetadata';
import { projects } from '../data/projects';

export function AllProjectsScreen() {
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useTheme();
  const location = useLocation();
  useMetadata();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [filter, setFilter] = useState('all');
  const types = [...new Set(projects.map(project => project.type))];
  const filtered = filter === 'all' ? projects : projects.filter(project => project.type === filter);

  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <main id="main" className="container" tabIndex="-1">
        <section className="section" aria-labelledby="all-projects-title">
          <Link to="/" className="back-link">← {t('notFound.home')}</Link>
          <Reveal className="section-heading">
            <h1 id="all-projects-title">{t('projects.allTitle')}</h1>
            <span className="eyebrow">01 — {String(projects.length).padStart(2, '0')}</span>
          </Reveal>
          <div className="actions project-filters" role="group" aria-label={t('projects.filter')}>
            <button type="button" className="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{t('projects.all')}</button>
            {types.map(type => (
              <button key={type} type="button" className="button" aria-pressed={filter === type} onClick={() => setFilter(type)}>
                {type}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filtered.map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} compact />)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
