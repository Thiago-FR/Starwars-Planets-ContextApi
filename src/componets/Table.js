import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const data = useContext(StarWarsContext);
  return (
    <table>
      <thead>
        <tr>
          { data.length !== 0 && (
            Object.keys(data[0]).map((title, index) => (
              title !== 'residents' && (
                <th key={ `${title}-${index}` }>
                  {title[0].toUpperCase() + title.slice(1).split('_').join(' ')}
                </th>
              )
            ))
          )}
        </tr>
      </thead>
      <tbody>
        { data.length !== 0 && (
          data.map((planet, indexPlanet) => (
            <tr key={ `${planet.name}-${indexPlanet}` }>
              { data.length !== 0 && (
                Object.keys(planet).map((title, indexTitle) => (
                  title !== 'residents' && (
                    <td key={ `${title}-${indexTitle}` }>
                      {Object.values(planet)[indexTitle]}
                    </td>
                  )
                ))
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
