import React from 'react';
import { Car, ArrowRight } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate }) {
  return (
    <nav className="navbar">
      <div 
        className="brand-logo" 
        onClick={() => onNavigate('home')} 
        style={{ cursor: 'pointer' }}
      >
        <div className="brand-icon-wrapper">
          <Car size={20} />
        </div>
        <span>AutoValue AI</span>
      </div>

      <div className="nav-links">
        <a 
          href="#home" 
          className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          Home
        </a>
        <a 
          href="#predict" 
          className={`nav-link ${activeSection === 'predict' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('predict');
          }}
        >
          Predict
        </a>
      </div>

      <button 
        className="btn-primary-sm" 
        onClick={() => onNavigate('predict')}
      >
        <span>Predict My Car</span>
        <ArrowRight size={16} />
      </button>
    </nav>
  );
}
