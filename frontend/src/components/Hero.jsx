import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onPredictClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="badge-tag">
          <Sparkles size={14} />
          <span>AI-POWERED USED CAR VALUATION</span>
        </div>

        <h1 className="hero-title">Know What Your Car Is Worth.</h1>

        <p className="hero-description">
          "Get a data-driven estimate of your used car's market value using machine learning."
        </p>

        <button className="btn-hero-cta" onClick={onPredictClick}>
          <span>Predict My Car</span>
          <ArrowRight size={20} />
        </button>

        <div className="hero-indicators">
          <div className="indicator-item">
            <span className="indicator-dot"></span>
            <span>AI Powered</span>
          </div>
          <span className="indicator-divider">|</span>
          <div className="indicator-item">
            <span className="indicator-dot"></span>
            <span>Fast Prediction</span>
          </div>
          <span className="indicator-divider">|</span>
          <div className="indicator-item">
            <span className="indicator-dot"></span>
            <span>Data Driven</span>
          </div>
        </div>
      </div>
    </section>
  );
}
