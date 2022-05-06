import React, { FC, useState } from 'react'
import '../styles/Form.css'

interface FormProps{
    setTodayDate:(date:string) => void,
    setFinalDate:(date:string) => void,
    setMonthly:(payment:number) => void,
    setTotalPayment:(payment:number) => void,
    setPayment:(payment:number) => void,
    setInterestPayment:(payment:number) => void,
    setPenaltyRate:(rate:number) => void,
    totalPayment:number,
    mainDebt:number,
    interestAmount:number,
}

const Form:FC<FormProps> = ({
    setTodayDate, 
    setFinalDate, 
    setMonthly, 
    setTotalPayment, 
    setPayment, 
    setInterestPayment, 
    setPenaltyRate,
    totalPayment,
    mainDebt,
    interestAmount
    }) => { 

    const [amount, setAmount] = useState<string>('');
    const [monthlyPayment, setMonthlyPayment] = useState<string>('');
    const [paymentDate, setPaymentDate] = useState<string>('');
    const [interest, setInterest] = useState<string>('');
    const [pentalty, setPenalty] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

    function start() {
        const amountN = parseInt(amount);
        const monthlyPaymentN = parseInt(monthlyPayment);
        const interestN = parseInt(interest);
        const pentaltyN = parseFloat(pentalty);
        const totalPayment = amountN+(amountN*interestN/100);
        findFinalPaymentDate(totalPayment, monthlyPaymentN)
        setMonthly(monthlyPaymentN)
        setTotalPayment(totalPayment)
        setShow(true);
        setPayment(amountN)
        setInterestPayment(amountN*interestN/100)
        setPenaltyRate(pentaltyN)
        
    }

    function findFinalPaymentDate(total:number, monthly:number) {
        var month = Math.ceil(total/monthly);
        var date = new Date(paymentDate);
        var finalPaymentDate = new Date(date.setMonth(date.getMonth()+month));
        setFinalDate(finalPaymentDate.toISOString());
        setTodayDate(paymentDate)
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
        <hr/>
        { show ?
            <div>
                <div className='form__item bg-green'>
                    <span className='form__span'>Сумма погашения:</span>
                    <span className='form__span absolute'>{totalPayment}</span>
                </div>
                <div className='form__item'>
                    <span className='form__span' >Основной долг:</span>
                    <span className='form__span absolute' >{mainDebt}</span>
                </div>
                <div className='form__item'>
                    <span className='form__span' >Проценты:</span>
                    <span className='form__span absolute' >{interestAmount}</span>
                </div> 
            </div>
        : null}
    </div>
  )
}

export default Form