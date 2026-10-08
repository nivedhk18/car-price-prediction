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
  brand: '',
  model: '',
  mfgYear: '',
  fuelType: '',
  transmission: '',
  engineCapacity: '',
  kmDriven: '',
  ownership: '',
  spareKey: ''
});

  // Calculation state and results
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [submittedCar, setSubmittedCar] = useState(null);
  const [result, setResult] = useState({
  price: '—'
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
    const updated = {
      ...prev,
      [name]: value
    };

    // When brand changes, clear the model
    if (name === 'brand') {
      updated.model = '';
    }

    return updated;
  });
};

  // Handle price estimation calculation
  const handleSubmit = async (e) => {
  e.preventDefault();

  setIsCalculating(true);
  setError('');

  try {
    const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/v1/predict`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          mfgYear: parseInt(formData.mfgYear),
          engineCapacity: parseFloat(formData.engineCapacity),
          kmDriven: parseInt(formData.kmDriven)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        const validationMessage =
          data.detail?.[0]?.msg || 'Invalid input data.';

        throw new Error(validationMessage);
      }

      throw new Error(
        data.detail || 'Unable to generate prediction.'
      );
    }

    const predictedPrice = Math.round(data.predictedPrice);

    const formattedPrice =
      '₹' + predictedPrice.toLocaleString('en-IN');

    setResult({
      price: formattedPrice
    });

    setSubmittedCar({ ...formData });

    setFormData({
      brand: '',
      model: '',
      mfgYear: '',
      fuelType: '',
      transmission: '',
      engineCapacity: '',
      kmDriven: '',
      ownership: '',
      spareKey: ''
    });

    } catch (error) {
      console.error('Prediction error:', error);

      setError(error.message);

    } finally {
      setIsCalculating(false);
    }
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
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

      <ResultCard
        result={result}
        formData={submittedCar}
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
