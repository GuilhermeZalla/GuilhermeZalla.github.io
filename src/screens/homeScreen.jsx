import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/site/Header';
import { ContactLinks } from '../components/site/ContactLinks';
import { SiteFooter } from '../components/site/SiteFooter';
import { ProjectCard } from '../components/site/ProjectCard';
import { Reveal } from '../components/site/Reveal';
import { TypingRole } from '../components/site/TypingRole';
import { useTheme } from '../hooks/useTheme';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

export function HomeScreen() {
  const { t } = useTranslation();
  const { mode, setMode } = useTheme();
  const location = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    const section = location.pathname.startsWith('/portfolio') ? 'projects' : location.pathname.slice(1);
    const target = document.getElementById(section || 'main');
    const navigated = previousPath.current !== null;
    previousPath.current = location.pathname;
    if (!target || (!section && !navigated)) return;
    const frame = requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: navigated && !reducedMotion ? 'smooth' : 'instant', block: 'start' });
      if (navigated || section) target.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <>
      <Header mode={mode} setMode={setMode} />
      <main id="main" className="container" tabIndex="-1">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow hero-enter">React · Node.js · Laravel · C#/.NET</p>
          <h1 id="hero-title" className="hero-enter">Guilherme Zalla</h1>
          <p className="role hero-enter"><TypingRole /></p>
          <p className="intro hero-enter">{t('hero.intro')}</p>
          <div className="actions hero-enter">
            <Link to="/projects" className="button primary">{t('hero.projects')} <span aria-hidden="true">↘</span></Link>
            <Link to="/contact" className="button">{t('hero.contact')}</Link>
          </div>
          <div className="socials hero-enter"><ContactLinks githubFirst /></div>
        </section>

        <section className="section projects-section" id="projects" tabIndex="-1" aria-labelledby="projects-title">
          <Reveal className="section-heading"><h2 id="projects-title">{t('projects.title')}</h2><span className="eyebrow">01 — {String(projects.length).padStart(2, '0')}</span></Reveal>
          {projects.filter(project => project.featured).map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
          <div className="other-projects">
            {projects.filter(project => !project.featured).map(project => <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />)}
          </div>
          <div className="actions"><Link to="/projects/all" className="button">{t('projects.viewAll')} <span aria-hidden="true">↗</span></Link></div>
        </section>

        <Reveal as="section" className="section about-section" id="about" tabIndex="-1" aria-labelledby="about-title">
          <div><p className="eyebrow">{t('about.label')}</p><h2 id="about-title">{t('about.title')}</h2><p>{t('about.body')}</p>
            <div className="actions"><a className="button" href={profile.curriculumUrl} download>{t('about.resume')} <span aria-hidden="true">↓</span></a></div>
          </div>
          <img className="portrait" src={profile.portraitUrl} width="210" height="210" alt="Guilherme Zalla" loading="lazy" decoding="async" />
        </Reveal>

        <Reveal as="section" className="section stack-layout" id="stack" tabIndex="-1" aria-labelledby="stack-title">
          <div><p className="eyebrow">Stack</p><h2 id="stack-title">{t('stack.title')}</h2><p>{t('stack.body')}</p></div>
          <ul className="stack-list">{profile.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
        </Reveal>

        <Reveal as="section" className="section contact-section" id="contact" tabIndex="-1" aria-labelledby="contact-title">
          <p className="eyebrow">{t('contact.label')}</p><h2 id="contact-title">{t('contact.title')}</h2><p>{t('contact.body')}</p>
          <div className="actions"><ContactLinks buttons resume /></div>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
