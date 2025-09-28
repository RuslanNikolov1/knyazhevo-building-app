import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.scss';
import Header from './components/Header';
import Hero from './components/Hero';
import BuildingOverview from './components/BuildingOverview';
import Apartments from './components/Apartments';
import Amenities from './components/Amenities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set default language to Bulgarian
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage('bg');
    }
  }, [i18n]);

  return (
    <div className="app">
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <BuildingOverview />
        <Apartments />
        <Amenities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
