import Logo from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useState } from 'react';
import { projectFilters } from '../../portfolio/projectFilters';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="header">
      <nav className="header__navbar" aria-label="Main navigation">
        <Link to="/" className="header__brand" aria-label="Guilherme Zalla home">
          <img src={Logo} alt="Guilherme Zalla — Software Engineer" />
        </Link>
        <ul id="main-menu" className={`header__list${isOpen ? ' is-open' : ''}`}>
          <li className="header__item"><Link to="/" className="header__link">Home</Link></li>
          <li className="header__item"><Link to="/about" className="header__link">About</Link></li>
          <li className="header__item">
            <Link to="/portfolio/all" className="header__link portfolio">Portfolio <RiArrowDropDownLine aria-hidden="true" /></Link>
            <div className="dropdown"><div className="dropdown-menu"><ul className="dropdown__list">
              {projectFilters.filter(([value]) => value !== 'all').map(([value, label]) => (
                <li className="dropdown__item" key={value}><Link to={`/portfolio/${value}`}>{label}</Link></li>
              ))}
            </ul></div></div>
          </li>
          <li className="header__item"><Link to="/contact" className="header__link">Contact</Link></li>
        </ul>
        <button type="button" className={`mobile ${isOpen ? 'animation-open' : 'animation-close'}`}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen}
          aria-controls="main-menu" onClick={() => setIsOpen(open => !open)}>
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
};
