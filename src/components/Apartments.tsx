import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HouseSimple, Buildings } from '@phosphor-icons/react';
import { openLinkSafely } from '../utils/openLink';
import './Apartments.scss';

const stripPercentPrefix = (text: string) => text.replace(/^\d+% ?-? ?/, '');
const highlightPrimaryPrice = (text: string) => {
  const match = text.match(/(\d[\d\s.,]*)/);
  if (!match) {
    return text;
  }

  const [value] = match;
  const startIndex = text.indexOf(value);
  const before = text.slice(0, startIndex);
  const after = text.slice(startIndex + value.length);

  return (
    <>
      {before}
      <span className="pricing-highlight-value">{value}</span>
      {after}
    </>
  );
};

const Apartments = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState('floors');
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

  const tabs = [
    { id: 'floors', name: t('apartments.floors'), available: 27, type: 'apartment' },
    { id: 'garageParking', name: t('apartments.garageParking'), available: 51, type: 'garageParking' }
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
              <HouseSimple
                size={50}
                weight="fill"
                color="var(--white)"
              />
              {t('apartments.title')}
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
              </button>
            ))}
          </motion.div>

          {selectedTab === 'garageParking' && (
            <>
              <div className="garage-legend">
                <div className="garage-legend-item">
                  <span className="garage-legend-dot garage-legend-dot-red" />
                  <span>
                    {t('apartments.garageLegend.doubleParallelPrefix')}{' '}
                    <span className="garage-legend-price-badge">
                      {t('apartments.garageLegend.doubleParallelValue')}
                    </span>{' '}
                    {t('apartments.garageLegend.doubleParallelSuffix')}
                  </span>
                </div>
                <div className="garage-legend-item">
                  <span className="garage-legend-dot garage-legend-dot-orange" />
                  <span>
                    {t('apartments.garageLegend.doubleTandemPrefix')}{' '}
                    <span className="garage-legend-price-badge">
                      {t('apartments.garageLegend.doubleTandemValue')}
                    </span>{' '}
                    {t('apartments.garageLegend.doubleTandemSuffix')}
                  </span>
                </div>
                <div className="garage-legend-item">
                  <span className="garage-legend-dot garage-legend-dot-yellow" />
                  <span>
                    {t('apartments.garageLegend.singleGaragesPrefix')}{' '}
                    <span className="garage-legend-price-badge">
                      {t('apartments.garageLegend.singleGaragesValue')}
                    </span>{' '}
                    {t('apartments.garageLegend.singleGaragesSuffix')}
                  </span>
                </div>
                <div className="garage-legend-item">
                  <span className="garage-legend-dot garage-legend-dot-light-blue" />
                  <span>
                    {t('apartments.garageLegend.doubleParkingSpacesPrefix')}{' '}
                    <span className="garage-legend-price-badge">
                      {t('apartments.garageLegend.doubleParkingSpacesValue')}
                    </span>{' '}
                    {t('apartments.garageLegend.doubleParkingSpacesSuffix')}
                  </span>
                </div>
                <div className="garage-legend-item">
                  <span className="garage-legend-dot garage-legend-dot-blue" />
                  <span>
                    {t('apartments.garageLegend.singleParkingSpacesPrefix')}{' '}
                    <span className="garage-legend-price-badge">
                      {t('apartments.garageLegend.singleParkingSpacesValue')}
                    </span>{' '}
                    {t('apartments.garageLegend.singleParkingSpacesSuffix')}
                  </span>
                </div>
              </div>

              <motion.div
                className="garage-colored-wrapper"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="garage-colored-card" style={{ position: 'relative' }}>
                  <span className="image-full-view-hint">{t('building.clickToViewFullPlan')}</span>
                  <img
                    src="/garages-colored.png"
                    alt="Garages and parking layout"
                    className="garage-colored-image"
                    loading="lazy"
                    onClick={() => setModalImage('/garages-colored.png')}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </motion.div>
              
            </>
          )}

          {selectedTab === 'floors' && (
            <>
              <motion.div
                className="pricing-info"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3>{t('apartments.apartmentPricingTitle')}</h3>
                <div className="pricing-highlight-row">
                  <p className="pricing-highlight">
                    {highlightPrimaryPrice(t('apartments.apartmentPricing'))}
                  </p>
                  <p className="pricing-highlight maisonettes-highlight">
                    <span className="maisonettes-row maisonettes-row-intro">
                      <span className="maisonettes-label">
                        {t('apartments.maisonettesPricingLabel')}
                      </span>
                      <span className="maisonettes-intro">
                        <span className="maisonettes-intro-numbers">
                          {t('apartments.maisonettesPricingIntroNumbers')}
                        </span>
                        <span className="maisonettes-intro-rest">
                          {t('apartments.maisonettesPricingIntroRest')}
                        </span>
                      </span>
                    </span>
                    <span className="maisonettes-row maisonettes-row-value">
                      <span className="pricing-highlight-value maisonettes-value">
                        {t('apartments.maisonettesPricingValue')}
                      </span>
                    </span>
                    <span className="maisonettes-row maisonettes-row-suffix">
                      {t('apartments.maisonettesPricingSuffix')}
                    </span>
                  </p>
                </div>
                <p className="pricing-disclaimer">
                  {t('apartments.lastFloorNotOffered')}
                </p>
              </motion.div>

              <motion.div
                className="apartments-floor-features"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="features-grid">
                  <div
                    className="feature-card"
                    onClick={() => openLinkSafely('/+3.10-1.png')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="feature-header">
                      <div className="feature-icon">
                        <span><Buildings size={22} weight="regular" color="var(--white)" /></span>
                      </div>
                      <h3>{t('building.floors.floor1')}</h3>
                    </div>
                    <div className="feature-image" style={{ position: 'relative' }}>
                      <span className="image-full-view-hint">{t('building.clickToViewFullPlan')}</span>
                      <img
                        src="/+3.10-1.png"
                        alt={`Floor plan for ${t('building.floors.floor1')}`}
                        className="full-width-floor-plan"
                        loading="lazy"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImage('/+3.10-1.png');
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <div
                    className="feature-card"
                    onClick={() => openLinkSafely('/+6.15-1.png')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="feature-header">
                      <div className="feature-icon">
                        <span><Buildings size={22} weight="regular" color="var(--white)" /></span>
                      </div>
                      <h3>{t('building.floors.floor2')}</h3>
                    </div>
                    <div className="feature-image" style={{ position: 'relative' }}>
                      <span className="image-full-view-hint">{t('building.clickToViewFullPlan')}</span>
                      <img
                        src="/+6.15-1.png"
                        alt={`Floor plan for ${t('building.floors.floor2')}`}
                        className="full-width-floor-plan"
                        loading="lazy"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImage('/+6.15-1.png');
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <div
                    className="feature-card"
                    onClick={() => openLinkSafely('/+9.20-1.png')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="feature-header">
                      <div className="feature-icon">
                        <span><Buildings size={22} weight="regular" color="var(--white)" /></span>
                      </div>
                      <h3>{t('building.floors.floor3')}</h3>
                    </div>
                    <div className="feature-image" style={{ position: 'relative' }}>
                      <span className="image-full-view-hint">{t('building.clickToViewFullPlan')}</span>
                      <img
                        src="/+9.20-1.png"
                        alt={`Floor plan for ${t('building.floors.floor3')}`}
                        className="full-width-floor-plan"
                        loading="lazy"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImage('/+9.20-1.png');
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="payment-plans"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="payment-plans-title">{t('apartments.paymentPlansTitle')}</h3>
                <p className="payment-plans-note">
                  {t('apartments.paymentPlansNegotiationNote')}
                </p>
                
                <div className="payment-plan payment-plan-visual">
                  <h4 className="payment-plan-title">{t('apartments.paymentPlan1Title')}</h4>
                  <p className="payment-plan-subtitle">{t('apartments.paymentPlan1Subtitle')}</p>
                  <div className="payment-bar-container">
                    <div className="payment-bar">
                      <div className="payment-segment segment-1" style={{ height: '40%' }}>
                        <span className="payment-label">40 %</span>
                      </div>
                      <div className="payment-segment segment-2" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                      <div className="payment-segment segment-3" style={{ height: '40%' }}>
                        <span className="payment-label">40 %</span>
                      </div>
                      <div className="payment-segment segment-4" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                    </div>
                    <div className="payment-descriptions">
                      <div className="payment-desc-item" style={{ height: '40%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan1Step1'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan1Step2'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '40%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan1Step3'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan1Step4'))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="payment-plan payment-plan-visual">
                  <h4 className="payment-plan-title">{t('apartments.paymentPlan2Title')}</h4>
                  <p className="payment-plan-subtitle">{t('apartments.paymentPlan2Subtitle')}</p>
                  <div className="payment-bar-container">
                    <div className="payment-bar">
                      <div className="payment-segment segment-1" style={{ height: '30%' }}>
                        <span className="payment-label">30 %</span>
                      </div>
                      <div className="payment-segment segment-2" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                      <div className="payment-segment segment-3" style={{ height: '30%' }}>
                        <span className="payment-label">30 %</span>
                      </div>
                      <div className="payment-segment segment-4" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                      <div className="payment-segment segment-5" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                      <div className="payment-segment segment-6" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                    </div>
                    <div className="payment-descriptions">
                      <div className="payment-desc-item" style={{ height: '30%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan2Step1'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan2Step2'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '30%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan2Step3'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan2Step4'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan2Step5'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan2Step6'))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="payment-plan payment-plan-visual">
                  <h4 className="payment-plan-title">{t('apartments.paymentPlan3Title')}</h4>
                  <p className="payment-plan-subtitle">{t('apartments.paymentPlan3Subtitle')}</p>
                  <div className="payment-bar-container">
                    <div className="payment-bar">
                      <div className="payment-segment segment-1" style={{ height: '30%' }}>
                        <span className="payment-label">30 %</span>
                      </div>
                      <div className="payment-segment segment-2" style={{ height: '60%' }}>
                        <span className="payment-label">60 %</span>
                      </div>
                      <div className="payment-segment segment-3" style={{ height: '10%' }}>
                        <span className="payment-label">10 %</span>
                      </div>
                    </div>
                    <div className="payment-descriptions">
                      <div className="payment-desc-item" style={{ height: '30%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan3Step1'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '60%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan3Step2'))}
                      </div>
                      <div className="payment-desc-item" style={{ height: '10%' }}>
                        {stripPercentPrefix(t('apartments.paymentPlan3Step3'))}
                      </div>
                    </div>
                  </div>
                  <div className="payment-plan-notes">
                    <p>{t('apartments.paymentPlan3Step4')}</p>
                    <p>{t('apartments.paymentPlan3Step5')}</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}

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

export default Apartments;
