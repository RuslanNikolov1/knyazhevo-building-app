import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './BuildingOverview.scss';

const BuildingOverview = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const features = [
    {
      icon: '🏢',
      title: t('building.floors.ground'),
      description: 'Secure underground parking with direct elevator access',
      floorPlan: '/+0.00.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor1'),
      description: 'Modern residential units with premium finishes',
      floorPlan: '/+3.10.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor2'),
      description: 'Spacious apartments with panoramic city views',
      floorPlan: '/+6.15.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor3'),
      description: 'Luxury living spaces with private balconies',
      floorPlan: '/+9.20.pdf'
    },
    {
      icon: '🏠',
      title: t('building.floors.floor4'),
      description: 'Penthouse-level apartments with premium amenities',
      floorPlan: '/+12.25.pdf'
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
                src="https://www.openstreetmap.org/export/embed.html?bbox=23.218933%2C42.643487%2C23.238933%2C42.663487&layer=mapnik&marker=42.653487%2C23.228933"
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

          <motion.div
            className="architectural-plan"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3>🏗️ Архитектурна визуализация</h3>
            <div className="plan-images">
              <div 
                className="plan-image"
                onClick={() => window.open('/3.png', '_blank')}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open('/3.png', '_blank');
                  }
                }}
                aria-label="View full size building facade view 1"
              >
                <img
                  src="/3.png"
                  alt="Building facade view 1"
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <div className="image-overlay">
                  <span>Click to view full size</span>
                </div>
              </div>
              <div 
                className="plan-image"
                onClick={() => window.open('/5.png', '_blank')}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open('/5.png', '_blank');
                  }
                }}
                aria-label="View full size building facade view 2"
              >
                <img
                  src="/5.png"
                  alt="Building facade view 2"
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <div className="image-overlay">
                  <span>Click to view full size</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="building-features">
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
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="view-plan-hint">
                    <span>{t('building.expandMap')} →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="building-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">{t('building.stats.floors')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24</div>
              <div className="stat-label">{t('building.stats.apartments')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">{t('amenities.parking')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2026</div>
              <div className="stat-label">{t('building.stats.completion')}</div>
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
