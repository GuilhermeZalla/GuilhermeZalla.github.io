<<<<<<< HEAD
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
=======
import { BsLink45Deg } from  "react-icons/bs";

export const Project = (props) => {
    return (
        <article id="article" className="portfolio__article">
            <figure>
                <img src={props.thumbnail} alt={props.name} />
            </figure>
            <span><a href={props.url || '#'}className="portfolio__project-link"><BsLink45Deg/> {props.name}</a>
            </span>
        </article>
    );
};
>>>>>>> f11ee110860bb4def122ac2bf55cd81a375450b1
