import React from 'react';
import Provider from './context/Provider';
import Table from './componets/Table';
import Form from './componets/Form';
import FiltersPage from './componets/FiltersPage';
import './App.css';

function App() {
  return (
    <Provider>
      <Form />
      <FiltersPage />
      <Table />
    </Provider>
  );
}

export default App;
