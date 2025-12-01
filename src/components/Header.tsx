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
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img src="/logo.png" alt="Forest Residence Sofia" className="logo-image" />
            <h2>Forest Residence Sofia</h2>
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
                  onClick={() => scrollToSection('contact')}
                  className="nav-link"
                >
                  {t('navigation.contact')}
                </button>
              </li>
            </ul>
            
            {/* Mobile Language Switcher */}
            <div className="mobile-language-switcher">
              <div className="mobile-lang-buttons">
                <button
                  onClick={() => changeLanguage('bg')}
                  className={`mobile-lang-btn ${i18n.language === 'bg' ? 'active' : ''}`}
                  aria-label="Switch to Bulgarian"
                >
                  <img src="/bg.png" alt="Bulgarian flag" className="mobile-flag-image" />
                  <span className="lang-text">{t('languages.bg')}</span>
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`mobile-lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                  aria-label="Switch to English"
                >
                  <img src="/uk.png" alt="UK flag" className="mobile-flag-image" />
                  <span className="lang-text">{t('languages.en')}</span>
                </button>
                <button
                  onClick={() => changeLanguage('ru')}
                  className={`mobile-lang-btn ${i18n.language === 'ru' ? 'active' : ''}`}
                  aria-label="Switch to Russian"
                >
                  <img src="/rus.png" alt="Russian flag" className="mobile-flag-image" />
                  <span className="lang-text">{t('languages.ru')}</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="header-actions">
            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <ul className="desktop-nav-list">
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
                    onClick={() => scrollToSection('contact')}
                    className="nav-link"
                  >
                    {t('navigation.contact')}
                  </button>
                </li>
              </ul>
            </nav>

            <div className="language-switcher">
              <button
                onClick={() => changeLanguage('bg')}
                className={`lang-btn ${i18n.language === 'bg' ? 'active' : ''}`}
                aria-label="Switch to Bulgarian"
                title={t('languages.bg')}
              >
                <img src="/bg.png" alt="Bulgarian flag" className="flag-image" />
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                aria-label="Switch to English"
                title={t('languages.en')}
              >
                <img src="/uk.png" alt="UK flag" className="flag-image" />
              </button>
              <button
                onClick={() => changeLanguage('ru')}
                className={`lang-btn ${i18n.language === 'ru' ? 'active' : ''}`}
                aria-label="Switch to Russian"
                title={t('languages.ru')}
              >
                <img src="/rus.png" alt="Russian flag" className="flag-image" />
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
    </motion.header>
  );
};

export default Header;
