import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { openLinkSafely, isInAppBrowser } from '../utils/openLink';
import './Apartments.scss';

const Apartments = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('parking');

  const tabs = [
    { id: 'parking', name: t('apartments.parkingSpaces'), available: 27, type: 'parking' },
    { id: 'garage', name: t('apartments.garage'), available: 24, type: 'garage' },
    { id: '+3.10', name: t('building.floors.floor1'), available: 9, type: 'apartment' },
    { id: '+6.15', name: t('building.floors.floor2'), available: 9, type: 'apartment' },
    { id: '+9.20', name: t('building.floors.floor3'), available: 9, type: 'apartment' }
  ];

  // const parkingSpaces = [
  //   { id: 1, number: 'P001', type: 'Standard', price: 15000, available: true },
  //   { id: 2, number: 'P002', type: 'Standard', price: 15000, available: true },
  //   { id: 3, number: 'P003', type: 'Standard', price: 15000, available: true },
  //   { id: 4, number: 'P004', type: 'Standard', price: 15000, available: true },
  //   { id: 5, number: 'P005', type: 'Standard', price: 15000, available: true },
  //   { id: 6, number: 'P006', type: 'Standard', price: 15000, available: true },
  //   { id: 7, number: 'P007', type: 'Standard', price: 15000, available: true },
  //   { id: 8, number: 'P008', type: 'Standard', price: 15000, available: true },
  //   { id: 9, number: 'P009', type: 'Standard', price: 15000, available: true },
  //   { id: 10, number: 'P010', type: 'Standard', price: 15000, available: true },
  //   { id: 11, number: 'P011', type: 'Standard', price: 15000, available: true },
  //   { id: 12, number: 'P012', type: 'Standard', price: 15000, available: true },
  //   { id: 13, number: 'P013', type: 'Standard', price: 15000, available: true },
  //   { id: 14, number: 'P014', type: 'Standard', price: 15000, available: true },
  //   { id: 15, number: 'P015', type: 'Standard', price: 15000, available: true },
  //   { id: 16, number: 'P016', type: 'Standard', price: 15000, available: true },
  //   { id: 17, number: 'P017', type: 'Standard', price: 15000, available: true },
  //   { id: 18, number: 'P018', type: 'Standard', price: 15000, available: true },
  //   { id: 19, number: 'P019', type: 'Standard', price: 15000, available: true },
  //   { id: 20, number: 'P020', type: 'Standard', price: 15000, available: true },
  //   { id: 21, number: 'P021', type: 'Standard', price: 15000, available: true },
  //   { id: 22, number: 'P022', type: 'Standard', price: 15000, available: true },
  //   { id: 23, number: 'P023', type: 'Standard', price: 15000, available: true },
  //   { id: 24, number: 'P024', type: 'Standard', price: 15000, available: true },
  //   { id: 25, number: 'P025', type: 'Standard', price: 15000, available: true },
  //   { id: 26, number: 'P026', type: 'Standard', price: 15000, available: true },
  //   { id: 27, number: 'P027', type: 'Standard', price: 15000, available: true }
  // ];

  // const garageSpaces = [
  //   { id: 1, number: 'G001', type: 'Garage', price: 25000, available: true },
  //   { id: 2, number: 'G002', type: 'Garage', price: 25000, available: true },
  //   { id: 3, number: 'G003', type: 'Garage', price: 25000, available: true },
  //   { id: 4, number: 'G004', type: 'Garage', price: 25000, available: true },
  //   { id: 5, number: 'G005', type: 'Garage', price: 25000, available: true },
  //   { id: 6, number: 'G006', type: 'Garage', price: 25000, available: true },
  //   { id: 7, number: 'G007', type: 'Garage', price: 25000, available: true },
  //   { id: 8, number: 'G008', type: 'Garage', price: 25000, available: true },
  //   { id: 9, number: 'G009', type: 'Garage', price: 25000, available: true },
  //   { id: 10, number: 'G010', type: 'Garage', price: 25000, available: true },
  //   { id: 11, number: 'G011', type: 'Garage', price: 25000, available: true },
  //   { id: 12, number: 'G012', type: 'Garage', price: 25000, available: true },
  //   { id: 13, number: 'G013', type: 'Garage', price: 25000, available: true },
  //   { id: 14, number: 'G014', type: 'Garage', price: 25000, available: true },
  //   { id: 15, number: 'G015', type: 'Garage', price: 25000, available: true },
  //   { id: 16, number: 'G016', type: 'Garage', price: 25000, available: true },
  //   { id: 17, number: 'G017', type: 'Garage', price: 25000, available: true },
  //   { id: 18, number: 'G018', type: 'Garage', price: 25000, available: true },
  //   { id: 19, number: 'G019', type: 'Garage', price: 25000, available: true },
  //   { id: 20, number: 'G020', type: 'Garage', price: 25000, available: true },
  //   { id: 21, number: 'G021', type: 'Garage', price: 25000, available: true },
  //   { id: 22, number: 'G022', type: 'Garage', price: 25000, available: true },
  //   { id: 23, number: 'G023', type: 'Garage', price: 25000, available: true },
  //   { id: 24, number: 'G024', type: 'Garage', price: 25000, available: true }
  // ];

  const apartments = {
    '+3.10': [
      { id: 1, area: 85, bedrooms: 2, price: 125000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 2, area: 95, bedrooms: 2, price: 145000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 3, area: 110, bedrooms: 3, price: 165000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 4, area: 75, bedrooms: 1, price: 105000, balcony: false, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 5, area: 90, bedrooms: 2, price: 135000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 6, area: 100, bedrooms: 2, price: 155000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 7, area: 88, bedrooms: 2, price: 135000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 8, area: 92, bedrooms: 2, price: 140000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' },
      { id: 9, area: 105, bedrooms: 3, price: 160000, balcony: true, floor: '+3.10', floorPlan: '/+3.10-1.png' }
    ],
    '+6.15': [
      { id: 10, area: 88, bedrooms: 2, price: 135000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 11, area: 98, bedrooms: 2, price: 155000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 12, area: 115, bedrooms: 3, price: 175000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 13, area: 78, bedrooms: 1, price: 115000, balcony: false, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 14, area: 92, bedrooms: 2, price: 145000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 15, area: 102, bedrooms: 2, price: 165000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 16, area: 86, bedrooms: 2, price: 130000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 17, area: 94, bedrooms: 2, price: 150000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' },
      { id: 18, area: 108, bedrooms: 3, price: 170000, balcony: true, floor: '+6.15', floorPlan: '/+6.15-1.png' }
    ],
    '+9.20': [
      { id: 19, area: 90, bedrooms: 2, price: 145000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 20, area: 100, bedrooms: 2, price: 165000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 21, area: 120, bedrooms: 3, price: 185000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 22, area: 80, bedrooms: 1, price: 125000, balcony: false, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 23, area: 95, bedrooms: 2, price: 155000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 24, area: 105, bedrooms: 2, price: 175000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 25, area: 87, bedrooms: 2, price: 140000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 26, area: 97, bedrooms: 2, price: 160000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' },
      { id: 27, area: 112, bedrooms: 3, price: 180000, balcony: true, floor: '+9.20', floorPlan: '/+9.20-1.png' }
    ],
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
      <div className="apartments-container">
        <motion.div
          className="apartments-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="apartments-header">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              🏠 {t('apartments.title')}
            </motion.h2>
          </div>

          <motion.div
            className="floor-selector"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`floor-btn ${selectedTab === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <span className="floor-name">{tab.name}</span>
                <span className="floor-available">{tab.available} {t('building.availability.available')}</span>
              </button>
            ))}
          </motion.div>

          {selectedTab === 'parking' && (
            <motion.div
              className="pricing-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3>Парко места от 17 хил.евро без ддс</h3>
            </motion.div>
          )}

          {selectedTab === 'garage' && (
            <motion.div
              className="pricing-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3>Гаражи от 20 хил.евро без ДДС</h3>
            </motion.div>
          )}

          {selectedTab !== 'parking' && selectedTab !== 'garage' && (
            <motion.div
              className="pricing-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3>Сега на зелено 1400 евро/кв.м без ддс ( при 20% първоначално плащане )</h3>
              <div className="payment-schedule">
                <p>На акт 14 - 60 %</p>
                <p>На акт 15 - 10 %</p>
                <p>На акт 16 - 10 %</p>
              </div>
              <p className="discount-info">При плащане на 50% или повече първоначално цена от 1350 евро/кв м без ддс )</p>
            </motion.div>
          )}

          <motion.div
            className="apartments-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={selectedTab}
          >
            {selectedTab === 'parking' && (
              <div className="parking-garage-container">
                  <div className="pdf-card">
                    <div className="pdf-header">
                      <h3>{t('apartments.parkingSpacesPlan')}</h3>
                      <p>{t('apartments.parkingSpacesAvailable')}</p>
                    </div>
                  <div className="pdf-viewer">
                    <img
                      src="/+0.00-1.png"
                      alt={t('apartments.parkingPlan')}
                      className="floor-plan-image"
                      loading="lazy"
                    />
                    <div className="pdf-overlay">
                      <div className="mobile-hint">
                        <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                        <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                      </div>
                      <button 
                        className="view-pdf-btn"
                        onClick={() => openLinkSafely('/+0.00-1.png')}
                      >
                        Отвори пълен план
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'garage' && (
              <div className="parking-garage-container">
                  <div className="pdf-card">
                    <div className="pdf-header">
                      <h3>{t('apartments.garagePlanTitle')}</h3>
                      <p>{t('apartments.garageSpacesAvailable')}</p>
                    </div>
                  <div className="pdf-viewer">
                    <img
                      src="/+0.00-1.png"
                      alt={t('apartments.garagePlan')}
                      className="floor-plan-image"
                      loading="lazy"
                    />
                    <div className="pdf-overlay">
                      <div className="mobile-hint">
                        <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                        <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                      </div>
                      <button 
                        className="view-pdf-btn"
                        onClick={() => openLinkSafely('/+0.00-1.png')}
                      >
                        Отвори пълен план
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab !== 'parking' && selectedTab !== 'garage' && apartments[selectedTab as keyof typeof apartments]?.map((apartment, index) => (
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
                  <div 
                    className="floor-plan-container"
                    onClick={() => openLinkSafely(apartment.floorPlan)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLinkSafely(apartment.floorPlan);
                      }
                    }}
                    aria-label={`View full floor plan for ${apartment.floor}`}
                  >
                    <img
                      src={apartment.floorPlan}
                      alt={`Floor plan for ${apartment.floor}`}
                      className="floor-plan-image"
                      loading="lazy"
                    />
                    <div className="floor-plan-overlay">
                      <span className="floor-plan-label">{t('apartments.floorPlan')}</span>
                      <div className="mobile-hint">
                        <span className="desktop-text">{t('building.mobileHints.clickToView')}</span>
                        <span className="mobile-text">{t('building.mobileHints.tapToOpen')}</span>
                      </div>
                      <button 
                        className="view-floor-plan-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLinkSafely(apartment.floorPlan);
                        }}
                        aria-label={`View full floor plan for ${apartment.floor}`}
                      >
                        {t('apartments.viewFullPlan')}
                      </button>
                    </div>
                  </div>
                  {apartment.balcony && (
                    <div className="balcony-badge">{t('apartments.balcony')}</div>
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
