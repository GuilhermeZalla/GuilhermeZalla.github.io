import { Footer } from "../common/footer/footer";
import { Header } from "../common/header/header";
import Picture from "../../assets/images/portrait.webp";
import curriculumUrl from "../../../docs/curriculo/Curriculo_Guilherme_Zalla_PT-BR.pdf";
import { FaHtml5, FaTabletAlt } from "react-icons/fa";
import { BsSearch, BsCode } from "react-icons/bs";
import { TiSupport } from "react-icons/ti";
import { IoIosBrowsers } from "react-icons/io";
import Mouse from "../../assets/images/mouse.svg";

export const About = () => {
    return (
        <>
            <Header current={'about'} />
            <main className="about">
                <div className="container">
                    <section className="about__section">
                        <div className="wrapper">
                        <h1 className="about__title">ABOUT</h1>
                        <h1 className="about__title">ABOUT</h1>
                        <h1 className="about__title">ABOUT</h1>
                        </div>
                        <h2 className="about__subtitle">About Me</h2>
                        <img className="mouse" src={Mouse} alt="Mouse" />
                    </section>
                    <section className="about__section">
                        <figure><img src={Picture} alt="It's me!" /></figure>
                        <article className="about__article">
                            <p className="about__paragraph">Hello, I'm Guilherme Zalla, a Software Engineer.</p>
                            <p className="about__paragraph">I develop attractive designs that come to life using transitions and animations that meet a client's necessary requirements and the most sophisticated technologies available today for fully interactive and responsive websites.</p>
                            <p className="about__paragraph">I'm passionate about the power of colors and shapes in developing a great new design, and Javascript offers endless fascinating possibilities to create the right solution for companies all over the world.</p>
                            <p className="about__paragraph">I'm open for any new opportunities and challegens!</p>
                            <ul className="about__list">
                                <li className="about__item">Name: <span>Guilherme Zalla</span></li>
                                <li className="about__item">City: <span>Minas Gerais</span></li>
                                <li className="about__item">Age: <span>26 Years Old</span></li>
                                <li className="about__item">State: <span>São Paulo</span></li>
                                <li className="about__item">Specialization: <span>Software Engineer</span></li>
                                <li className="about__item">E-mail: <span>zallaguilherme@gmail.com</span></li>
                            </ul>
                            <a href={curriculumUrl} download className="about__btn">Download CV</a>
                        </article>
                    </section>
                    <section className="about__section">
                        <ul className="about__list-skills">
                            <li>
                                HTML &#38; CSS
                                <span data-name="html"></span>
                            </li>
                            <li>
                                SASS
                                <span data-name="scss"></span>
                            </li>
                            <li>
                                Javascript
                                <span data-name="js"></span>
                            </li>
                            <li>
                                Node.js
                                <span data-name="scss"></span>
                            </li>
                            <li>
                                React.js
                                <span data-name="react"></span>
                            </li>
                            <li>
                                MongoDB
                                <span data-name="mongo"></span>
                            </li>
                            <li>
                                Figma
                                <span data-name="figma"></span>
                            </li>
                        </ul>
                    </section>
                    <section className="about__section">
                        <article className="about__article">
                            <span><FaHtml5 /> Interfaces</span>
                            <p>I've been developing for 4 years with modern frameworks and resources</p>
                        </article>
                        <article className="about__article">
                            <span><FaTabletAlt /> Responsive Layouts</span>
                            <p>Every website that I develop is adapted for all devices</p>
                        </article>
                        <article className="about__article">
                            <span><BsSearch /> SEO</span>
                            <p>Sites with structure 100% adapted for optimization in Google searches</p>
                        </article>
                        <article className="about__article">
                            <span><IoIosBrowsers /> Browsers</span>
                            <p>My sites are functional for all updated browsers</p>
                        </article>
                        <article className="about__article">
                            <span><BsCode /> Progamming</span>
                            <p>I'm a TypeScript/React developer</p>
                        </article>
                        <article className="about__article">
                            <span><TiSupport /> Support</span>
                            <p>I provide support services</p>
                        </article>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );

};
