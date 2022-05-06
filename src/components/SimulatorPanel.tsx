import React, { FC, useEffect, useState } from 'react'
import Table from '../helpers/Table';
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
    setFinalDate:(date:string) => void,
    setMonthlyPayment:(payment:number) => void
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
        setFinalDate,
        setMonthlyPayment
    }) => {

    const [todayDate, setTodayDate] = useState<string>('');
    const [todayDateDisplay, setTodayDateDisplay] = useState<string>('');
    const [paymentDate, setPaymentDate] = useState<string>('');



    useEffect(() => {
        setTodayDate(today);
        setTodayDateDisplay(new Date(today).toLocaleDateString());
        setPaymentDate(today);
    }, [penaltyRate])

    function addPaymentToTable(monthlyPayment:string, leftAmount:string) {
        var payment:Table = {
            date: todayDateDisplay,
            monthlyPayment: monthlyPayment,
            status:'Оплачен',
            leftAmount: leftAmount,
            color: '#adebad'
        }
        var allPayments = sessionStorage.getItem('payments')
        if(allPayments === null) {
            sessionStorage.setItem('payments', JSON.stringify([payment]));
            console.log('1')
        } else {
            var payments: Table[] = JSON.parse(allPayments)
            payments.push(payment)
            sessionStorage.setItem('payments', JSON.stringify(payments))
        }
    }

    function addPenaltyToTable(penaltyAmount:string) {
        var payment:Table = {
            date: todayDateDisplay,
            monthlyPayment: penaltyAmount,
            status:'Не оплачен',
            leftAmount: totalPayment.toString(),
            color: '#ff8080'
        }
        var allPayments = sessionStorage.getItem('payments')
        if(allPayments === null) {
            sessionStorage.setItem('payments', JSON.stringify([payment]));
        } else {
            var payments: Table[] = JSON.parse(allPayments)
            payments.push(payment)
            sessionStorage.setItem('payments', JSON.stringify(payments))

        }
    }

    function payDebt() {
        if(totalPayment > monthlyPayment){
            totalPayment -= monthlyPayment;
            setTotalPayment(totalPayment);   
            if(totalPayment < monthlyPayment){
                setMonthlyPayment(totalPayment);
            }      
        }

        if(mainDebt >= monthlyPayment) {
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
                totalPayment = 0;
                setTotalPayment(totalPayment)
                setInterestAmount(interestAmount);
            }   
        }
        addPaymentToTable(monthlyPayment.toString(), totalPayment.toString());
    }

    function makePenalty(){
        var penaltyAmount = monthlyPayment * (penaltyRate/100);
        interestAmount += penaltyAmount;
        totalPayment += penaltyAmount;
        setInterestAmount(interestAmount);
        setTotalPayment(totalPayment)
        const date = new Date(final);
        date.setMonth(date.getMonth()+1)
        setFinalDate(date.toISOString());
        addPenaltyToTable(penaltyAmount.toString());
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
        console.log(date)
        console.log(new Date(final))
        if(date.toLocaleDateString() !== new Date(final).toLocaleDateString()){
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
        } else {
            return alert("Поздравляем вы погасили займ!");
        }
    }

    function clearTable() {
        sessionStorage.removeItem('payments');
        window.location.reload()
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
                <div className='btn__wrapper'>
                    <button onClick={clearTable}>Очистить таблицу</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SimulatorPanel