import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictForm from './components/PredictForm';
import ResultCard from './components/ResultCard';
import { Car } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Form state
  const [formData, setFormData] = useState({
    brand: 'Toyota',
    model: 'Fortuner',
    mfgYear: '2019',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineCapacity: '2755 cc',
    kmDriven: '45000',
    ownership: '1st Owner',
    spareKey: 'Yes'
  });

  // Calculation state and results
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState({
    price: '₹8,45,000',
    confidence: '94%',
    marketDemand: 'High',
    valuationRange: '₹8,20,000 - ₹8,70,000'
  });

  // Available models grouped by car brand
  const carModels = {
    Toyota: ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser', 'Camry'],
    Hyundai: ['Creta', 'I20', 'Verna', 'Venue', 'Tucson'],
    Honda: ['City', 'Amaze', 'Civic', 'WR-V', 'CR-V'],
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Ertiga', 'Dzire'],
    Mahindra: ['Thar', 'XUV700', 'Scorpio-N', 'Bolero', 'XUV300'],
    Tata: ['Nexon', 'Harrier', 'Safari', 'Punch', 'Altroz'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5', 'M3'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
    Audi: ['A4', 'A6', 'Q3', 'Q5', 'Q7'],
    Volkswagen: ['Virtus', 'Taigun', 'Polo', 'Vento', 'Tiguan'],
    Ford: ['Endeavour', 'EcoSport', 'Figo', 'Mustang'],
    Kia: ['Seltos', 'Sonet', 'Carens', 'EV6']
  };

  // Smooth navigation helper
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'brand' && carModels[value]) {
        updated.model = carModels[value][0];
      }
      return updated;
    });
  };

  // Handle price estimation calculation
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      let basePrice = 1200000;
      const brandBase = {
        Toyota: 1800000,
        Hyundai: 950000,
        Honda: 850000,
        'Maruti Suzuki': 600000,
        Mahindra: 1250000,
        Tata: 900000,
        BMW: 3200000,
        'Mercedes-Benz': 3500000,
        Audi: 3100000,
        Volkswagen: 900000,
        Ford: 1100000,
        Kia: 1050000
      };

      if (brandBase[formData.brand]) {
        basePrice = brandBase[formData.brand];
      }

      if (formData.model === 'Fortuner' || formData.model === 'Endeavour' || formData.model === 'XUV700') {
        basePrice *= 1.45;
      } else if (formData.model === 'Creta' || formData.model === 'Seltos' || formData.model === 'Thar') {
        basePrice *= 1.25;
      }

      const currentYear = 2026;
      const mfgYr = parseInt(formData.mfgYear) || 2019;
      const age = Math.max(0, currentYear - mfgYr);
      let depRate = Math.min(0.70, age * 0.085);
      
      const kms = parseInt(formData.kmDriven) || 45000;
      const kmDep = Math.min(0.20, (kms / 100000) * 0.15);
      
      const transMult = formData.transmission === 'Automatic' ? 1.08 : 1.0;
      const ownerMult = formData.ownership === '1st Owner' ? 1.0 : (formData.ownership === '2nd Owner' ? 0.92 : 0.84);
      const keyMult = formData.spareKey === 'Yes' ? 1.02 : 0.98;

      let finalPrice = basePrice * (1 - depRate - kmDep) * transMult * ownerMult * keyMult;
      if (finalPrice < 150000) finalPrice = 185000;

      const formattedPrice = '₹' + Math.round(finalPrice).toLocaleString('en-IN');
      const minRange = '₹' + Math.round(finalPrice * 0.96).toLocaleString('en-IN');
      const maxRange = '₹' + Math.round(finalPrice * 1.04).toLocaleString('en-IN');
      const confidenceVal = Math.min(97, Math.max(91, 95 - (age > 8 ? 2 : 0) + (formData.spareKey === 'Yes' ? 1 : 0)));

      setResult({
        price: formattedPrice,
        confidence: `${confidenceVal}%`,
        marketDemand: age <= 5 ? 'High' : 'Moderate',
        valuationRange: `${minRange} - ${maxRange}`
      });

      setIsCalculating(false);

      const resultCard = document.getElementById('result-card');
      if (resultCard) {
        resultCard.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  return (
    <div className="app-container">
      {/* 1. Navbar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />

      {/* 2. Hero Section */}
      <Hero 
        onPredictClick={() => handleNavigate('predict')} 
      />

      {/* 3. Predict Section with Form & Result Card */}
      <section id="predict" className="predict-section">
        <div className="section-header">
          <div className="section-subtitle">Machine Learning Engine</div>
          <h2 className="section-title">Used Car Valuation Form</h2>
          <p className="section-desc">
            Provide details about your car to generate an instantaneous market price prediction powered by machine learning algorithms.
          </p>
        </div>

        <PredictForm 
          formData={formData}
          carModels={carModels}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isCalculating={isCalculating}
        />

        <ResultCard 
          result={result}
          formData={formData}
          isCalculating={isCalculating}
        />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="brand-logo" style={{ fontSize: '1.1rem' }}>
          <div className="brand-icon-wrapper" style={{ width: '28px', height: '28px' }}>
            <Car size={16} />
          </div>
          <span>AutoValue AI</span>
        </div>
        <p>© 2026 AutoValue AI. Machine Learning Used Car Price Prediction Platform.</p>
        <div className="footer-links">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavigate('home'); }} 
            className="footer-link"
          >
            Home
          </a>
          <a 
            href="#predict" 
            onClick={(e) => { e.preventDefault(); handleNavigate('predict'); }} 
            className="footer-link"
          >
            Predict
          </a>
        </div>
      </footer>
    </div>
  );
}
