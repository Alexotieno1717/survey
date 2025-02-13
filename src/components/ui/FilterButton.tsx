import React from 'react';
import PropTypes from 'prop-types';

const FilterButton = ({ color = 'black', fullWidth = false }) => {
  const iconSrc = color === 'blue' ? '/assets/icons/filter-lines-blue.png' : '/assets/icons/filter-lines-black.png';
  const buttonClasses = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button className={`flex items-center justify-center p-[10px] space-x-2 rounded-[8px] bg-white border border-gray-300 ${buttonClasses}`}>
      <img src={iconSrc} alt="filter-lines" />
      <span>Filters</span>
    </button>
  );
};

FilterButton.propTypes = {
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default FilterButton;
