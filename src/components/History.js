import Transaction from './Transaction'
import React from 'react'
function History({ transactions, deleteFromHistory }) {
    return (
        <>
            <div className='history-title'>History</div>
            {transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} deleteFromHistory={deleteFromHistory} />)}
        </>
    )
}

export default History