import PropTypes from 'prop-types';
import React from 'react';

function Option({ value }) {
  return (
    <option
      value={ value }
    >
      {value}
    </option>
  );
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Option;
