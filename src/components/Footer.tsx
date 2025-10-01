import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Footer.scss';

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-main"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-brand">
              <div className="footer-brand-header">
                <img src="/logo-white.png" alt="Forest residence Sofia" className="footer-logo" />
                <h3>Forest residence Sofia</h3>
              </div>
              <p>
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>{t('footer.navigation')}</h4>
                <ul>
                  <li>
                    <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('navigation.home')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => document.getElementById('building')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('navigation.building')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => document.getElementById('apartments')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('navigation.apartments')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('navigation.amenities')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('navigation.contact')}
                    </button>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>{t('footer.contactInfo')}</h4>
                <ul>
                  <li>📍 {t('footer.address')}</li>
                  <li>📞 {t('footer.phone')}</li>
                  <li>✉️ {t('footer.email')}</li>
                  <li>🕒 {t('footer.hours')}</li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>{t('footer.legal')}</h4>
                <ul>
                  <li><a href="#privacy">{t('footer.privacyPolicy')}</a></li>
                  <li><a href="#terms">{t('footer.termsOfService')}</a></li>
                  <li><a href="#cookies">{t('footer.cookiePolicy')}</a></li>
                  <li><a href="#accessibility">{t('footer.accessibility')}</a></li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="footer-copyright">
              <p>© 2025 Forest residence Sofia. Всички права запазени.</p>
            </div>

            {/* Social links removed as requested */}

            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              ↑
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
