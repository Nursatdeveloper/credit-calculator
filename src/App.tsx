import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import SimulatorPanel from './components/SimulatorPanel';

function App() {

  const [today, setToday] = useState<string>('');
  const [finalDate, setFinalDate] = useState<string>('');

  return (
    <div className="App">
      <div className='form__container'>
        <Form setFinalDate={setFinalDate} setTodayDate={setToday} />
      </div>
      <div className='table__container'>
        <SimulatorPanel today={today} final={finalDate} />
      </div>
    </div>
  );
}

export default App;
