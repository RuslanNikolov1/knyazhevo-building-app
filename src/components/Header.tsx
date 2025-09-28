import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Header.scss';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className="header-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h2>Luxury Living</h2>
          </motion.div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="nav-link"
                >
                  {t('navigation.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('building')}
                  className="nav-link"
                >
                  {t('navigation.building')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('apartments')}
                  className="nav-link"
                >
                  {t('navigation.apartments')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('amenities')}
                  className="nav-link"
                >
                  {t('navigation.amenities')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="nav-link"
                >
                  {t('navigation.contact')}
                </button>
              </li>
            </ul>
            
            {/* Mobile Language Switcher */}
            <div className="mobile-language-switcher">
              <h4>🌍 Language</h4>
              <div className="mobile-lang-buttons">
                <button
                  onClick={() => changeLanguage('bg')}
                  className={`mobile-lang-btn ${i18n.language === 'bg' ? 'active' : ''}`}
                  aria-label="Switch to Bulgarian"
                >
                  <span className="flag-emoji">🇧🇬</span>
                  <span className="lang-text">Български</span>
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`mobile-lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                  aria-label="Switch to English"
                >
                  <span className="flag-emoji">🇬🇧</span>
                  <span className="lang-text">English</span>
                </button>
                <button
                  onClick={() => changeLanguage('ru')}
                  className={`mobile-lang-btn ${i18n.language === 'ru' ? 'active' : ''}`}
                  aria-label="Switch to Russian"
                >
                  <span className="flag-emoji">🇷🇺</span>
                  <span className="lang-text">Русский</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="header-actions">
            <div className="language-switcher">
              <button
                onClick={() => changeLanguage('bg')}
                className={`lang-btn ${i18n.language === 'bg' ? 'active' : ''}`}
                aria-label="Switch to Bulgarian"
                title="Български"
              >
                🇧🇬
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                aria-label="Switch to English"
                title="English"
              >
                🇬🇧
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`lang-btn ${i18n.language === 'ru' ? 'active' : ''}`}
                aria-label="Switch to Russian"
                title="Русский"
              >
                🇷🇺
              </button>
            </div>

            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
