import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Option from './Option';

function Form() {
  const { handleInput, handleClick, filterByValues } = useContext(StarWarsContext);
  const [comparisonFilter, setcomparisonFilter] = useState({
    column: 'population', comparison: 'maior que', value: 0,
  });
  const [optionsValue, setOptionsValue] = useState([]);
  const handleSelect = (name, value) => {
    setcomparisonFilter({ ...comparisonFilter, [name]: value });
  };

  const optionValidation = (value) => optionsValue.includes(value);

  useEffect(() => {
    const arrSelect = document.getElementById('select-filter');
    setcomparisonFilter({
      column: arrSelect.firstChild.value,
      comparison: 'maior que',
      value: 0 });
  }, [optionsValue]);

  useEffect(() => {
    const { filterByNumericValues } = filterByValues;
    filterByNumericValues.forEach(({ column }) => {
      setOptionsValue([...optionsValue, column]);
    });
  }, [filterByValues]);

  return (
    <form>
      <label htmlFor="input-filter">
        Name
        <input
          id="input-filter"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => handleInput(value) }
        />
      </label>
      <label htmlFor="select-filter">
        <select
          id="select-filter"
          name="column"
          data-testid="column-filter"
          value={ comparisonFilter.column }
          onChange={ ({ target: { name, value } }) => handleSelect(name, value) }
        >
          { !optionValidation('population') && <Option value="population" />}
          { !optionValidation('orbital_period') && <Option value="orbital_period" />}
          { !optionValidation('diameter') && <Option value="diameter" />}
          { !optionValidation('rotation_period') && <Option value="rotation_period" />}
          { !optionValidation('surface_water') && <Option value="surface_water" />}
        </select>
      </label>
      <label htmlFor="select-comparison">
        <select
          id="select-comparison"
          data-testid="comparison-filter"
          name="comparison"
          value={ comparisonFilter.comparison }
          onChange={ ({ target: { name, value } }) => handleSelect(name, value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="input-value">
        <input
          id="input-value"
          type="number"
          data-testid="value-filter"
          value={ comparisonFilter.value }
          onChange={ ({ target: { value } }) => handleSelect('value', value) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="submit"
        onClick={ (event) => { event.preventDefault(); handleClick(comparisonFilter); } }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
