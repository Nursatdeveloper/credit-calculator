import React, { FC, useEffect, useState } from 'react'
import incrementDate from '../helpers/incrementDate';
import '../styles/SimulatorPanel.css'

interface SimulatorPanelProps{
    today:string,
    final:string
}

const SimulatorPanel:FC<SimulatorPanelProps> = ({today, final}) => {

    const [todayDate, setTodayDate] = useState<string>('');
    const [todayDateDisplay, setTodayDateDisplay] = useState<string>('');
    const [paymentDate, setPaymentDate] = useState<string>('');


    useEffect(() => {
        setTodayDate(today)
        setTodayDateDisplay(new Date(today).toLocaleDateString())
        setPaymentDate(today)
    }, [final])



    function skipDay() {
        const date = new Date(todayDate);
        date.setDate(date.getDate() + 1);
        setTodayDateDisplay(date.toLocaleDateString());
        setTodayDate(date.toISOString());
        if(date.getDate() === new Date(paymentDate).getDate()){
            let pay = prompt("Pay? press y or n")
            if(pay === 'y'){
                console.log("payed");
            } else {
                console.log("not payed")
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
                    console.log("payed");
                } else {
                    console.log("not payed")
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
                <span>Сегодня: </span>
                <input type='text' className='date__input' value={todayDateDisplay} />
            </div>
            <div className='date__wrapper'>
                <span>Конечная дата погашения: </span>
                <input type='text' className='date__input' value={final} />
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