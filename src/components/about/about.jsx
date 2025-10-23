import { Footer } from "../common/footer/footer";
import { Header } from "../common/header/header";
import Picture from "../../assets/images/profile.png";
import { FaHtml5, FaTabletAlt } from "react-icons/fa";
import { BsSearch, BsCode } from "react-icons/bs";
import { TiSupport } from "react-icons/ti";
import { IoIosBrowsers } from "react-icons/io";
import Mouse from "../../assets/images/mouse.svg";

export const About = () => {
    let TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        let elements = document.getElementsByClassName('typewrite');
        for (let i = 0; i < elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-type');
            let period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
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
                        <h2 className="about__subtitle typewrite" data-period="2000" data-type='[ "Home / About Me"]'>About Me</h2>
                        <img className="mouse" src={Mouse} alt="Mouse" />
                    </section>
                    <section className="about__section">
                        <figure><img src={Picture} alt="It's me!" /></figure>
                        <article className="about__article">
                            <p className="about__paragraph">Hello, I'm a FullStack developer with more than 4 years of experience, located in Minas Gerais, Brazil.</p>
                            <p className="about__paragraph">I develop attractive designs that come to life using transitions and animations that meet a client's necessary requirements and the most sophisticated technologies available today for fully interactive and responsive websites.</p>
                            <p className="about__paragraph">I'm passionate about the power of colors and shapes in developing a great new design, and Javascript offers endless fascinating possibilities to create the right solution for companies all over the world.</p>
                            <p className="about__paragraph">I'm open for any new opportunities and challegens!</p>
                            <ul className="about__list">
                                <li className="about__item">Name: <span>Guilherme Zalla</span></li>
                                <li className="about__item">City: <span>Minas Gerais</span></li>
                                <li className="about__item">Age: <span>26 Years Old</span></li>
                                <li className="about__item">State: <span>São Paulo</span></li>
                                <li className="about__item">Specialization: <span>FullStack Developer</span></li>
                                <li className="about__item">E-mail: <span>zallaguilherme@gmail.com</span></li>
                            </ul>
                            <a href={require("../../assets/pdf/CV Guilherme Zalla.pdf")} role="button" className="about__btn">Download CV</a>
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
                            <span><FaHtml5 /> Front-end</span>
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
