import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HomeScreen } from './screens/homeScreen';
import { AllProjectsScreen } from './screens/allProjectsScreen';
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
      <Route path="/projects/all" element={<AllProjectsScreen />} />
       <Route path="/projects/:slug" element={<CaseStudyScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  </HashRouter>
);
