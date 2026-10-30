import { Footer } from "../common/footer/footer";
import { Header } from "../common/header/header";

export const Home = () => {
    return (
        <>
            <Header current={'home'} />
            <main className="home">
                <div className="wrapper less-m">
                    <h1 className="home__title">I'm Guilherme Zalla</h1>
                    <h1 className="home__title">I'm Guilherme Zalla</h1>
                    <h1 className="home__title">I'm Guilherme Zalla</h1>
                </div>
                <h2 className="home__subtitle">Software Engineer</h2>
            </main>
            <Footer />
        </>
    );
};
