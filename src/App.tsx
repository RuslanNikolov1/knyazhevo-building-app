import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.scss';
import Header from './components/Header';
import Hero from './components/Hero';
import StructuredData from './components/StructuredData';

// Lazy load non-critical components
const BuildingOverview = lazy(() => import('./components/BuildingOverview'));
const Apartments = lazy(() => import('./components/Apartments'));
const Amenities = lazy(() => import('./components/Amenities'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set default language to Bulgarian
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage('bg');
    }
  }, []); // Remove i18n dependency to prevent re-renders

  return (
    <div className="app">
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
          <BuildingOverview />
        </Suspense>
        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
          <Apartments />
        </Suspense>
        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
          <Amenities />
        </Suspense>
        <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
