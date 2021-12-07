import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import StarWarsContextApi from '../services/StarWarsContextApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ filterByName: { name: '' } });
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    filterByNumericValues: [{ column: '', comparison: '', value: 0 }],
  });
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

  useEffect(() => {
    const {
      filterByNumericValues: [{ column, comparison, value }] } = filterByNumericValues;
    if (data.length !== 0) {
      switch (comparison) {
      case 'maior que':
        return setFilteredData(data
          .filter((title) => Number(title[column]) > Number(value)));
      case 'menor que':
        return setFilteredData(data
          .filter((title) => Number(title[column]) < Number(value)));
      case 'igual a':
        return setFilteredData(data
          .filter((title) => Number(title[column]) === Number(value)));
      default:
        return console.log('nai');
      }
    }
  }, [filterByNumericValues]);

  const handleInput = (value) => {
    setFilterByName({ filterByName: { name: value } });
  };

  const handleClick = ({ column, comparison, value }) => {
    setFilterByNumericValues({
      filterByNumericValues: [{ column, comparison, value }],
    });
  };

  const context = {
    data,
    dataError,
    filteredData,
    handleInput,
    handleClick,
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
