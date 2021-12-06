import React from 'react';
import Provider from './context/Provider';
import Table from './componets/Table';
import Form from './componets/Form';

function App() {
  return (
    <Provider>
      <Form />
      <Table />
    </Provider>
  );
}

export default App;
