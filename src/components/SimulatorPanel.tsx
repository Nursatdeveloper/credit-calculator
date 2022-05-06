import React, { FC, useEffect, useState } from 'react'
import '../styles/SimulatorPanel.css'

interface SimulatorPanelProps{
    today:string,
    final:string,
    totalPayment:number,
    monthlyPayment:number,
    mainDebt:number,
    interestAmount:number,
    penaltyRate:number,
    setTotalPayment:(payment:number) => void,
    setMainDebt:(amount:number) => void,
    setInterestAmount:(amount:number) => void,
    setFinalDate:(date:string) => void
}

const SimulatorPanel:FC<SimulatorPanelProps> = ({
        today, 
        final, 
        setTotalPayment, 
        totalPayment, 
        monthlyPayment, 
        mainDebt, 
        interestAmount,
        penaltyRate,
        setMainDebt,
        setInterestAmount,
        setFinalDate
    }) => {

    const [todayDate, setTodayDate] = useState<string>('');
    const [todayDateDisplay, setTodayDateDisplay] = useState<string>('');
    const [paymentDate, setPaymentDate] = useState<string>('');



    useEffect(() => {
        setTodayDate(today);
        setTodayDateDisplay(new Date(today).toLocaleDateString());
        setPaymentDate(today);
    }, [final])

    function payDebt() {
        if((totalPayment - monthlyPayment) > monthlyPayment){
            totalPayment -= monthlyPayment;
            setTotalPayment(totalPayment);
        } else {
            var lastAmount = totalPayment;
            totalPayment -= lastAmount;
            setTotalPayment(totalPayment);
        }
        if(mainDebt > monthlyPayment) {
            mainDebt -= monthlyPayment;
            setMainDebt(mainDebt);
        } else if(mainDebt < monthlyPayment && mainDebt > 0) {
            var sum = monthlyPayment-mainDebt;
            var lastAmount = mainDebt;
            mainDebt -= lastAmount;
            interestAmount -= sum;
            setInterestAmount(interestAmount);
            setMainDebt(mainDebt);
        } else {
            if(interestAmount > monthlyPayment) {
                interestAmount -= monthlyPayment;
                setInterestAmount(interestAmount);
            } else {
                var lastAmount = interestAmount;
                interestAmount -= lastAmount;
                setInterestAmount(interestAmount);
            }   
        }
    }

    function makePenalty(){
        var penaltyAmount = monthlyPayment * penaltyRate;
        interestAmount += penaltyAmount;
        setInterestAmount(interestAmount);
        const date = new Date(final);
        date.setMonth(date.getMonth()+1)
        setFinalDate(date.toISOString());
    }

    function skipDay() {
        const date = new Date(todayDate);
        date.setDate(date.getDate() + 1);
        setTodayDateDisplay(date.toLocaleDateString());
        setTodayDate(date.toISOString());
        if(date.getDate() === new Date(paymentDate).getDate()){
            let pay = prompt("Pay? press y or n")
            if(pay === 'y'){
                payDebt()             
            } else {
                makePenalty()
            }
        }
    }

    function skipMonth() {
        const date = new Date(todayDate);
        date.setMonth(date.getMonth()+1);
        setTodayDateDisplay(date.toLocaleDateString());
        setTodayDate(date.toISOString());
        if(date.getDate() === new Date(paymentDate).getDate()){
            setTimeout(function() {
                let pay = prompt("Pay? press y or n")
                if(pay === 'y'){
                    payDebt()
                } else {
                    makePenalty()
                }
            }, 400)
            
        }
    }



  return (
    <div className='sp__wrapper'>
        <div className='sp__title'>
            Симулятор
        </div>
        <div className='wrapper'>
        <div className='date__wrapper'>
                <span>День платежа: </span>
                <input type='text' className='date__input' value={new Date(paymentDate).toLocaleDateString()} />
            </div>
            <div className='date__wrapper'>
                <span>Сегодня: </span>
                <input type='text' className='date__input' value={todayDateDisplay} />
            </div>
            <div className='date__wrapper'>
                <span>Дата погашения: </span>
                <input type='text' className='date__input' value={new Date(final).toLocaleDateString()} />
            </div>
        </div>
        <div className='btn__container'>
            <div className='wrapper'>
                <div className='btn__wrapper'>
                    <button onClick={skipDay}>Пропустить день</button>
                </div>
                <div className='btn__wrapper'>
                    <button onClick={skipMonth}>Пропустить месяц</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SimulatorPanel