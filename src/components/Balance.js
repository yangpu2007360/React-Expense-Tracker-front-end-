import React from 'react';
function Balance({ income, expense }) {
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