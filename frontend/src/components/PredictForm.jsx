import React from 'react';
import { 
  Car, 
  Calendar, 
  Fuel, 
  Cpu, 
  Activity, 
  Gauge, 
  ShieldCheck, 
  Key, 
  ArrowRight 
} from 'lucide-react';

export default function PredictForm({ 
  formData, 
  carModels, 
  onChange, 
  onSubmit, 
  isCalculating 
}) {
  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid">
        {/* 1. Brand */}
        <div className="form-group">
          <label className="form-label">
            <Car size={15} /> Brand
          </label>
          <select 
            className="form-select"
            name="brand"
            value={formData.brand}
            onChange={onChange}
          >
            {Object.keys(carModels).map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* 2. Model */}
        <div className="form-group">
          <label className="form-label">
            <Car size={15} /> Model
          </label>
          <select 
            className="form-select"
            name="model"
            value={formData.model}
            onChange={onChange}
          >
            {(carModels[formData.brand] || ['Fortuner']).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* 3. Manufacturing Year */}
        <div className="form-group">
          <label className="form-label">
            <Calendar size={15} /> Manufacturing Year
          </label>
          <select 
            className="form-select"
            name="mfgYear"
            value={formData.mfgYear}
            onChange={onChange}
          >
            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2010].map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        {/* 5. Fuel Type */}
        <div className="form-group">
          <label className="form-label">
            <Fuel size={15} /> Fuel Type
          </label>
          <select 
            className="form-select"
            name="fuelType"
            value={formData.fuelType}
            onChange={onChange}
          >
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* 6. Transmission */}
        <div className="form-group">
          <label className="form-label">
            <Cpu size={15} /> Transmission
          </label>
          <select 
            className="form-select"
            name="transmission"
            value={formData.transmission}
            onChange={onChange}
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* 7. Engine Capacity */}
        <div className="form-group">
          <label className="form-label">
            <Activity size={15} /> Engine Capacity
          </label>
          <select 
            className="form-select"
            name="engineCapacity"
            value={formData.engineCapacity}
            onChange={onChange}
          >
            <option value="1197 cc">1197 cc</option>
            <option value="1498 cc">1498 cc</option>
            <option value="1995 cc">1995 cc</option>
            <option value="2755 cc">2755 cc</option>
            <option value="999 cc">999 cc</option>
            <option value="2993 cc">2993 cc</option>
          </select>
        </div>

        {/* 8. Kilometers Driven */}
        <div className="form-group">
          <label className="form-label">
            <Gauge size={15} /> Kilometers Driven
          </label>
          <input 
            type="number" 
            className="form-input"
            name="kmDriven"
            placeholder="e.g. 45000"
            value={formData.kmDriven}
            onChange={onChange}
            required
          />
        </div>

        {/* 9. Ownership */}
        <div className="form-group">
          <label className="form-label">
            <ShieldCheck size={15} /> Ownership
          </label>
          <select 
            className="form-select"
            name="ownership"
            value={formData.ownership}
            onChange={onChange}
          >
            <option value="1st Owner">1st Owner</option>
            <option value="2nd Owner">2nd Owner</option>
            <option value="3rd Owner">3rd Owner</option>
            <option value="4th+ Owner">4th+ Owner</option>
          </select>
        </div>


        {/* 11. Spare Key */}
        <div className="form-group">
          <label className="form-label">
            <Key size={15} /> Spare Key
          </label>
          <select 
            className="form-select"
            name="spareKey"
            value={formData.spareKey}
            onChange={onChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      <div className="btn-submit-container">
        <button type="submit" className="btn-predict" disabled={isCalculating}>
          {isCalculating ? (
            <span className="calculating-pulse">Analyzing Market Data...</span>
          ) : (
            <>
              <span>Predict Price</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
