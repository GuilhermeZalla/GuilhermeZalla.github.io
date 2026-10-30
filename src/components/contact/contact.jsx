import { Footer } from "../common/footer/footer";
import { Header } from "../common/header/header";
import Mouse from "../../assets/images/mouse.svg";
import { BsEnvelopeFill, BsLinkedin, BsGithub, BsFillPhoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

export const Contact = () => {

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
                        <h2 className="contact__subtitle">CONTACT ME</h2>
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