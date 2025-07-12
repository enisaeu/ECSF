import { useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

//import logo from './logo.svg';
//import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import Tasks from './pages/Tasks';
import Skills from './pages/Skills';
import SkillsGraphs from './pages/SkillsGraphs';
import Knowledge from './pages/Knowledge';
import About from './pages/About';

// Auto scroll to top on path change
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

const App = () => {
  return (
    <HashRouter>
      <Wrapper>
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills-graphs" element={<SkillsGraphs />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Wrapper>
    </HashRouter>
  );
}

export default App;
