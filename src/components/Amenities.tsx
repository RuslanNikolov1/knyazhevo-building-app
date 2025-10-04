import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Amenities.scss';

const Amenities = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const constructionImages = [
    '/construction-1.jpg',
    '/construction-2.jpg',
    '/construction-3.jpg',
    '/construction-4.jpg',
    '/construction-5.jpg',
    '/construction-6.jpg',
    '/construction-7.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % constructionImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + constructionImages.length) % constructionImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const amenities = [
    {
      icon: '🚗',
      title: t('amenities.parking'),
      description: t('amenities.parkingDesc')
    },
    {
      icon: '🔒',
      title: t('amenities.security'),
      description: t('amenities.securityDesc')
    },
    {
      icon: '🏢',
      title: t('amenities.modern'),
      description: t('amenities.modernDesc')
    },
    {
      icon: '🌱',
      title: t('amenities.green'),
      description: t('amenities.greenDesc')
    },
    {
      icon: '⚡',
      title: t('amenities.smart'),
      description: t('amenities.smartDesc')
    },
    {
      icon: '🏪',
      title: t('amenities.convenience'),
      description: t('amenities.convenienceDesc')
    }
  ];

  return (
    <section id="amenities" className="amenities section">
      <div className="amenities-container">
        <motion.div
          className="amenities-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="amenities-header">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ✨ {t('amenities.title')}
            </motion.h2>
            
            <motion.p
              className="amenities-description"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('amenities.description')}
            </motion.p>
          </div>

          <div className="amenities-grid">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="amenity-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="amenity-icon">
                  <span>{amenity.icon}</span>
                </div>
                <div className="amenity-content">
                  <h3>{amenity.title}</h3>
                  <p>{amenity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Construction Progress Slider */}
          <motion.div
            className="construction-slider"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="slider-header">
              <h3>🏗️ {t('construction.title')}</h3>
              <p>{t('construction.description')}</p>
            </div>

            <div className="slider-container">
              <button 
                className="slider-btn prev-btn"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="slider-wrapper">
                <div 
                  className="slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {constructionImages.map((image, index) => (
                    <div key={index} className="slide">
                      <img
                        src={image}
                        alt={`${t('construction.image')} ${index + 1}`}
                        loading="lazy"
                      />
                      <div className="slide-overlay">
                        <span>{t('construction.image')} {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="slider-btn next-btn"
                onClick={nextSlide}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className="slider-dots">
              {constructionImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="amenities-highlight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="highlight-content">
              <h3>💎 {t('premium.title')} 💎</h3>
              <p>{t('premium.description')}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;
