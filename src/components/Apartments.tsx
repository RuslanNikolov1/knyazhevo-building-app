import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Apartments.scss';

const Apartments = () => {
  const { t } = useTranslation();
  const [selectedFloor, setSelectedFloor] = useState('+6.15');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const floors = [
    { id: '+3.10', name: t('building.floors.floor1'), available: 6 },
    { id: '+6.15', name: t('building.floors.floor2'), available: 6 },
    { id: '+9.20', name: t('building.floors.floor3'), available: 6 },
    { id: '+12.25', name: t('building.floors.floor4'), available: 6 }
  ];

  const apartments = {
    '+3.10': [
      { id: 1, area: 85, bedrooms: 2, price: 125000, balcony: true, floor: '+3.10', floorPlan: '/+3.10.pdf' },
      { id: 2, area: 95, bedrooms: 2, price: 145000, balcony: true, floor: '+3.10', floorPlan: '/+3.10.pdf' },
      { id: 3, area: 110, bedrooms: 3, price: 165000, balcony: true, floor: '+3.10', floorPlan: '/+3.10.pdf' },
      { id: 4, area: 75, bedrooms: 1, price: 105000, balcony: false, floor: '+3.10', floorPlan: '/+3.10.pdf' },
      { id: 5, area: 90, bedrooms: 2, price: 135000, balcony: true, floor: '+3.10', floorPlan: '/+3.10.pdf' },
      { id: 6, area: 100, bedrooms: 2, price: 155000, balcony: true, floor: '+3.10', floorPlan: '/+3.10.pdf' }
    ],
    '+6.15': [
      { id: 7, area: 88, bedrooms: 2, price: 135000, balcony: true, floor: '+6.15', floorPlan: '/+6.15.pdf' },
      { id: 8, area: 98, bedrooms: 2, price: 155000, balcony: true, floor: '+6.15', floorPlan: '/+6.15.pdf' },
      { id: 9, area: 115, bedrooms: 3, price: 175000, balcony: true, floor: '+6.15', floorPlan: '/+6.15.pdf' },
      { id: 10, area: 78, bedrooms: 1, price: 115000, balcony: false, floor: '+6.15', floorPlan: '/+6.15.pdf' },
      { id: 11, area: 92, bedrooms: 2, price: 145000, balcony: true, floor: '+6.15', floorPlan: '/+6.15.pdf' },
      { id: 12, area: 102, bedrooms: 2, price: 165000, balcony: true, floor: '+6.15', floorPlan: '/+6.15.pdf' }
    ],
    '+9.20': [
      { id: 13, area: 90, bedrooms: 2, price: 145000, balcony: true, floor: '+9.20', floorPlan: '/+9.20.pdf' },
      { id: 14, area: 100, bedrooms: 2, price: 165000, balcony: true, floor: '+9.20', floorPlan: '/+9.20.pdf' },
      { id: 15, area: 120, bedrooms: 3, price: 185000, balcony: true, floor: '+9.20', floorPlan: '/+9.20.pdf' },
      { id: 16, area: 80, bedrooms: 1, price: 125000, balcony: false, floor: '+9.20', floorPlan: '/+9.20.pdf' },
      { id: 17, area: 95, bedrooms: 2, price: 155000, balcony: true, floor: '+9.20', floorPlan: '/+9.20.pdf' },
      { id: 18, area: 105, bedrooms: 2, price: 175000, balcony: true, floor: '+9.20', floorPlan: '/+9.20.pdf' }
    ],
    '+12.25': [
      { id: 19, area: 95, bedrooms: 2, price: 165000, balcony: true, floor: '+12.25', floorPlan: '/+12.25.pdf' },
      { id: 20, area: 105, bedrooms: 2, price: 185000, balcony: true, floor: '+12.25', floorPlan: '/+12.25.pdf' },
      { id: 21, area: 125, bedrooms: 3, price: 205000, balcony: true, floor: '+12.25', floorPlan: '/+12.25.pdf' },
      { id: 22, area: 85, bedrooms: 1, price: 145000, balcony: false, floor: '+12.25', floorPlan: '/+12.25.pdf' },
      { id: 23, area: 100, bedrooms: 2, price: 175000, balcony: true, floor: '+12.25', floorPlan: '/+12.25.pdf' },
      { id: 24, area: 110, bedrooms: 2, price: 195000, balcony: true, floor: '+12.25', floorPlan: '/+12.25.pdf' }
    ]
  };

  const handleViewApartment = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="apartments" className="apartments section">
      <div className="container">
        <motion.div
          className="apartments-content"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="apartments-header">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              🏠 {t('apartments.title')}
            </motion.h2>
          </div>

          <motion.div
            className="floor-selector"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {floors.map((floor) => (
              <button
                key={floor.id}
                className={`floor-btn ${selectedFloor === floor.id ? 'active' : ''}`}
                onClick={() => setSelectedFloor(floor.id)}
              >
                <span className="floor-name">{floor.name}</span>
                <span className="floor-available">{floor.available} available</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            className="apartments-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={selectedFloor}
          >
            {apartments[selectedFloor as keyof typeof apartments]?.map((apartment, index) => (
              <motion.div
                key={apartment.id}
                className="apartment-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="apartment-image">
                  <div className="floor-plan-container">
                    <iframe
                      src={apartment.floorPlan}
                      title={`Floor plan for ${apartment.floor}`}
                      className="floor-plan-pdf"
                      loading="lazy"
                    />
                    <div className="floor-plan-overlay">
                      <span className="floor-plan-label">Floor Plan</span>
                      <button 
                        className="view-floor-plan-btn"
                        onClick={() => window.open(apartment.floorPlan, '_blank')}
                        aria-label={`View full floor plan for ${apartment.floor}`}
                      >
                        View Full Plan
                      </button>
                    </div>
                  </div>
                  {apartment.balcony && (
                    <div className="balcony-badge">Balcony</div>
                  )}
                </div>
                
                <div className="apartment-info">
                  <div className="apartment-header">
                    <h3>Apartment {apartment.id}</h3>
                    <div className="apartment-floor">{apartment.floor}</div>
                  </div>
                  
                  <div className="apartment-details">
                    <div className="detail-item">
                      <span className="detail-label">{t('apartments.area')}</span>
                      <span className="detail-value">{apartment.area} m²</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{t('apartments.bedrooms')}</span>
                      <span className="detail-value">{apartment.bedrooms}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Balcony</span>
                      <span className="detail-value">{apartment.balcony ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  
                  <div className="apartment-price">
                    <span className="price-label">{t('apartments.price')}</span>
                    <span className="price-value">€{apartment.price.toLocaleString()}</span>
                  </div>
                  
                  <button 
                    className="btn btn-primary apartment-btn"
                    onClick={handleViewApartment}
                  >
                    {t('apartments.viewApartment')}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Apartments;
