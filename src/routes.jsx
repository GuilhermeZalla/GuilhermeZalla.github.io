import { Routes, Route, HashRouter } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen";
import { AboutScreen } from "./screens/aboutScreen";
import { ContactScreen } from "./screens/contactScreen";
import { PortfolioScreen } from "./screens/portfolioScreen";

export const LayoutScreens = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path={'/'} element={<HomeScreen />} />
                <Route exact path={'/about'} element={<AboutScreen />} />
                <Route exact path={'/contact'} element={<ContactScreen />} />
                <Route exact path={'/portfolio/:section'} element={<PortfolioScreen />} />
            </Routes>
        </HashRouter>
    );
}