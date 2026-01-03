import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SquaresFour, Flame, ArrowsVertical, Buildings, Thermometer } from '@phosphor-icons/react';
import Building3D from './Building3D';
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
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalImage(null);
      }
    };

    if (modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalImage]);

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
            <h3>{t('building.architecturalTitle')}</h3>
            <div className="plan-images">
              <div className="plan-images-row">
                <div 
                  className="plan-image"
                  onClick={() => setModalImage('/1.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalImage('/1.jpg');
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
                  onClick={() => setModalImage('/2.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalImage('/2.jpg');
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
                  onClick={() => setModalImage('/3.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalImage('/3.jpg');
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
                  onClick={() => setModalImage('/4.jpg')}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setModalImage('/4.jpg');
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
              <button
                type="button"
                className="situation-full-view-hint"
                onClick={() => setModalImage(`/situation.png?v=${cacheBuster}`)}
              >
                {t('apartments.clickForFullView')}
              </button>
              <div 
                className="situation-image"
                onClick={() => setModalImage(`/situation.png?v=${cacheBuster}`)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalImage(`/situation.png?v=${cacheBuster}`);
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
              <div className="stat-label">{t('building.stats.garages')}</div>
              <OptimizedImage src={`/stats-garages.png?v=${cacheBuster}`} alt="Garages" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
            <div className="stat-item stat-parking">
              <div className="stat-number">5</div>
              <div className="stat-label">{t('building.stats.parkingSpaces')}</div>
              <OptimizedImage src={`/stats-parking-space.png?v=${cacheBuster}`} alt="Parking" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
            <div className="stat-item stat-completion">
              <div className="stat-number">2028</div>
              <div className="stat-label">{t('building.stats.completion')}</div>
              <OptimizedImage src={`/stats-completion.png?v=${cacheBuster}`} alt="Completion" width={100} height={100} className="stat-image" sizes="100px" />
            </div>
          </motion.div>

          <motion.div
            className="building-details"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h3>🏢 {t('building.details.title')}</h3>
            <p className="details-description">{t('building.details.description')}</p>
            
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon">
                  <SquaresFour size={32} weight="fill" color="var(--white)" />
                </div>
                <h4>{t('building.details.windows.title')}</h4>
                <ul className="detail-list">
                  {(t('building.details.windows.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <Flame size={32} weight="fill" color="var(--white)" />
                </div>
                <h4>{t('building.details.heating.title')}</h4>
                <ul className="detail-list">
                  {(t('building.details.heating.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <ArrowsVertical size={32} weight="fill" color="var(--white)" />
                </div>
                <h4>{t('building.details.elevator.title')}</h4>
                <ul className="detail-list">
                  {(t('building.details.elevator.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <Buildings size={32} weight="fill" color="var(--white)" />
                </div>
                <h4>{t('building.details.construction.title')}</h4>
                <ul className="detail-list">
                  {(t('building.details.construction.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <Thermometer size={32} weight="fill" color="var(--white)" />
                </div>
                <h4>{t('building.details.insulation.title')}</h4>
                <ul className="detail-list">
                  {(t('building.details.insulation.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="image-modal-overlay"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="image-modal-close"
              onClick={() => setModalImage(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            <img
              src={modalImage}
              alt="Full size view"
              className="image-modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BuildingOverview;
