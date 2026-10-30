<<<<<<< HEAD
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
=======
import Logo from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef } from "react";

export const Header = (props) => {
    let menu = useRef(null);
    let btn = useRef(null);

    const handleMenu = () => {
        if (menu.current.style.display === '' || menu.current.style.display === 'none') {
            btn.current.classList.add('animation-open');
            btn.current.classList.remove('animation-close');
            menu.current.style.display = 'flex';
        } else {
            btn.current.classList.remove('animation-open');
            btn.current.classList.add('animation-close');
            menu.current.style.display = 'none';
        };
    };

    return (
        <header className="header">
            <nav className="header__navbar">
                <figure><img src={Logo} alt="Web Developer" /></figure>
                <ul className="header__list" ref={menu}>
                    <li className="header__item"><Link to={'/'} className="header__link">Home</Link></li>
                    <li className="header__item"><Link to={'/about'} className="header__link">About</Link></li>
                    <li className="header__item">
                        <Link to={`/portfolio/${'all'}`} className="header__link portfolio">Portfolio <RiArrowDropDownLine /></Link>
                        <div className="dropdown">
                            <div className="dropdown-menu">
                                <ul className="dropdown__list">
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'institucional site'}`}>Institucional Site</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'landing page'}`}>Landing Page</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'portal'}`}>Portal</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'e-commerce'}`}>E-commerce</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'web app'}`}>Web App</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'app'}`}>App</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'logo'}`}>Logos</Link>
                                    </li>
                                    <li className="dropdown__item">
                                        <Link to={`/portfolio/${'banner'}`}>Banners</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="header__item"><Link to={'/contact'} className="header__link" data-section>Contact</Link></li>
                </ul>
                <button type="button" className="mobile" onClick={handleMenu} ref={btn}><span></span><span></span><span></span></button>
            </nav>
        </header>
    );
};
>>>>>>> f11ee110860bb4def122ac2bf55cd81a375450b1
