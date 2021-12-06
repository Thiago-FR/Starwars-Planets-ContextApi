import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import StarWarsContextApi from '../services/StarWarsContextApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    StarWarsContextApi().then(({ results }) => setData(results));
  }, [data]);

  return (
    <StarWarsContext.Provider value={ data }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
