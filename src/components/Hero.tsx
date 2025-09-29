import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { preloadImage, preloadImages } from '../utils/lazyLoad';
import './Hero.scss';

const Hero = () => {
  const { t } = useTranslation();
  
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload critical images with high priority
    preloadImage('/3.jpg', 'high');
    preloadImage('/4.jpg', 'high');
    
    // Preload other hero images in background
    preloadImages(['/1.jpg', '/2.jpg']).catch(console.warn);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-images">
          <motion.div 
            className="hero-image hero-image-1"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <img 
              ref={img1Ref}
              src="/3.jpg" 
              alt="Building facade view 1" 
              loading="eager"
              fetchPriority="high"
              width="800"
              height="600"
              decoding="sync"
            />
          </motion.div>
          <motion.div 
            className="hero-image hero-image-2"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          >
            <img 
              ref={img2Ref}
              src="/4.jpg" 
              alt="Building facade view 2" 
              loading="eager"
              fetchPriority="high"
              width="800"
              height="600"
              decoding="sync"
            />
          </motion.div>
        </div>
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('apartments')}
              >
                {t('hero.cta')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="scroll-arrow" onClick={() => scrollToSection('building')}>
          <span></span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
