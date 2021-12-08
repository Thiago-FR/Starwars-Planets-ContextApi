import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FiltersPage() {
  const { filterByValues: {
    filterByNumericValues }, handleClickReverse } = useContext(StarWarsContext);
  return (
    <>
      { filterByNumericValues.map(({ column, comparison, value }) => (
        <div
          className="filters-pages"
          data-testid="filter"
          key={ `${column}-${comparison}-${value}` }
        >
          <p>{column}</p>
          <p>{comparison}</p>
          <p>{value}</p>
          <button
            type="button"
            onClick={ () => handleClickReverse(column, comparison, value) }
          >
            X
          </button>
        </div>
      ))}
    </>
  );
}

export default FiltersPage;
