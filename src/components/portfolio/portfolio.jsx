import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '../common/footer/footer';
import { Header } from '../common/header/header';
import dataJSON from '../../assets/json/projects.json';
import { Project } from './project/project';
import { projectFilters } from './projectFilters';

export const Portfolio = () => {
  const { section = 'all' } = useParams();
  const navigate = useNavigate();
  // Preserve bookmarks using the former misspelling.
  const selected = section === 'institucional site' ? 'institutional site' : section;
  const projectType = projectFilters.some(([value]) => value === selected) ? selected : 'all';
  const projects = dataJSON.projects.filter(project =>
    !['logo', 'banner'].includes(project.type) &&
    (projectType === 'all' || project.type === projectType),
  );

  return (
    <>
      <Header section="portfolio" />
      <main className="portfolio">
        <div className="container">
          <section className="portfolio__section" aria-labelledby="portfolio-title">
            <div className="wrapper"><h1 id="portfolio-title" className="portfolio__title">PORTFOLIO</h1></div>
            <h2 className="portfolio__subtitle">Some of my works.</h2>
          </section>
          <section className="portfolio__section" aria-label="Projects">
            <ul className="portfolio__list" aria-label="Filter projects">
              {projectFilters.map(([value, label]) => (
                <li className="portfolio__item" key={value}>
                  <button type="button" name={value}
                    className={`portfolio__btn${projectType === value ? ' current' : ''}`}
                    aria-pressed={projectType === value}
                    onClick={() => navigate(`/portfolio/${value}`)}>{label}</button>
                </li>
              ))}
            </ul>
            <div className="portfolio__container">
              {projects.map(project => <Project key={project.id} {...project} />)}
            </div>
            {projects.length === 0 && <p className="portfolio__empty" role="status">No projects in this category yet.</p>}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};
