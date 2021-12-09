import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Option from './Option';

function FormOrden() {
  const {
    handleClickOrder, orderFiltered, setOrderFiltered } = useContext(StarWarsContext);
  const { order } = orderFiltered;

  useEffect(() => {
    setOrderFiltered({ order:
      { column: 'population', sort: 'ASC' } });
  }, []);

  const handleOrder = (column, sort) => {
    setOrderFiltered({ order:
      { column, sort } });
  };

  return (
    <form>
      <label htmlFor="select-filter">
        <select
          id="select-filter"
          name="column"
          data-testid="column-sort"
          value={ order.column }
          onChange={ ({ target: { value } }) => handleOrder(value, order.sort) }
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
          onChange={ ({ target: { value } }) => handleOrder(order.column, value) }
        />
      </label>
      <label htmlFor="radio-asc">
        DESC
        <input
          type="radio"
          name="radio-asc"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target: { value } }) => handleOrder(order.column, value) }
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
