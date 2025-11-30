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
      <div className="footer-container">
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
                <img src="/logo-white.png" alt="Forest Residence Sofia" className="footer-logo" />
                <h3>Forest Residence Sofia</h3>
              </div>
              <p>
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>{t('footer.contactInfo')}</h4>
                <ul>
                  <li>📍 {t('footer.address')}</li>
                  <li>📞 {t('footer.phone')}</li>
                  <li>✉️ {t('footer.email')}</li>
                  <li>🕒 {t('footer.hours')}</li>
                  <li>
                    🔗 <a href="https://www.linkedin.com/in/ruslan-nikolov-721413355/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  </li>
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
              <p>© 2025 Forest Residence Sofia. Всички права запазени.</p>
              <p className="footer-credits">
                {t('footer.createdBy')} <a href="https://portfolio-website-dusky-five-28.vercel.app/" target="_blank" rel="noopener noreferrer">Ruslan Nikolov</a>
              </p>
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
