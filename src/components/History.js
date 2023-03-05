import Transaction from './Transaction'
import React from 'react'
import { useTransactions, useTransactionsDispatch } from '../TransactionsContext.js';
import axios from 'axios';

function History() {
    const transactions = useTransactions()
    const dispatch = useTransactionsDispatch();
    const deleteFromHistory = (id) => {
        try {
            axios.delete(`http://localhost:3000/${id}`).then(dispatch({
                type: 'delete',
                id: id
            }))
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='history-title'>History</div>
            {transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} deleteFromHistory={deleteFromHistory} />)}
        </>
    )
}
export default History