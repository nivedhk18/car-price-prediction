import React from 'react';
import { CheckCircle2, Car, Calendar, Gauge, TrendingUp } from 'lucide-react';

export default function ResultCard({ result, formData, isCalculating }) {
  return (
    <div id="result-card" className="result-card-container">
      <div className="result-card">
        <div className="result-badge">
          <CheckCircle2 size={15} /> AI Valuation Result
        </div>

        <div className="result-title">Estimated Price</div>

        <div className={`result-price ${isCalculating ? 'calculating-pulse' : ''}`}>
          {result.price}
        </div>

        <div className="confidence-box">
          <span>Prediction Confidence:</span>
          <span className="confidence-value">{result.confidence}</span>
        </div>

        <div className="result-specs-summary">
          <div className="spec-chip">
            <Car size={13} /> {formData.brand} {formData.model}
          </div>
          <div className="spec-chip">
            <Calendar size={13} /> {formData.mfgYear} Model
          </div>
          <div className="spec-chip">
            <Gauge size={13} /> {parseInt(formData.kmDriven || 0).toLocaleString('en-IN')} km
          </div>
          <div className="spec-chip">
            <TrendingUp size={13} /> Range: {result.valuationRange}
          </div>
        </div>
      </div>
    </div>
  );
}
