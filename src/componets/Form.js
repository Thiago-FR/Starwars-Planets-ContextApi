import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Form() {
  const { handleInput, handleClick } = useContext(StarWarsContext);
  const [comparisonFilter, setcomparisonFilter] = useState({
    column: 'population', comparison: 'maior que', value: 0,
  });
  const handleSelect = (name, value) => {
    setcomparisonFilter({ ...comparisonFilter, [name]: value });
  };

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
