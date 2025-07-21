import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Polls from './pages/Polls';
import Questionnaire from './pages/Questionnaire';
import Recommendations from './pages/Recommendations';
import Admin from './pages/Admin';
import RecommendationsPage from './pages/RecommendationsPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/polls" element={<Polls />} />
    <Route path="/questionnaire" element={<Questionnaire />} />
    <Route path="/recommendations" element={<Recommendations />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/recommendations" element={<RecommendationsPage />} />
  </Routes>
);
