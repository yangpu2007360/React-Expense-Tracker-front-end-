import React from 'react'

function Transaction({ transaction, deleteFromHistory }) {
    return (
        <div className='transaction-card'>
            <div onClick={() => deleteFromHistory(transaction.id)}>X</div>
            <div>{transaction.text}</div>
            <div>{transaction.amount}</div>
        </div>
    )
}

export default Transaction