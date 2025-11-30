import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.scss';

const Contact = () => {
  const { t } = useTranslation();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const contactInfo = [
    {
      icon: '📱',
      title: t('contact.phoneTitle'),
      details: t('contact.phoneDetails', { returnObjects: true }) as string[],
      type: 'phone'
    },
    {
      icon: '✉️',
      title: t('contact.emailTitle'),
      type: 'email'
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="contact-container">
        <motion.div
          className="contact-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-header">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              📞 {t('contact.title')}
            </motion.h2>
          </div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>{t('contact.getInTouch')}</h3>
            <p>
              {t('contact.description')}
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="contact-icon">
                    <span>{info.icon}</span>
                  </div>
                  <div className="contact-text">
                    <h4>{info.title}</h4>
                    {info.type === 'phone' && info.details?.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                    {info.type === 'email' && (
                      <a 
                        href="mailto:sofiaforestresidence@gmail.com" 
                        className="email-button"
                      >
                        {t('contact.contactViaEmail')}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
