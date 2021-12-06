import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Form() {
  const { handleInput } = useContext(StarWarsContext);
  return (
    <form>
      <label htmlFor="input-filter">
        <input
          id="input-filter"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => handleInput(value) }
        />
      </label>
    </form>
  );
}

export default Form;
