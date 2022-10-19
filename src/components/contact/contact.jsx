import { Footer } from "../common/footer/footer";
import { Header } from "../common/header/header";
import Mouse from "../../assets/images/mouse.svg";
import { BsEnvelopeFill, BsLinkedin, BsGithub, BsFillPhoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

export const Contact = () => {

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
            <Header section={'contact'} />
            <main className="contact">
                <div className="container">
                    <section className="contact__section">
                        <div className="wrapper">
                            <h1 className="contact__title">CONTACT</h1>
                            <h1 className="contact__title">CONTACT</h1>
                            <h1 className="contact__title">CONTACT</h1>
                        </div>
                        <h2 className="contact__subtitle typewrite" data-period="2000" data-type='[ "Home / Contact Me"]'>CONTACT ME</h2>
                        <img className="mouse" src={Mouse} alt="Mouse" />
                    </section>
                    <section className="contact__section">
                        <article className="contact__article">
                            <span><BsFillPhoneFill /> Phone</span>
                            <p>+55 11 99942-3099</p>
                        </article>
                        <article className="contact__article">
                            <span><BsEnvelopeFill /> Email</span>
                            <p>zallaguilherme@gmail</p>
                        </article>
                        <article className="contact__article">
                            <span><BsLinkedin /> LinkedIn</span>
                            <p>Guilherme Zalla</p>
                        </article>
                        <article className="contact__article">
                            <span><BsGithub /> GitHub</span>
                            <p>Guilherme Zalla</p>
                        </article>
                        <article className="contact__article">
                            <span><GoLocation /> Address</span>
                            <p>São Paulo - SP, Brazil</p>
                        </article>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};