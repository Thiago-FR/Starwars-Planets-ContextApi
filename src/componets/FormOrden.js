import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Option from './Option';

function FormOrden() {
  const { handleClickOrder } = useContext(StarWarsContext);
  const [order, setOrder] = useState({
    column: 'population', sort: 'ASC',
  });

  const handleOrder = (column, sort) => {
    if (column) return setOrder({ ...order, column });
    return setOrder({ ...order, sort });
  };

  return (
    <form>
      <label htmlFor="select-filter">
        <select
          id="select-filter"
          name="column"
          data-testid="column-sort"
          value={ order.column }
          onChange={ ({ target: { value } }) => handleOrder(value) }
        >
          <Option value="population" />
          <Option value="orbital_period" />
          <Option value="diameter" />
          <Option value="rotation_period" />
          <Option value="surface_water" />
        </select>
      </label>
      <label htmlFor="radio-asc">
        ASC
        <input
          type="radio"
          name="radio-asc"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target: { value } }) => handleOrder(null, value) }
        />
      </label>
      <label htmlFor="radio-asc">
        DESC
        <input
          type="radio"
          name="radio-asc"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target: { value } }) => handleOrder(null, value) }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => handleClickOrder(order) }
      >
        Filtrar
      </button>
    </form>
  );
}

export default FormOrden;
