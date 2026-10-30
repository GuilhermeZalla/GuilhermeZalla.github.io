<<<<<<< HEAD
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HomeScreen } from './screens/homeScreen';
import CaseStudyScreen from './screens/caseStudyScreen';
import { NotFoundScreen } from './screens/notFoundScreen';
import { useMetadata } from './hooks/useMetadata';
import { projects } from './data/projects';

function Metadata() {
  const { pathname } = useLocation();
  const match = /^\/projects\/([^/]+)$/.exec(pathname);
  useMetadata(match ? projects.find(project => project.id === match[1]) : undefined);
  return null;
}

export const LayoutScreens = () => (
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Metadata />
    <Routes>
      {['/', '/projects', '/about', '/stack', '/contact', '/portfolio', '/portfolio/:section'].map(path => <Route key={path} path={path} element={<HomeScreen />} />)}
      <Route path="/projects/:slug" element={<CaseStudyScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </HashRouter>
);
=======
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
>>>>>>> f11ee110860bb4def122ac2bf55cd81a375450b1
