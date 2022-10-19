import { useRef } from "react";
import { SiWhatsapp } from "react-icons/si";
import { BsChatText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import background from "../../../assets/images/modal_bg.png";

export const Footer = () => {
    let modal = useRef();

    const handleFooterModal = () => modal.current.style.display === '' || modal.current.style.display === 'none' ? modal.current.style.display = 'block' : modal.current.style.display = 'none';

    return (
        <footer className="footer">
            <button className="footer__btn" onClick={handleFooterModal}><SiWhatsapp /></button>
            <div className="modal" ref={modal}>
                <header className="modal__header">
                    <BsChatText />
                    <article className="modal__article">
                        <h4 className="modal__title">Guilherme Zalla</h4>
                        <h3 className="modal__subtitle">I usually reply within a few minutes</h3>
                    </article>
                    <button type="button" onClick={() => modal.current.style.display = 'none'}><IoClose /></button>
                </header>
                <div className="modal__body" style={{ backgroundImage: `url(${background})` }}>
                    <ul className="modal__list">
                        <li className="modal__item">Guilherme Zalla</li>
                        <li className="modal__item">Hello!</li>
                        <li className="modal__item">How may I help you?</li>
                    </ul>
                </div>
                <footer className="modal__footer">
                    <a href="https://web.whatsapp.com/send?phone=5511999423099" className="modal__link"><SiWhatsapp /> Start Talking</a>
                </footer>
            </div>
        </footer>
    );
};