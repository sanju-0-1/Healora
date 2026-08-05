import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import DiseasePredictionPage from '../pages/DiseasePredictionPage';
import PredictionResultPage from '../pages/PredictionResultPage';
import DiseaseDetailsPage from '../pages/DiseaseDetailsPage';
import PredictionHistoryPage from '../pages/PredictionHistoryPage';
import UserProfilePage from '../pages/UserProfilePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with Main Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/disease/:id" element={<DiseaseDetailsPage />} />
      </Route>

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Dashboard App Pages with Sidebar */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/predict" element={<DiseasePredictionPage />} />
        <Route path="/result" element={<PredictionResultPage />} />
        <Route path="/history" element={<PredictionHistoryPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
