import React from 'react';
import Provider from './context/Provider';
import Table from './componets/Table';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
