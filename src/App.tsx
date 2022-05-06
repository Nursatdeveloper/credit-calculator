import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import SimulatorPanel from './components/SimulatorPanel';

function App() {

  const [today, setToday] = useState<string>('');
  const [finalDate, setFinalDate] = useState<string>('');
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [payment, setPayment] = useState<number>(0);
  const [interestPayment, setInterestPayment] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [penaltyRate, setPenaltyRate] = useState<number>(0);

  useEffect(() => {
  }, [totalPayment])

  return (
    <div className="App">
      <div className='form__container'>
        <Form 
          setFinalDate={setFinalDate} 
          setTodayDate={setToday} 
          totalPayment={totalPayment}
          setMonthly={setMonthlyPayment}
          setTotalPayment={setTotalPayment}
          setPayment={setPayment}
          setInterestPayment={setInterestPayment}
          mainDebt={payment}
          interestAmount={interestPayment}
          setPenaltyRate={setPenaltyRate}
        />
      </div>
      <div className='table__container'>
        <SimulatorPanel 
          today={today} 
          final={finalDate} 
          setTotalPayment={setTotalPayment}
          totalPayment={totalPayment}
          monthlyPayment={monthlyPayment}
          mainDebt={payment}
          interestAmount={interestPayment}
          setMainDebt={setPayment}
          setInterestAmount={setInterestPayment}
          penaltyRate={penaltyRate}
          setFinalDate={setFinalDate}
        />
      </div>
    </div>
  );
}

export default App;
