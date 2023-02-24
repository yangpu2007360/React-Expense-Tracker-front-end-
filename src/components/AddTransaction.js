import React, { useState } from 'react'

function AddTransaction({ handleSubmit }) {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const clickSubmit = (text, amount) => {
        console.log("clicked")
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