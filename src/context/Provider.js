import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import StarWarsContextApi from '../services/StarWarsContextApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ filterByName: { name: '' } });
  const [filteredData, setFilteredData] = useState([]);
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    StarWarsContextApi().then(({ results }) => {
      setData(results);
      setFilteredData(results);
    }).catch((error) => {
      setDataError(error.detail);
    });
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filterByName;
    const result = data.filter((namePlanet) => namePlanet.name
      .toLowerCase().includes(name.toLowerCase()));
    setFilteredData(result);
  }, [filterByName]);

  const handleInput = (value) => {
    setFilterByName({ filterByName: { name: value } });
  };

  const context = {
    data,
    dataError,
    filteredData,
    handleInput,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
