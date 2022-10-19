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