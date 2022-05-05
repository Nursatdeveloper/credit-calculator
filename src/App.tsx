import React from 'react';
import './App.css';
import Form from './components/Form';
import SimulatorPanel from './components/SimulatorPanel';

function App() {
  return (
    <div className="App">
      <div className='form__container'>
        <Form />
      </div>
      <div className='table__container'>
        <SimulatorPanel />
      </div>
    </div>
  );
}

export default App;
