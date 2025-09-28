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
              <h3>{t('footer.luxuryLiving')}</h3>
              <p>
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Navigation</h4>
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
                <h4>Contact Info</h4>
                <ul>
                  <li>📍 123 Luxury Street, Sofia, Bulgaria</li>
                  <li>📞 +359 2 123 4567</li>
                  <li>✉️ info@luxuryliving.bg</li>
                  <li>🕒 Mon-Fri: 9:00-18:00</li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms of Service</a></li>
                  <li><a href="#cookies">Cookie Policy</a></li>
                  <li><a href="#accessibility">Accessibility</a></li>
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
              <p>&copy; 2024 {t('footer.luxuryLiving')}. {t('footer.rights')}.</p>
            </div>

            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="#" aria-label="LinkedIn">
                <span>💼</span>
              </a>
            </div>

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
