import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Building3D from './Building3D';
import { openLinkSafely } from '../utils/openLink';
import OptimizedImage from './OptimizedImage';
import './BuildingOverview.scss';

const BuildingOverview = () => {
  const { t } = useTranslation();
  // Cache buster to force latest public images
  const cacheBuster = Date.now();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '50px 0px'
  });
  const [isMapExpanded, setIsMapExpanded] = useState(true);

  const features = [
    {
      icon: '🏢',
      title: t('building.floors.ground'),
      description: t('building.floorDescriptions.ground'),
      floorPlan: '/+0.00-1.png',
      image: '/+0.00-1.png'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor1'),
      description: t('building.floorDescriptions.floor1'),
      floorPlan: '/+3.10-1.png',
      image: '/+3.10-1.png'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor2'),
      description: t('building.floorDescriptions.floor2'),
      floorPlan: '/+6.15-1.png',
      image: '/+6.15-1.png'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor3'),
      description: t('building.floorDescriptions.floor3'),
      floorPlan: '/+9.20-1.png',
      image: '/+9.20-1.png'
    }
  ];

  return (
    <section id="building" className="building-overview section">
      <div className="building-container">
        <motion.div
          className="building-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="building-header">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              🏢 {t('building.title')}
            </motion.h2>
            
            <motion.p
              className="building-description"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('building.description')}
            </motion.p>
          </div>

          <motion.div
            className="location-map"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>📍 {t('building.location')}</h3>
            <p className="location-subtitle">{t('building.locationTitle')}</p>
            <div 
              className={`map-container ${isMapExpanded ? 'expanded' : ''}`}
              onClick={() => !isMapExpanded && setIsMapExpanded(true)}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d23.228933!3d42.653489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa86b5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sVitoshki%20Izvori%204%2C%20Knyazhevo%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1234567890123!5m2!1sen!2sbg"
                width="100%"
                height={isMapExpanded ? "400" : "200"}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Building Location - Vitoshki Izvori 4, Knyazhevo, Sofia"
              />
              {!isMapExpanded && (
                <div className="map-overlay">
                  <div className="map-info">
                    <p>{t('building.address')}</p>
                    <span className="click-hint">{t('building.expandMap')}</span>
                  </div>
                </div>
              )}
              {isMapExpanded && (
                <button 
                  className="minimize-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMapExpanded(false);
                  }}
                  aria-label={t('building.minimizeMap')}
                >
                  −
                </button>
              )}
            </div>
          </motion.div>

          {/* 3D Building Model */}
          <Building3D />

          <motion.div
            className="architectural-plan"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3>🏗️ Архитектурна визуализация</h3>
            <div className="plan-images">
              <div className="plan-images-row">
                <div 
                  className="plan-image"
                  onClick={() => openLinkSafely('/1.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLinkSafely('/1.jpg');
                    }
                  }}
                  aria-label="View full size building facade view 1"
                >
                  <OptimizedImage
                    src="/1.jpg"
                    alt="Building facade view 1"
                    width={400}
                    height={300}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="image-overlay">
                    <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                    <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                  </div>
                </div>
                <div 
                  className="plan-image"
                  onClick={() => openLinkSafely('/2.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLinkSafely('/2.jpg');
                    }
                  }}
                  aria-label="View full size building facade view 2"
                >
                  <OptimizedImage
                    src="/2.jpg"
                    alt="Building facade view 2"
                    width={400}
                    height={300}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="image-overlay">
                    <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                    <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                  </div>
                </div>
              </div>
              <div className="plan-images-row">
                <div 
                  className="plan-image"
                  onClick={() => openLinkSafely('/3.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLinkSafely('/3.jpg');
                    }
                  }}
                  aria-label="View full size building facade view 3"
                >
                  <OptimizedImage
                    src="/3.jpg"
                    alt="Building facade view 3"
                    width={400}
                    height={300}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="image-overlay">
                    <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                    <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                  </div>
                </div>
                <div 
                  className="plan-image"
                  onClick={() => openLinkSafely('/4.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLinkSafely('/4.jpg');
                    }
                  }}
                  aria-label="View full size building facade view 4"
                >
                  <OptimizedImage
                    src="/4.jpg"
                    alt="Building facade view 4"
                    width={400}
                    height={300}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="image-overlay">
                    <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                    <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="building-situation"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3>📍 {t('building.situation')}</h3>
            <div className="situation-container">
              <div 
                className="situation-image"
                onClick={() => openLinkSafely(`/situation.png?v=${cacheBuster}`)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLinkSafely(`/situation.png?v=${cacheBuster}`);
                  }
                }}
                aria-label="View full size building situation plan"
              >
                <img
                  src={`/situation.png?v=${cacheBuster}`}
                  alt="Building situation plan"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    console.error('Failed to load situation.png:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Successfully loaded situation.png');
                  }}
                />
                <div className="image-fallback" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%', 
                  background: 'linear-gradient(135deg, var(--primary-light), var(--primary-lighter))',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '500'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
                    <div>Building Situation Plan</div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>Click to view</div>
                  </div>
                </div>
                <div className="image-overlay">
                  <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                  <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="building-features"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h3 className="features-title">🏢 {t('building.stats.floors')}</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onClick={() => openLinkSafely(feature.floorPlan)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLinkSafely(feature.floorPlan);
                  }
                }}
                aria-label={`View floor plan for ${feature.title}`}
              >
                <div className="feature-header">
                  <div className="feature-icon">
                    <span>{feature.icon}</span>
                  </div>
                  <h3>{feature.title}</h3>
                </div>
                <div className="feature-image">
                  <OptimizedImage
                    src={feature.image}
                    alt={`Floor plan for ${feature.title}`}
                    width={400}
                    height={300}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="feature-content">
                  <div className="view-plan-hint">
                    <span>{t('building.clickToViewFullFloorPlan')} →</span>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          </motion.div>


          <motion.div
            className="building-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="stat-item stat-floors">
              <div className="stat-number">4</div>
              <div className="stat-label">{t('building.stats.floors')}</div>
              <OptimizedImage src={`/stats-floors.png?v=${cacheBuster}`} alt="Floors" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
            <div className="stat-item stat-apartments">
              <div className="stat-number">30</div>
              <div className="stat-label">{t('building.stats.apartments')}</div>
              <OptimizedImage src={`/stats-apartments.png?v=${cacheBuster}`} alt="Apartments" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
            <div className="stat-item stat-garages">
              <div className="stat-number">26</div>
              <div className="stat-label">Гаража</div>
              <OptimizedImage src={`/stats-garages.png?v=${cacheBuster}`} alt="Garages" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
            <div className="stat-item stat-parking">
              <div className="stat-number">5</div>
              <div className="stat-label">Паркоместа</div>
              <OptimizedImage src={`/stats-parking-space.png?v=${cacheBuster}`} alt="Parking" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
            <div className="stat-item stat-completion">
              <div className="stat-number">2028</div>
              <div className="stat-label">{t('building.stats.completion')}</div>
              <OptimizedImage src={`/stats-completion.png?v=${cacheBuster}`} alt="Completion" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default BuildingOverview;
