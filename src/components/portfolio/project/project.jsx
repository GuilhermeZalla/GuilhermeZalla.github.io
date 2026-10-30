import { BsLink45Deg } from 'react-icons/bs';

export const Project = ({ name, thumbnail, url, previewAvailable = true }) => (
  <article className="portfolio__article">
    <figure>
      <img src={thumbnail} alt={previewAvailable ? `${name} project preview` : `${name}: preview unavailable`}
        width="640" height="400" loading="lazy" decoding="async" />
    </figure>
    <span>
      {url ? <a href={url} className="portfolio__project-link"><BsLink45Deg aria-hidden="true" /> {name}</a> : name}
    </span>
  </article>
);
