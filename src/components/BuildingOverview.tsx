import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Building3D from './Building3D';
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
      floorPlan: '/+0.00.pdf',
      image: '/+0.00.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor1'),
      description: t('building.floorDescriptions.floor1'),
      floorPlan: '/+3.10.pdf',
      image: '/+3.10.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor2'),
      description: t('building.floorDescriptions.floor2'),
      floorPlan: '/+6.15.pdf',
      image: '/+6.15.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor3'),
      description: t('building.floorDescriptions.floor3'),
      floorPlan: '/+9.20.pdf',
      image: '/+9.20.pdf'
    }
  ];

  return (
    <section id="building" className="building-overview section">
      <div className="container">
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
                  onClick={() => window.open('/1.jpg', '_blank')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open('/1.jpg', '_blank');
                    }
                  }}
                  aria-label="View full size building facade view 1"
                >
                  <img
                    src="/1.jpg"
                    alt="Building facade view 1"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="image-overlay">
                    <span>Click to view full size</span>
                  </div>
                </div>
                <div 
                  className="plan-image"
                  onClick={() => window.open('/2.jpg', '_blank')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open('/2.jpg', '_blank');
                    }
                  }}
                  aria-label="View full size building facade view 2"
                >
                  <img
                    src="/2.jpg"
                    alt="Building facade view 2"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="image-overlay">
                    <span>Click to view full size</span>
                  </div>
                </div>
              </div>
              <div className="plan-images-row">
                <div 
                  className="plan-image"
                  onClick={() => window.open('/3.jpg', '_blank')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open('/3.jpg', '_blank');
                    }
                  }}
                  aria-label="View full size building facade view 3"
                >
                  <img
                    src="/3.jpg"
                    alt="Building facade view 3"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="image-overlay">
                    <span>Click to view full size</span>
                  </div>
                </div>
                <div 
                  className="plan-image"
                  onClick={() => window.open('/4.jpg', '_blank')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open('/4.jpg', '_blank');
                    }
                  }}
                  aria-label="View full size building facade view 4"
                >
                  <img
                    src="/4.jpg"
                    alt="Building facade view 4"
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <div className="image-overlay">
                    <span>Click to view full size</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="building-features"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="features-title">🏢 Floors</h3>
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
                onClick={() => window.open(feature.floorPlan, '_blank')}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(feature.floorPlan, '_blank');
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
                  <iframe
                    src={`${feature.image}#toolbar=0&navpanes=0&scrollbar=0&zoom=FitH`}
                    title={`Floor plan for ${feature.title}`}
                    className="floor-plan-pdf"
                    loading="lazy"
                  />
                </div>
                <div className="feature-content">
                  <p>{feature.description}</p>
                  <div className="view-plan-hint">
                    <span>CLICK TO EXPAND THE MAP →</span>
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
              <div className="stat-number">3</div>
              <div className="stat-label">{t('building.stats.floors')}</div>
              <img src={`/stats-floors.png?v=${cacheBuster}`} alt="Floors" className="stat-image" />
            </div>
            <div className="stat-item stat-apartments">
              <div className="stat-number">27</div>
              <div className="stat-label">{t('building.stats.apartments')}</div>
              <img src={`/stats-apartments.png?v=${cacheBuster}`} alt="Apartments" className="stat-image" />
            </div>
            <div className="stat-item stat-garages">
              <div className="stat-number">27</div>
              <div className="stat-label">Гаража</div>
              <img src={`/stats-garages.png?v=${cacheBuster}`} alt="Garages" className="stat-image" />
            </div>
            <div className="stat-item stat-parking">
              <div className="stat-number">24</div>
              <div className="stat-label">Паркоместа</div>
              <img src={`/stats-parking-space.png?v=${cacheBuster}`} alt="Parking" className="stat-image" />
            </div>
            <div className="stat-item stat-completion">
              <div className="stat-number">2027</div>
              <div className="stat-label">{t('building.stats.completion')}</div>
              <img src={`/stats-completion.png?v=${cacheBuster}`} alt="Completion" className="stat-image" />
            </div>
          </motion.div>

          <motion.div
            className="building-situation"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h3>📋 {t('building.situation')}</h3>
            
            <div className="situation-overview">
              <div className="situation-container">
                <iframe
                  src="/SITUACIA.pdf"
                  title="Building situation and location"
                  className="situation-pdf"
                  loading="lazy"
                />
                <div className="situation-overlay">
                  <button 
                    className="view-situation-btn"
                    onClick={() => window.open('/SITUACIA.pdf', '_blank')}
                    aria-label="View full building situation plan"
                  >
                    View Full Situation Plan
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildingOverview;
