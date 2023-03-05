import React from 'react';
import { useTransactions } from '../TransactionsContext.js';

function Balance() {
    const transactions = useTransactions()
    const amounts = transactions.map(a => parseFloat(a.amount));
    const incomeList = amounts.filter(function (a) { return a >= 0 })
    const income = incomeList.reduce((partialSum, a) => partialSum + a, 0)
    const expenseList = amounts.filter(function (a) { return a < 0 })
    const expense = Math.abs(expenseList.reduce((partialSum, a) => partialSum + a, 0))
    return (
        <div className='balance-section'>
            <div>YOUR BALANCE</div>
            <div>$ {income - expense}</div>
            <div className='balance-box'>
                <div className='income'><div>INCOME</div><div>${income}</div></div>
                <div className='expense'><div>EXPENSE</div><div>${expense}</div></div>
            </div>
        </div>
    )
}
export default Balance