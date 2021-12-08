import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import StarWarsContextApi from '../services/StarWarsContextApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ filterByName: { name: '' } });
  const [orderFiltered, setOrderFiltered] = useState({ order:
    { column: 'name', sort: 'ASC' } });
  const [filterByValues, setFilterByNumericValues] = useState({
    filterByNumericValues: [],
  });
  const [dataError, setDataError] = useState('');

  const sortDetails = {
    ASC: 1,
    DESC: -1,
  };

  const orderData = (dataOrder, column = 'name', sort = 'ASC') => {
    if (column === 'name') {
      dataOrder.sort((a, b) => {
        if (a[column] < b[column]) return sortDetails[sort] * sortDetails.DESC;
        if (a[column] > b[column]) return sortDetails[sort];
        return 0;
      });
      return setFilteredData(dataOrder);
    }
    dataOrder.sort((a, b) => {
      if (Number(a[column]) < Number(b[column])) {
        return sortDetails[sort] * sortDetails.DESC;
      }
      if (Number(a[column]) > Number(b[column])) return sortDetails[sort];
      return 0;
    });
    setFilteredData(dataOrder);
  };

  useEffect(() => {
    const { order: { column, sort } } = orderFiltered;
    orderData(filteredData, column, sort);
  }, [orderFiltered]);

  useEffect(() => {
    StarWarsContextApi().then(({ results }) => {
      setData(results);
      orderData(results);
    }).catch((error) => {
      setDataError(error.detail);
    });
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filterByName;
    const result = data.filter((namePlanet) => namePlanet.name
      .toLowerCase().includes(name.toLowerCase()));
    orderData(result);
  }, [filterByName]);

  useEffect(() => {
    const { filterByNumericValues } = filterByValues;
    if (data.length !== 0 && filterByNumericValues.length > 0) {
      const {
        column,
        comparison,
        value } = filterByNumericValues[filterByNumericValues.length - 1];
      switch (comparison) {
      case 'maior que':
        return orderData(filteredData
          .filter((title) => Number(title[column]) > Number(value)));
      case 'menor que':
        return orderData(filteredData
          .filter((title) => Number(title[column]) < Number(value)));
      case 'igual a':
        return orderData(filteredData
          .filter((title) => Number(title[column]) === Number(value)));
      default:
        return console.log('nai');
      }
    }
  }, [filterByValues]);

  const handleInput = (value) => {
    setFilterByName({ filterByName: { name: value } });
  };

  const handleClick = ({ column, comparison, value }) => {
    const { filterByNumericValues } = filterByValues;
    setFilterByNumericValues({
      filterByNumericValues: [...filterByNumericValues, { column, comparison, value }],
    });
  };

  const handleClickOrder = ({ column, sort }) => {
    setOrderFiltered({ order:
      { column, sort } });
  };

  const handleClickReverse = (columnReverse, comparisonReverse, valueReverse) => {
    const { filterByNumericValues } = filterByValues;
    const resultFiltered = filterByNumericValues
      .filter(({ column }) => column !== columnReverse);
    setFilterByNumericValues({
      filterByNumericValues: resultFiltered,
    });
    switch (comparisonReverse) {
    case 'maior que':
      return orderData([...filteredData, ...data
        .filter((title) => Number(title[columnReverse]) <= Number(valueReverse)
        || title[columnReverse] === 'unknown')]);
    case 'menor que':
      return orderData([...filteredData, ...data
        .filter((title) => Number(title[columnReverse]) >= Number(valueReverse)
        || title[columnReverse] === 'unknown')]);
    case 'igual a':
      return orderData([...filteredData, ...data
        .filter((title) => Number(title[columnReverse]) === Number(valueReverse))]);
    default:
      return console.log('nai');
    }
  };

  const context = {
    data,
    dataError,
    filteredData,
    filterByValues,
    handleInput,
    handleClick,
    handleClickReverse,
    handleClickOrder,
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
