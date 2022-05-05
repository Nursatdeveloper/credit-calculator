import React from 'react'
import '../styles/SimulatorPanel.css'

const SimulatorPanel = () => {
  return (
    <div className='sp__wrapper'>
        <div className='sp__title'>
            Симулятор
        </div>
        <div className='wrapper'>
            <div className='date__wrapper'>
                <span>Сегодня: </span>
                <input type='text' className='date__input' />
            </div>
            <div className='date__wrapper'>
                <span>Конечная дата: </span>
                <input type='text' className='date__input' />
            </div>
        </div>
        <div className='btn__container'>
            <div className='wrapper'>
                <div className='btn__wrapper'>
                    <button>Пропустить день</button>
                </div>
                <div className='btn__wrapper'>
                    <button>Пропустить месяц</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SimulatorPanel