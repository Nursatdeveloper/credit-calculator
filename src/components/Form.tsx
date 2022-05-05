import React, { useState } from 'react'
import '../styles/Form.css'

const Form = () => { 

    const [amount, setAmount] = useState<string>('');
    const [monthlyPayment, setMonthlyPayment] = useState<string>('');
    const [paymentDate, setPaymentDate] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [pentalty, setPenalty] = useState<string>('');

    function start() {
        const amountN = parseInt(amount);
        const monthlyPaymentN = parseInt(monthlyPayment);
        const interestN = parseInt(interest);
        const pentaltyN = parseInt(pentalty)
    }

    function findFinalPaymentDate() {

    }

  return (
    <div className='form__wrapper'>
        <div className='form__item'>
            <span className='input__title'>Сумма займа:</span>
            <input type='text' className='form__input' onChange={e => setAmount(e.target.value)} /> 
        </div>
        <div className='form__item'>
            <span className='input__title'>Ежемесячный платеж:</span>
            <input type='text' className='form__input' onChange={e => setMonthlyPayment(e.target.value)} /> 
        </div>
        <div className='form__item'>
            <span className='input__title'>День платежа:</span>
            <input type='date' className='form__input' onChange={e => setPaymentDate(e.target.value)} /> 
        </div>
        <div className='form__item'>
            <span className='input__title'>Процент займа:</span>
            <input type='text' className='form__input' onChange={e => setInterest(e.target.value)} /> 
        </div>
        <div className='form__item'>
            <span className='input__title'>Процент пеня:</span>
            <input type='text' className='form__input' onChange={e => setPenalty(e.target.value)} /> 
        </div>
        <div className='form__item'>
            <button className='btn__start' onClick={start}>Начать</button>
        </div>
    </div>
  )
}

export default Form