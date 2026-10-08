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
            required
          >
            <option value="">Select Brand</option>

            {Object.keys(carModels).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
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
            required
            disabled={!formData.brand}
          >
            <option value="">
              {formData.brand
                ? 'Select Model'
                : 'Select Brand First'}
            </option>

            {(carModels[formData.brand] || []).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
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
            required
          >
            <option value="">Select Year</option>

            {Array.from(
              { length: 15 },
              (_, index) => 2024 - index
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>


        {/* 4. Fuel Type */}
        <div className="form-group">
          <label className="form-label">
            <Fuel size={15} /> Fuel Type
          </label>

          <select
            className="form-select"
            name="fuelType"
            value={formData.fuelType}
            onChange={onChange}
            required
          >
            <option value="">Select Fuel Type</option>

            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>


        {/* 5. Transmission */}
        <div className="form-group">
          <label className="form-label">
            <Cpu size={15} /> Transmission
          </label>

          <select
            className="form-select"
            name="transmission"
            value={formData.transmission}
            onChange={onChange}
            required
          >
            <option value="">Select Transmission</option>

            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>


        {/* 6. Engine Capacity */}
        <div className="form-group">
          <label className="form-label">
            <Activity size={15} /> Engine Capacity
          </label>

          <input
            type="number"
            className="form-input"
            name="engineCapacity"
            placeholder="e.g. 1197"
            value={formData.engineCapacity}
            onChange={onChange}
            min="624"
            max="2694"
            required
          />
        </div>


        {/* 7. Kilometers Driven */}
        <div className="form-group">
          <label className="form-label">
            <Gauge size={13} /> Kilometers Driven
          </label>

          <input
            type="number"
            className="form-input"
            name="kmDriven"
            placeholder="e.g. 45000"
            value={formData.kmDriven}
            onChange={onChange}
            min="450"
            max="143991"
            required
          />
        </div>


        {/* 8. Ownership */}
        <div className="form-group">
          <label className="form-label">
            <ShieldCheck size={15} /> Ownership
          </label>

          <select
            className="form-select"
            name="ownership"
            value={formData.ownership}
            onChange={onChange}
            required
          >
            <option value="">Select Ownership</option>

            <option value="1st Owner">1st Owner</option>
            <option value="2nd Owner">2nd Owner</option>
            <option value="3rd Owner">3rd Owner</option>
            <option value="4th+ Owner">4th+ Owner</option>
          </select>
        </div>


        {/* 9. Spare Key */}
        <div className="form-group">
          <label className="form-label">
            <Key size={15} /> Spare Key
          </label>

          <select
            className="form-select"
            name="spareKey"
            value={formData.spareKey}
            onChange={onChange}
            required
          >
            <option value="">Select Spare Key</option>

            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

      </div>


      {/* Submit Button */}
      <div className="btn-submit-container">
        <button
          type="submit"
          className="btn-predict"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <span className="calculating-pulse">
              Analyzing Market Data...
            </span>
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