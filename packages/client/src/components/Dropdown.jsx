import React from 'react';
import PropTypes from 'prop-types';
import '../css/Dropdown.css';

const Dropdown = ({ label, options, onChange, value, _id }) => {
  return (
    <div className="dropdown-container">
      <label htmlFor={_id} className="dropdown-label">
        {label}
      </label>
      <select
        id={_id}
        className="dropdown"
        onChange={onChange}
        value={value}
      >
        <option value="">Sélectionnez une option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Dropdown;