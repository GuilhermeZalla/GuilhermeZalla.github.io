import { useParams } from "react-router-dom";
import { Footer } from "../common/footer/footer";
import { Header } from "../common/header/header";
import dataJSON from "../../assets/json/projects.json";
import { Project } from "./project/project";
import { useEffect, useState } from "react";

let items = document.getElementsByClassName('portfolio__btn');

export const Portfolio = () => {
    const [projectType, setProjectType] = useState('all');
    let { section } = useParams();

    useEffect(() => {
        if (section) {
            setProjectType(section);
            setTimeout(() => {
                for (let i = 0; items.length; ++i) {
                    if (items[i]?.name === section) {
                        items[i].classList.add('current');
                    } else {
                        items[i].classList.remove('current');
                    }
                };
            }, 100);
        };
    }, [section]);

    const handleOption = e => {
        e.target.classList.add('current');
        setProjectType(e.target.name);
        section = undefined;
        for (let i = 0; items.length; ++i) {
            if (items[i].name !== e.target.name) {
                items[i].classList.remove('current');
            };
        };
    };

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
            <Header section={'portfolio'} />
            <main className="portfolio">
                <div className="container">
                    <section className="portfolio__section">
                        <div className="wrapper">
                            <h1 className="portfolio__title" title="PORTFOLIO">PORTFOLIO</h1>
                            <h1 className="portfolio__title" title="PORTFOLIO">PORTFOLIO</h1>
                        </div>
                        <h2 className="portfolio__subtitle typewrite" data-period="2000" data-type='[ "Some of my works."]'>Some of my works.</h2>
                    </section>
                    <section className="portfolio__section">
                        <ul className="portfolio__list">
                            <li className="portfolio__item">
                                <button type="button" name='all' className="portfolio__btn current" onClick={handleOption}>All</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='institucional site' className="portfolio__btn" onClick={handleOption}>Institucional Site</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='landing page' className="portfolio__btn" onClick={handleOption}>Landing Page</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='portal' className="portfolio__btn" onClick={handleOption}>Portal</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='e-commerce' className="portfolio__btn" onClick={handleOption}>E-Commerce</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='web app' className="portfolio__btn" onClick={handleOption}>Web App</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='app' className="portfolio__btn" onClick={handleOption}>App</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='logo' className="portfolio__btn" onClick={handleOption}>Logos</button>
                            </li>
                            <li className="portfolio__item">
                                <button type="button" name='banner' className="portfolio__btn" onClick={handleOption}>Banners</button>
                            </li>
                        </ul>
                        <div className="portfolio__container">
                            {
                                dataJSON.projects.map((project, index) => project.type === projectType ? <Project key={index} name={project.name} thumbnail={project.thumbnail} type={project.type} url={project.url}/> : projectType === 'all' ? <Project key={index} name={project.name} thumbnail={project.thumbnail} type={project.type} url={project.url}/> : null)
                            }
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};