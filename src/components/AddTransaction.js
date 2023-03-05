import React, { useState } from 'react'
import { useTransactions, useTransactionsDispatch } from '../TransactionsContext.js';
import axios from 'axios';

function AddTransaction() {
    const transactions = useTransactions()
    const dispatch = useTransactionsDispatch();
    const handleSubmit = (data) => {
        const newRecord = {
            id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
            text: data.text,
            amount: +data.amount
        }
        try {
            axios.post("http://localhost:3000/", newRecord).then(
                dispatch({
                    type: 'added',
                    id: newRecord.id,
                    text: newRecord.text,
                    amount: newRecord.amount,
                })
            )
        }
        catch (error) {
            console.log(error)
        }
    }
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const clickSubmit = (text, amount) => {
        handleSubmit({ text, amount })
        setText('')
        setAmount('')
    }
    return (
        <>
            <div className='add-title'>AddTransaction Component</div>
            <div>Text</div>
            <input className='input' onChange={(e) => setText(e.target.value)} value={text} />
            <div>Amount</div>
            <div>(negative-expense, positive-income)</div>
            <input className='input' onChange={(e) => setAmount(e.target.value)} value={amount} />
            <div className='submit' onClick={() => clickSubmit(text, amount)}>Submit Transaction</div>
        </>
    )
}
export default AddTransaction