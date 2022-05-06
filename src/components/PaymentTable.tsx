import React, { FC, useEffect, useState } from 'react'
import Table from '../helpers/Table';
import '../styles/PaymentTable.css'

interface PaymentTableProps{
  totalAmount:number
}

const PaymentTable:FC<PaymentTableProps> = ({totalAmount}) => {

  const [paymentTable, setPaymentTable] = useState<Table[]>([]);

  useEffect(() => {
    var table = sessionStorage.getItem('payments');
    setPaymentTable(JSON.parse(table!));
  }, [totalAmount, sessionStorage.getItem('payments')])

  return (
    <div className='table__wrapper'>
      <div className='table__title'>
        Таблица погашении
      </div>
      <div className='table__body'>
      {paymentTable !== null ?
        <div>
          {paymentTable.map((payment, i) => 
            <div className='table__row' key={i++} style={{backgroundColor:payment.color}}>
              <div className='center'>{payment.date}</div>
              {payment.status === 'Оплачен' ? <div className='center'>-{payment.monthlyPayment}</div> : <div className='center'>+{payment.monthlyPayment}</div> }
              <div className='center'>{payment.status}</div>
              <div className='center'>{payment.leftAmount}</div>
            </div>
          )}
        </div>
        :null}
        </div> 
      

    </div>
  )
}

export default PaymentTable